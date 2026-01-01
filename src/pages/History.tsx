import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useAnalysisStore } from "@/stores/analysis-store";
import { Loader2, FileText, Calendar, TrendingUp, Trash2, Compass } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisRecord {
  id: string;
  file_name: string;
  overall_score: number;
  ats_score: number;
  content_score: number;
  format_score: number;
  analysis_data: any;
  created_at: string;
}

interface CareerCheckRecord {
  id: string;
  created_at: string;
  target_role: string;
  target_market: string;
  role_fit_verdict: string;
  interview_probability: number;
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const setAnalysis = useAnalysisStore((state) => state.setAnalysis);

  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>([]);
  const [careerChecks, setCareerChecks] = useState<CareerCheckRecord[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"resume" | "career">("resume");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      void fetchAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [a, c] = await Promise.all([fetchAnalyses(), fetchCareerChecks()]);
      setAnalysisHistory(a);
      setCareerChecks(c);
    } catch {
      // errors are handled inside individual fetches
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyses = async (): Promise<AnalysisRecord[]> => {
    try {
      const { data, error } = await supabase
        .from("analysis_history")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching analyses:", error);
      toast({
        title: "Error",
        description: "Failed to load resume analysis history.",
        variant: "destructive",
      });
      return [];
    }
  };

  const fetchCareerChecks = async (): Promise<CareerCheckRecord[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("career_reality_checks")
        .select("id, created_at, target_role, target_market, role_fit_verdict, interview_probability")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []) as CareerCheckRecord[];
    } catch (error) {
      console.error("Error fetching career checks:", error);
      toast({
        title: "Error",
        description: "Failed to load Career Reality Check history.",
        variant: "destructive",
      });
      return [];
    }
  };

  const handleViewAnalysis = (record: AnalysisRecord) => {
    setAnalysis(record.analysis_data);
    navigate("/score");
  };

  const handleDeleteResumeAnalysis = async (id: string) => {
    setDeleting(id);
    try {
      const { error } = await supabase.from("analysis_history").delete().eq("id", id);
      if (error) throw error;

      setAnalysisHistory((prev) => prev.filter((a) => a.id !== id));
      toast({ title: "Deleted", description: "Analysis removed from history." });
    } catch (error) {
      console.error("Error deleting analysis:", error);
      toast({
        title: "Error",
        description: "Failed to delete analysis.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteCareerCheck = async (id: string) => {
    setDeleting(id);
    try {
      const { error } = await supabase.from("career_reality_checks").delete().eq("id", id);
      if (error) throw error;

      setCareerChecks((prev) => prev.filter((c) => c.id !== id));
      toast({ title: "Deleted", description: "Assessment removed from history." });
    } catch (error) {
      console.error("Error deleting career check:", error);
      toast({
        title: "Error",
        description: "Failed to delete assessment.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const analysisEmpty = useMemo(() => analysisHistory.length === 0, [analysisHistory.length]);
  const careerEmpty = useMemo(() => careerChecks.length === 0, [careerChecks.length]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">History</h1>
              <p className="mt-1 text-muted-foreground">Your saved analyses and assessments</p>
            </div>
            <Button asChild variant="hero">
              <Link to="/upload">New AI Review</Link>
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="w-full">
              <TabsTrigger value="resume" className="flex-1">Resume Analyses</TabsTrigger>
              <TabsTrigger value="career" className="flex-1">Career Reality Checks</TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="mt-6">
              {analysisEmpty ? (
                <Card className="p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">No analyses yet</h2>
                  <p className="mt-2 text-muted-foreground">Upload your resume to get AI-powered feedback</p>
                  <Button asChild variant="hero" className="mt-6">
                    <Link to="/upload">Upload Resume</Link>
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {analysisHistory.map((record) => (
                    <Card key={record.id} className="group p-6 transition-shadow hover:shadow-md">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{record.file_name}</h3>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{formatDate(record.created_at)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="h-4 w-4 text-muted-foreground" />
                              <span className={`text-xl font-bold ${getScoreColor(record.overall_score)}`}>{record.overall_score}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Overall Score</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="rounded-lg bg-secondary/50 p-3 text-center">
                          <p className={`text-lg font-semibold ${getScoreColor(record.ats_score)}`}>{record.ats_score}</p>
                          <p className="text-xs text-muted-foreground">ATS</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-3 text-center">
                          <p className={`text-lg font-semibold ${getScoreColor(record.content_score)}`}>{record.content_score}</p>
                          <p className="text-xs text-muted-foreground">Content</p>
                        </div>
                        <div className="rounded-lg bg-secondary/50 p-3 text-center">
                          <p className={`text-lg font-semibold ${getScoreColor(record.format_score)}`}>{record.format_score}</p>
                          <p className="text-xs text-muted-foreground">Format</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                        <Button variant="outline" size="sm" onClick={() => handleViewAnalysis(record)}>
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeleteResumeAnalysis(record.id)}
                          disabled={deleting === record.id}
                        >
                          {deleting === record.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="career" className="mt-6">
              {careerEmpty ? (
                <Card className="p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <Compass className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">No assessments yet</h2>
                  <p className="mt-2 text-muted-foreground">Run a Career Reality Check to save it here</p>
                  <Button asChild variant="hero" className="mt-6">
                    <Link to="/career-reality-check">Start Assessment</Link>
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {careerChecks.map((record) => (
                    <Card key={record.id} className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                            <Compass className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground truncate">{record.target_role}</h3>
                            <p className="text-sm text-muted-foreground truncate">{record.target_market}</p>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{formatDate(record.created_at)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">{record.interview_probability}%</div>
                          <p className="text-xs text-muted-foreground">Interview signal</p>
                          <p className="mt-1 text-xs text-muted-foreground capitalize">{record.role_fit_verdict}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/career-reality-check?id=${record.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeleteCareerCheck(record.id)}
                          disabled={deleting === record.id}
                        >
                          {deleting === record.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
