export interface CareerCheckInput {
  targetRole: string;
  targetMarket: string;
  yearsExperience: string;
  biggestConstraint: string;
  timeline: string;
}

export interface HiddenRisk {
  type: 'ats' | 'perception' | 'market' | 'credential';
  risk: string;
  severity: 'high' | 'medium' | 'low';
}

export interface TopFix {
  action: string;
  impact: 'high' | 'medium';
  effort: 'quick' | 'moderate' | 'significant';
}

export interface CareerCheckResult {
  role_fit: {
    verdict: 'strong' | 'borderline' | 'weak';
    explanation: string;
  };
  hidden_risks: HiddenRisk[];
  interview_probability: {
    percentage: number;
    reasoning: string;
  };
  top_fixes: TopFix[];
  recommendation: {
    action: 'apply_now' | 'delay_and_fix' | 'pivot_role';
    message: string;
  };
}
