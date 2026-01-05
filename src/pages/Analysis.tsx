import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAnalysisStore } from '@/stores/analysis-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Loader2, 
  Upload,
  FileCheck,
  XCircle,
  BarChart3,
  Target,
  AlertTriangle,
  TrendingUp,
  Shield,
  LineChart,
  ArrowRight
} from 'lucide-react';

const analysisLayers = [
  {
    id: 1,
    title: 'ATS Parseability Score',
    shortName: 'TS Score',
    icon: FileCheck,
    description: 'Detect silent elimination before ranking even starts. If parsing fails, nothing else matters.',
    measures: [
      'Single-column safety (tables/columns cause field collision)',
      'Standard section headers (Experience, Education, Skills)',
      'Field extraction accuracy (name, titles, employers, dates)',
      'Header/footer interference',
      'File integrity (real text layer, not image PDFs)',
      'Layout risk flags (icons, graphics, decorative elements)'
    ],
    thresholds: [
      { range: '90–100', status: 'Safe', color: 'text-emerald-600' },
      { range: '75–89', status: 'Degraded (search visibility loss)', color: 'text-amber-600' },
      { range: '<75', status: 'Auto-reject risk', color: 'text-red-600' }
    ],
    critical: 'If TS < 75, all other scores become informational only.'
  },
  {
    id: 2,
    title: 'Requirement Coverage',
    shortName: 'Knockout Detection',
    icon: XCircle,
    description: 'Detect binary disqualifiers companies use to eliminate candidates fast.',
    measures: [
      'Mandatory degree / certification presence',
      'Required years of experience',
      'Required tools or platforms',
      'Location / work authorization signals',
      'Seniority/title alignment'
    ],
    behavior: 'Separates must-have vs nice-to-have. Flags missing must-haves as auto-reject.'
  },
  {
    id: 3,
    title: 'Content Signal Strength',
    shortName: 'Value Density',
    icon: BarChart3,
    description: 'Measure whether your resume emits evidence or noise. Recruiters pattern-match. They don\'t read.',
    measures: [
      '% of bullets with real metrics',
      'Action → Scope → Outcome completeness',
      'Decision ownership indicators',
      'Scope markers (users, revenue, latency, cost, risk)',
      'Redundancy and filler detection',
      'Passive vs outcome-driven phrasing'
    ],
    output: 'Signal Strength score. Weak bullets flagged as non-evidentiary.'
  },
  {
    id: 4,
    title: 'Role Reality Index',
    shortName: 'Seniority Sanity Check',
    icon: Target,
    description: 'Detect overreach or underutilization. Companies reject aspirational resumes constantly.',
    measures: [
      'Title-to-role seniority delta',
      'Responsibility vs role expectation gap',
      'Tool depth vs expected mastery',
      'Leadership and scope alignment',
      'Typical career paths for the role'
    ],
    bands: [
      { label: 'Underfit', desc: 'leaving opportunity on the table' },
      { label: 'Aligned', desc: 'appropriate match' },
      { label: 'Overreaching', desc: 'shortlist risk' }
    ]
  },
  {
    id: 5,
    title: 'Failure Cause Breakdown',
    shortName: 'Rejection Logic',
    icon: AlertTriangle,
    description: 'Reverse-engineer why you are being rejected, specifically.',
    measures: [
      'Knockout requirement misses',
      'ATS degradation impact',
      'Evidence insufficiency',
      'Seniority mismatch',
      'Domain mismatch',
      'Risk signals (inflation, vagueness, instability)'
    ],
    output: 'Ranked failure causes: Primary blocker, Secondary risks, Cosmetic issues. Each labeled as Auto-reject vs soft reject, Resume-fixable vs reality-fixable.'
  },
  {
    id: 6,
    title: 'Market Fit Analysis',
    shortName: 'Relative Positioning',
    icon: TrendingUp,
    description: 'Show where you stand relative to competition, not in isolation.',
    measures: [
      'Skill demand vs supply',
      'Experience percentile band',
      'Role saturation',
      'Compensation realism (inferred)',
      'Over/under-positioning risk'
    ],
    output: 'Market position band (bottom / mid / top). Safer role adjacencies. Positioning risks.'
  },
  {
    id: 7,
    title: 'Experience Credibility Score',
    shortName: 'Trust Simulation',
    icon: Shield,
    description: 'Simulate recruiter skepticism. Recruiters are trained to doubt.',
    measures: [
      'Metric plausibility',
      'Tool stack inflation',
      'Progression consistency',
      'Scope realism',
      'Evidence anchors (links, projects, artifacts)'
    ],
    formula: 'Credibility = Trust Signals − Inflation Signals',
    output: 'Credibility band (High / Medium / Low). Identifies what sounds inflated and what proof would neutralize doubt.'
  },
  {
    id: 8,
    title: 'Career Trajectory',
    shortName: 'Momentum Vector',
    icon: LineChart,
    description: 'Project direction, not ambition.',
    measures: [
      'Role progression slope',
      'Skill accumulation velocity',
      'Domain coherence',
      'Decision scope expansion',
      'Plateau indicators'
    ],
    vectors: [
      { label: 'Ascending', desc: 'positive momentum' },
      { label: 'Flat', desc: 'stagnation risk' },
      { label: 'Misaligned', desc: 'direction unclear' }
    ]
  }
];

