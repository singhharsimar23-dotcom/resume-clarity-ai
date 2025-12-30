import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useAnalysisStore } from '@/stores/analysis-store';
import { Loader2, FileText, Calendar, TrendingUp, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export default function HistoryPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const setAnalysis = useAnalysisStore((state) => state.setAnalysis);
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAnalyses();
    }
  }, [user]);

  const fetchAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnalyses(data || []);
    } catch (error) {
      console.error('Error fetching analyses:', error);
      toast({
        title: 'Error',
        description: 'Failed to load analysis history.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnalysis = (record: AnalysisRecord) => {
    setAnalysis(record.analysis_data);
    navigate('/score');
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const { error } = await supabase
        .from('analysis_history')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAnalyses(analyses.filter((a) => a.id !== id));
      toast({
        title: 'Deleted',
        description: 'Analysis removed from history.',
      });
    } catch (error) {
      console.error('Error deleting analysis:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete analysis.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
              <h1 className="text-2xl font-bold text-foreground">Analysis History</h1>
              <p className="mt-1 text-muted-foreground">
                Track your resume improvements over time
              </p>
            </div>
            <Button asChild variant="hero">
              <Link to="/upload">New Analysis</Link>
            </Button>
          </div>

          {analyses.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">No analyses yet</h2>
              <p className="mt-2 text-muted-foreground">
                Upload your resume to get AI-powered feedback
              </p>
              <Button asChild variant="hero" className="mt-6">
                <Link to="/upload">Upload Resume</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((record) => (
                <div
                  key={record.id}
                  className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                >
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
                          <span className={`text-xl font-bold ${getScoreColor(record.overall_score)}`}>
                            {record.overall_score}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Overall Score</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className={`text-lg font-semibold ${getScoreColor(record.ats_score)}`}>
                        {record.ats_score}
                      </p>
                      <p className="text-xs text-muted-foreground">ATS</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className={`text-lg font-semibold ${getScoreColor(record.content_score)}`}>
                        {record.content_score}
                      </p>
                      <p className="text-xs text-muted-foreground">Content</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className={`text-lg font-semibold ${getScoreColor(record.format_score)}`}>
                        {record.format_score}
                      </p>
                      <p className="text-xs text-muted-foreground">Format</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewAnalysis(record)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(record.id)}
                      disabled={deleting === record.id}
                    >
                      {deleting === record.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}