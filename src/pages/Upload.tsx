import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { extractResumeText } from "@/lib/pdf-parser";
import { supabase } from "@/integrations/supabase/client";
import { useAnalysisStore } from "@/stores/analysis-store";
import { useAuth } from "@/contexts/AuthContext";

export default function UploadPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState("");
  const setAnalysis = useAnalysisStore((state) => state.setAnalysis);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  const saveAnalysisToHistory = async (analysisData: any, fileName: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('analysis_history').insert({
        user_id: user.id,
        file_name: fileName,
        overall_score: analysisData.overallScore,
        ats_score: analysisData.scores.ats,
        content_score: analysisData.scores.content,
        format_score: analysisData.scores.format,
        analysis_data: analysisData,
      });

      if (error) {
        console.error('Error saving analysis:', error);
      }
    } catch (error) {
      console.error('Error saving analysis to history:', error);
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setAnalysisStage("Extracting text from resume...");

    try {
      // Step 1: Extract text from the file
      const resumeText = await extractResumeText(file);
      
      if (resumeText.length < 50) {
        throw new Error("Could not extract enough text from the resume. Please ensure the file contains readable text.");
      }

      setAnalysisStage("AI analyzing hiring signals...");

      // Step 2: Send to AI for analysis
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resumeText },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data?.success) {
        throw new Error(data?.error || "Analysis failed");
      }

      // Step 3: Save to history if user is logged in
      if (user) {
        await saveAnalysisToHistory(data.analysis, file.name);
        toast({
          title: "Analysis saved",
          description: "Your analysis has been saved to your history.",
        });
      }

      // Step 4: Store the analysis and navigate
      setAnalysis(data.analysis, file.name);
      navigate("/score");

    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Unable to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisStage("");
    }
  }, [file, navigate, setAnalysis, toast, user]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center py-16">
        <div className="container max-w-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Upload Your Resume</h1>
            <p className="mt-2 text-muted-foreground">
              Our AI will analyze it against current hiring patterns.
            </p>
          </div>

          <div className="mt-10">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
                isDragging
                  ? "border-accent bg-accent/5"
                  : file
                  ? "border-success bg-success/5"
                  : "border-border bg-card hover:border-muted-foreground/50"
              }`}
            >
              {file ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-success/10">
                    <FileText className="h-7 w-7 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-sm text-muted-foreground underline hover:text-foreground"
                  >
                    Remove and upload different file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                    <Upload className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Supported formats: PDF, DOC, DOCX, TXT
            </p>

            {isAnalyzing && analysisStage && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{analysisStage}</span>
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={!file || isAnalyzing}
              variant="hero"
              size="xl"
              className="mt-8 w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Run AI Analysis"
              )}
            </Button>

            {!user && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                <a href="/auth" className="text-accent hover:underline">Sign in</a> to save your analysis history
              </p>
            )}

            <div className="mt-6 rounded-lg border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">Privacy Note</p>
                  <p className="mt-1">
                    Your resume is processed securely and not stored permanently. 
                    Analysis is performed in real-time and results are kept only for your session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}