export default function Analysis() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { analysis } = useAnalysisStore();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const hasAnalysis = !!analysis;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">AI Analysis System</h1>
          <p className="text-muted-foreground mt-1">
            8-point screening diagnostics that mirror how companies filter candidates
          </p>
        </div>

        {/* System Overview */}
        <Card className="p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">How Real Resume Screening Works</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Inside companies, resumes move through four irreversible stages:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Parsing', desc: 'Can the system even read you?' },
              { step: '2', title: 'Knockouts', desc: 'Are you immediately disqualified?' },
              { step: '3', title: 'Matching & Ranking', desc: 'How do you compare to others?' },
              { step: '4', title: 'Human Skim', desc: 'Do you look credible in 6–15 seconds?' }
            ].map((stage) => (
              <div key={stage.step} className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-6 w-6 rounded-full bg-foreground text-background text-xs flex items-center justify-center font-medium">
                    {stage.step}
                  </span>
                  <span className="font-medium text-sm">{stage.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{stage.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 border-l-2 border-foreground/20 pl-4 italic">
            If you fail early, later stages never happen. HireMax AI mirrors this reality.
          </p>
        </Card>

        {/* Analysis Status */}
        {!hasAnalysis ? (
          <Card className="p-12 text-center mb-8">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">No analysis yet</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Upload a resume to unlock the full 8-point screening analysis
                </p>
              </div>
              <Button onClick={() => navigate('/upload')}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Latest Analysis Available</h3>
                <p className="text-sm text-muted-foreground">
                  Score: {analysis.overall_score}/100 • {analysis.headline}
                </p>
              </div>
              <Button onClick={() => navigate('/score')}>
                View Full Report
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* 8-Point System */}
        <div className="space-y-6">
          <h2 className="font-semibold text-lg">The 8-Point Analysis System</h2>
          
          <div className="grid gap-6">
            {analysisLayers.map((layer) => (
              <Card key={layer.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <layer.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                        {layer.id}
                      </span>
                      <h3 className="font-semibold">{layer.title}</h3>
                      <span className="text-xs text-muted-foreground">({layer.shortName})</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{layer.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">What this measures</h4>
                        <ul className="grid sm:grid-cols-2 gap-1">
                          {layer.measures.map((measure, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-foreground/40 mt-0.5">•</span>
                              {measure}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {layer.thresholds && (
                        <div>
                          <h4 className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">Thresholds</h4>
                          <div className="flex flex-wrap gap-3">
                            {layer.thresholds.map((t, i) => (
                              <span key={i} className="text-xs">
                                <span className="font-medium">{t.range}</span>
                                <span className={`ml-1 ${t.color}`}>→ {t.status}</span>
                              </span>
                            ))}
                          </div>
                          {layer.critical && (
                            <p className="text-xs text-red-600 mt-2 font-medium">{layer.critical}</p>
                          )}
                        </div>
                      )}

                      {layer.bands && (
                        <div>
                          <h4 className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">Output Bands</h4>
                          <div className="flex flex-wrap gap-3">
                            {layer.bands.map((b, i) => (
                              <span key={i} className="text-xs">
                                <span className="font-medium">{b.label}</span>
                                <span className="text-muted-foreground ml-1">({b.desc})</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {layer.vectors && (
                        <div>
                          <h4 className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">Trajectory Vectors</h4>
                          <div className="flex flex-wrap gap-3">
                            {layer.vectors.map((v, i) => (
                              <span key={i} className="text-xs">
                                <span className="font-medium">{v.label}</span>
                                <span className="text-muted-foreground ml-1">({v.desc})</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {layer.output && (
                        <p className="text-xs text-muted-foreground border-l-2 border-foreground/10 pl-3">
                          <span className="font-medium text-foreground">Output:</span> {layer.output}
                        </p>
                      )}

                      {layer.formula && (
                        <p className="text-xs font-mono bg-secondary/50 px-3 py-2 rounded">
                          {layer.formula}
                        </p>
                      )}

                      {layer.behavior && (
                        <p className="text-xs text-muted-foreground border-l-2 border-foreground/10 pl-3">
                          {layer.behavior}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        {!hasAnalysis && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Ready to see how real screening systems evaluate your resume?</p>
            <Button size="lg" onClick={() => navigate('/upload')}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Resume for Analysis
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
