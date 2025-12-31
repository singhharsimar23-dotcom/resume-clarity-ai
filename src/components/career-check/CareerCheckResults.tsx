import type { CareerCheckResult } from '@/types/career-check';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ArrowRight,
  Zap,
  Clock,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CareerCheckResultsProps {
  result: CareerCheckResult;
  onReset: () => void;
}

export function CareerCheckResults({ result, onReset }: CareerCheckResultsProps) {
  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'strong':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bg: 'bg-success/10',
          label: 'Strong Fit'
        };
      case 'borderline':
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bg: 'bg-warning/10',
          label: 'Borderline'
        };
      default:
        return {
          icon: XCircle,
          color: 'text-destructive',
          bg: 'bg-destructive/10',
          label: 'Weak Fit'
        };
    }
  };

  const getRecommendationConfig = (action: string) => {
    switch (action) {
      case 'apply_now':
        return {
          icon: ArrowRight,
          color: 'text-success',
          bg: 'bg-success/10',
          border: 'border-success/20'
        };
      case 'delay_and_fix':
        return {
          icon: Clock,
          color: 'text-warning',
          bg: 'bg-warning/10',
          border: 'border-warning/20'
        };
      default:
        return {
          icon: Target,
          color: 'text-accent',
          bg: 'bg-accent/10',
          border: 'border-accent/20'
        };
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs bg-warning/20 text-warning border-warning/30">Medium</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Low</Badge>;
    }
  };

  const getEffortLabel = (effort: string) => {
    switch (effort) {
      case 'quick':
        return 'Quick fix';
      case 'moderate':
        return 'Moderate effort';
      default:
        return 'Significant effort';
    }
  };

  const verdictConfig = getVerdictConfig(result.role_fit.verdict);
  const recommendationConfig = getRecommendationConfig(result.recommendation.action);
  const VerdictIcon = verdictConfig.icon;
  const RecIcon = recommendationConfig.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Role Fit Verdict */}
      <div className={`p-4 rounded-lg ${verdictConfig.bg} border border-border/50`}>
        <div className="flex items-center gap-3 mb-2">
          <VerdictIcon className={`h-5 w-5 ${verdictConfig.color}`} />
          <span className={`font-semibold ${verdictConfig.color}`}>
            {verdictConfig.label}
          </span>
        </div>
        <p className="text-sm text-foreground/90">{result.role_fit.explanation}</p>
      </div>

      {/* Interview Probability */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">Interview Probability</span>
          <span className="text-2xl font-bold text-foreground">{result.interview_probability.percentage}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden mb-2">
          <div 
            className={`h-full transition-all duration-700 ${
              result.interview_probability.percentage >= 60 
                ? 'bg-success' 
                : result.interview_probability.percentage >= 30 
                  ? 'bg-warning' 
                  : 'bg-destructive'
            }`}
            style={{ width: `${result.interview_probability.percentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{result.interview_probability.reasoning}</p>
      </div>

      {/* Hidden Risks */}
      {result.hidden_risks.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Hidden Hiring Risks
          </h4>
          <div className="space-y-2">
            {result.hidden_risks.map((risk, i) => (
              <div 
                key={i} 
                className="p-3 rounded-lg bg-secondary/30 border border-border/30 flex items-start justify-between gap-3"
              >
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {risk.type.replace('_', ' ')}
                  </span>
                  <p className="text-sm text-foreground mt-0.5">{risk.risk}</p>
                </div>
                {getSeverityBadge(risk.severity)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Fixes */}
      {result.top_fixes.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            High-Leverage Fixes
          </h4>
          <div className="space-y-2">
            {result.top_fixes.map((fix, i) => (
              <div 
                key={i} 
                className="p-3 rounded-lg bg-accent/5 border border-accent/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-foreground flex-1">{fix.action}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${fix.impact === 'high' ? 'bg-accent/20 text-accent' : ''}`}
                    >
                      {fix.impact} impact
                    </Badge>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {getEffortLabel(fix.effort)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      <div className={`p-4 rounded-lg ${recommendationConfig.bg} border ${recommendationConfig.border}`}>
        <div className="flex items-center gap-2 mb-2">
          <RecIcon className={`h-4 w-4 ${recommendationConfig.color}`} />
          <span className={`text-sm font-semibold ${recommendationConfig.color}`}>
            Recommendation
          </span>
        </div>
        <p className="text-sm text-foreground">{result.recommendation.message}</p>
      </div>

      {/* Reset */}
      <div className="pt-2">
        <Button variant="outline" onClick={onReset} className="w-full sm:w-auto">
          Run Another Check
        </Button>
      </div>
    </div>
  );
}
