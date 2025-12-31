import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  Plus, 
  TrendingUp, 
  Target, 
  Clock,
  CheckCircle,
  ArrowRight,
  Upload
} from 'lucide-react';
import { useResumeStore } from '@/stores/resume-store';
import { useAnalysisStore } from '@/stores/analysis-store';
import { ScoreBadge } from '@/components/builder/ScoreBadge';
import { useAuth } from '@/contexts/AuthContext';
import { CareerCheckSection } from '@/components/career-check/CareerCheckSection';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resumes } = useResumeStore();
  const { analysis, resumeText } = useAnalysisStore();

  const sortedResumes = [...resumes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const lastEditedResume = sortedResumes[0];
  const inProgressResumes = sortedResumes.filter(r => (r.score || 0) < 80);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Calculate weekly goals
  const weeklyGoals = [
    { label: 'Build a resume', done: resumes.length > 0 },
    { label: 'Add 3+ skills', done: resumes.some(r => r.skills.length >= 3) },
    { label: 'Complete experience section', done: resumes.some(r => r.experience.length > 0) },
    { label: 'Get AI review', done: !!analysis },
  ];

  const completedGoals = weeklyGoals.filter(g => g.done).length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}
          </h1>
          <p className="text-muted-foreground mt-1">
            Build and optimize your resume with AI-powered insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card 
                className="p-6 cursor-pointer hover:shadow-md transition-all group"
                onClick={() => navigate('/builder/new')}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Plus className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Create Resume</h3>
                    <p className="text-sm text-muted-foreground">Start from scratch</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-6 cursor-pointer hover:shadow-md transition-all group"
                onClick={() => navigate('/upload')}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Upload className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Review</h3>
                    <p className="text-sm text-muted-foreground">Upload & analyze</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Resume in Progress Widget */}
            {inProgressResumes.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Resumes in Progress</h3>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/resumes')}>
                    View all <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {inProgressResumes.slice(0, 3).map((resume) => (
                    <div
                      key={resume.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
                      onClick={() => navigate(`/builder/${resume.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{resume.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Edited {formatDate(resume.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <ScoreBadge score={resume.score || 0} size="sm" showLabel={false} />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Last Edited Resume Widget */}
            {lastEditedResume && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Last Edited</h3>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(lastEditedResume.updatedAt)}
                  </span>
                </div>
                <div
                  className="flex items-center justify-between p-4 rounded-lg border border-border cursor-pointer hover:border-accent/50 transition-colors"
                  onClick={() => navigate(`/builder/${lastEditedResume.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{lastEditedResume.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {lastEditedResume.sectionOrder.length} sections • {lastEditedResume.experience.length} experiences
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <ScoreBadge score={lastEditedResume.score || 0} />
                    <Button variant="outline" size="sm">
                      Continue Editing
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Career Reality Check */}
            <CareerCheckSection resumeText={resumeText} />
            {resumes.length === 0 && (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">No resumes yet</h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Create your first resume or upload an existing one for AI analysis.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => navigate('/builder/new')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Resume
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/upload')}>
                      Upload for Review
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Goals */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Weekly Goals</h3>
                <span className="text-xs text-muted-foreground">
                  {completedGoals}/{weeklyGoals.length}
                </span>
              </div>
              <div className="space-y-3">
                {weeklyGoals.map((goal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      goal.done 
                        ? 'bg-success/20 text-success' 
                        : 'border border-border'
                    }`}>
                      {goal.done && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <span className={`text-sm ${goal.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {goal.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all"
                  style={{ width: `${(completedGoals / weeklyGoals.length) * 100}%` }}
                />
              </div>
            </Card>

            {/* Latest Analysis */}
            {analysis && (
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Latest AI Review</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center text-lg font-bold ${
                    analysis.overall_score >= 80 
                      ? 'bg-success/20 text-success' 
                      : analysis.overall_score >= 60 
                        ? 'bg-warning/20 text-warning' 
                        : 'bg-destructive/20 text-destructive'
                  }`}>
                    {analysis.overall_score}
                  </div>
                  <div>
                    <p className="font-medium">{analysis.headline}</p>
                    <p className="text-sm text-muted-foreground capitalize">{analysis.status}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/score')}
                >
                  View Full Report
                </Button>
              </Card>
            )}

            {/* Quick Tips */}
            <Card className="p-6 bg-accent/5 border-accent/20">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-accent" />
                <h3 className="font-semibold text-foreground">Pro Tip</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Resumes with quantified achievements (e.g., "Increased revenue by 30%") 
                score 40% higher with ATS systems.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
