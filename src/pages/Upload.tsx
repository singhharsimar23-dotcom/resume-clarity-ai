import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function UploadPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const handleAnalyze = useCallback(() => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      navigate("/score");
    }, 2500);
  }, [file, navigate]);

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
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Supported formats: PDF, DOC, DOCX
            </p>

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
                  AI analyzing...
                </>
              ) : (
                "Run AI Analysis"
              )}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
