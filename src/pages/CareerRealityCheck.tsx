import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Compass,
  Target,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Minus,
  ArrowRight,
  Upload,
  Loader2,
  ChevronRight,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { useAnalysisStore } from '@/stores/analysis-store';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { CareerCheckInput, CareerCheckResult } from '@/types/career-check';

const EXPERIENCE_OPTIONS = [
  { value: '0-1', label: '0-1 years' },
  { value: '2-4', label: '2-4 years' },
  { value: '5-7', label: '5-7 years' },
  { value: '8-10', label: '8-10 years' },
  { value: '10+', label: '10+ years' },
];

const TIMELINE_OPTIONS = [
  { value: 'immediate', label: 'Immediate (ASAP)' },
  { value: '3-6-months', label: '3-6 months' },
  { value: 'flexible', label: 'Flexible' },
];

const CONSTRAINT_OPTIONS = [
  { value: 'none', label: 'No major constraints' },
  { value: 'location', label: 'Location restrictions' },
  { value: 'visa', label: 'Visa/work authorization' },
  { value: 'degree', label: 'Missing degree requirements' },
  { value: 'experience-gap', label: 'Employment gaps' },
  { value: 'skills', label: 'Skills gap' },
  { value: 'other', label: 'Other' },
];

export default function CareerRealityCheckPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { resumeText } = useAnalysisStore();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CareerCheckResult | null>(null);
  const [loadingStage, setLoadingStage] = useState('');

  // Form state
  const [targetRole, setTargetRole] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [biggestConstraint, setBiggestConstraint] = useState('');
  const [timeline, setTimeline] = useState('');

  // Past results
  const [pastResults, setPastResults] = useState<any[]>([]);
  const [showPastResults, setShowPastResults] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPastResults();
    }
  }, [user]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id || !user) return;

    // Load a specific saved assessment (deep-link from History)
    (async () => {
      try {
        const { data, error } = await supabase
          .from('career_reality_checks')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;
        if (!data) return;

        setTargetRole(data.target_role);
        setTargetMarket(data.target_market);
        setYearsExperience(data.years_experience || '');
        setBiggestConstraint(data.biggest_constraint || '');
        setTimeline(data.timeline || '');

        const verdict = data.role_fit_verdict as CareerCheckResult['role_fit']['verdict'];
        const action = data.recommendation_action as CareerCheckResult['recommendation']['action'];

        setResult({
          role_fit: { verdict, explanation: data.role_fit_explanation },
          interview_probability: { percentage: data.interview_probability, reasoning: data.interview_reasoning },
          recommendation: { action, message: data.recommendation_message },
          hidden_risks: data.hidden_risks as unknown as CareerCheckResult['hidden_risks'],
          top_fixes: data.top_fixes as unknown as CareerCheckResult['top_fixes'],
        });
      } catch (e) {
        console.error('Error loading saved assessment:', e);
      }
    })();
  }, [searchParams, user]);

  const fetchPastResults = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('career_reality_checks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setPastResults(data || []);
    } catch (error) {
      console.error('Error fetching past results:', error);
    }
  };

  const handleSubmit = async () => {
    if (!resumeText) {
      toast({
        title: 'No resume data',
        description: 'Please complete an AI Review first to use Career Reality Check.',
        variant: 'destructive',
      });
      return;
    }

    if (!targetRole || !targetMarket) {
      toast({
        title: 'Missing information',
        description: 'Please fill in the target role and market.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setLoadingStage('Analyzing your profile against real hiring signals');

    try {
      const { data: response, error } = await supabase.functions.invoke('career-reality-check', {
        body: {
          resumeText,
          targetRole,
          targetMarket,
          yearsExperience,
          biggestConstraint,
          timeline,
        },
      });

      if (error) throw error;
      if (!response?.success) throw new Error(response?.error || 'Analysis failed');

      setResult(response.assessment);

      // Save to database if user is logged in
      if (user) {
        await saveResult(response.assessment);
        await fetchPastResults();
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to complete analysis';
      toast({
        title: 'Analysis Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setLoadingStage('');
    }
  };

  const saveResult = async (assessment: CareerCheckResult) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('career_reality_checks').insert({
        user_id: user.id,
        target_role: targetRole,
        target_market: targetMarket,
        years_experience: yearsExperience || null,
        biggest_constraint: biggestConstraint || null,
        timeline: timeline || null,
        role_fit_verdict: assessment.role_fit.verdict,
        role_fit_explanation: assessment.role_fit.explanation,
        interview_probability: assessment.interview_probability.percentage,
        interview_reasoning: assessment.interview_probability.reasoning,
        recommendation_action: assessment.recommendation.action,
        recommendation_message: assessment.recommendation.message,
        hidden_risks: JSON.parse(JSON.stringify(assessment.hidden_risks)),
        top_fixes: JSON.parse(JSON.stringify(assessment.top_fixes)),
      });

      if (error) throw error;
      toast({
        title: 'Assessment saved',
        description: 'Your Career Reality Check has been saved to your history.',
      });
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  const handleReset = () => {
    setResult(null);
    setTargetRole('');
    setTargetMarket('');
    setYearsExperience('');
    setBiggestConstraint('');
    setTimeline('');
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'strong': return <CheckCircle className="h-6 w-6 text-success" />;
      case 'borderline': return <Minus className="h-6 w-6 text-warning" />;
      case 'weak': return <XCircle className="h-6 w-6 text-destructive" />;
      default: return null;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'strong': return 'text-success';
      case 'borderline': return 'text-warning';
      case 'weak': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRecommendationStyle = (action: string) => {
    switch (action) {
      case 'apply_now': return 'bg-success/10 border-success/30 text-success';
      case 'delay_and_fix': return 'bg-warning/10 border-warning/30 text-warning';
      case 'pivot_role': return 'bg-destructive/10 border-destructive/30 text-destructive';
      default: return 'bg-muted border-border text-muted-foreground';
    }
  };

  const getRecommendationLabel = (action: string) => {
    switch (action) {
      case 'apply_now': return 'Apply Now';
      case 'delay_and_fix': return 'Delay & Fix';
      case 'pivot_role': return 'Consider Pivoting';
      default: return action;
    }
  };

  // If no resume text, show prompt to upload
  if (!resumeText) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Compass className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Career Reality Check</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get an honest market assessment of how employers see your profile.
            </p>
            <Card className="p-8 border-dashed">
              <div className="flex flex-col items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center">
                  <Upload className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Resume Required</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Complete an AI Resume Review first. Your resume data will be used 
                    to provide a personalized market assessment.
                  </p>
                </div>
                <Button variant="hero" onClick={() => navigate('/upload')}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume for AI Review
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Compass className="h-4 w-4" />
              Career Reality Check
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              How Does the Market See You?
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get an honest assessment of your job prospects based on your resume and target role.
            </p>
          </div>

          {/* Main Content */}
          {isLoading ? (
            <Card className="p-12">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full border-4 border-accent/20 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 text-accent animate-spin" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="font-medium text-foreground">{loadingStage}</p>
                  <p className="text-sm text-muted-foreground">
                    This may take a moment. We're analyzing your profile against current hiring patterns.
                  </p>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-2 w-2 rounded-full bg-accent/40 animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          ) : result ? (
            <div className="space-y-6 animate-fade-in">
              {/* Role Fit Verdict */}
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  {getVerdictIcon(result.role_fit.verdict)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">Role Fit</h3>
                      <span className={`text-sm font-medium capitalize ${getVerdictColor(result.role_fit.verdict)}`}>
                        {result.role_fit.verdict}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{result.role_fit.explanation}</p>
                  </div>
                </div>
              </Card>

              {/* Interview Probability */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="font-semibold">Interview Probability</h3>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {result.interview_probability.percentage}%
                  </div>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      result.interview_probability.percentage >= 70 ? 'bg-success' :
                      result.interview_probability.percentage >= 40 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${result.interview_probability.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{result.interview_probability.reasoning}</p>
              </Card>

              {/* Hidden Risks */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="font-semibold">Hidden Hiring Risks</h3>
                </div>
                <div className="space-y-3">
                  {result.hidden_risks.map((risk, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border ${getSeverityColor(risk.severity)}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium uppercase tracking-wide opacity-70">
                          {risk.type}
                        </span>
                        <span className="text-xs font-medium capitalize">
                          {risk.severity} risk
                        </span>
                      </div>
                      <p className="text-sm">{risk.risk}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Fixes */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold">Top Fixes</h3>
                </div>
                <div className="space-y-3">
                  {result.top_fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                      <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-accent">{i + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{fix.action}</p>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            fix.impact === 'high' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                          }`}>
                            {fix.impact} impact
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                            {fix.effort} effort
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendation */}
              <Card className={`p-6 border-2 ${getRecommendationStyle(result.recommendation.action)}`}>
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-5 w-5" />
                  <span className="font-semibold text-lg">
                    Recommendation: {getRecommendationLabel(result.recommendation.action)}
                  </span>
                </div>
                <p className="opacity-90">{result.recommendation.message}</p>
              </Card>

              {/* Actions */}
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleReset}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New Assessment
                </Button>
                <Button variant="hero" onClick={() => navigate('/score')}>
                  View Full Resume Analysis
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            /* Questionnaire Form */
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-6">Tell us about your goals</h3>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="targetRole">Target Role *</Label>
                        <Input
                          id="targetRole"
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          placeholder="e.g., Senior Product Manager"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="targetMarket">Target Market *</Label>
                        <Input
                          id="targetMarket"
                          value={targetMarket}
                          onChange={(e) => setTargetMarket(e.target.value)}
                          placeholder="e.g., United States, Remote"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Years of Experience</Label>
                        <Select value={yearsExperience} onValueChange={setYearsExperience}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            {EXPERIENCE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Timeline</Label>
                        <Select value={timeline} onValueChange={setTimeline}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIMELINE_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Biggest Constraint</Label>
                      <Select value={biggestConstraint} onValueChange={setBiggestConstraint}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your biggest challenge" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONSTRAINT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={!targetRole || !targetMarket}
                      variant="hero"
                      className="w-full"
                    >
                      Analyze My Market Position
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Resume Status */}
                <Card className="p-4 bg-success/5 border-success/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-sm text-foreground">Resume Ready</p>
                      <p className="text-xs text-muted-foreground">
                        Using data from your AI review
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Past Results */}
                {pastResults.length > 0 && (
                  <Card className="p-4">
                    <button
                      onClick={() => setShowPastResults(!showPastResults)}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Past Assessments</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${
                        showPastResults ? 'rotate-90' : ''
                      }`} />
                    </button>
                    {showPastResults && (
                      <div className="mt-3 space-y-2">
                        {pastResults.map((past) => (
                          <div
                            key={past.id}
                            className="p-2 rounded bg-secondary/50 text-sm cursor-pointer hover:bg-secondary"
                            onClick={() => {
                              setResult({
                                role_fit: {
                                  verdict: past.role_fit_verdict,
                                  explanation: past.role_fit_explanation,
                                },
                                interview_probability: {
                                  percentage: past.interview_probability,
                                  reasoning: past.interview_reasoning,
                                },
                                recommendation: {
                                  action: past.recommendation_action,
                                  message: past.recommendation_message,
                                },
                                hidden_risks: past.hidden_risks,
                                top_fixes: past.top_fixes,
                              });
                            }}
                          >
                            <p className="font-medium truncate">{past.target_role}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(past.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                )}

                {/* What to Expect */}
                <Card className="p-4">
                  <h4 className="font-medium text-sm mb-3">What You'll Get</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      Role fit assessment
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      Hidden hiring risks
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      Interview probability
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      High-impact fixes
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
