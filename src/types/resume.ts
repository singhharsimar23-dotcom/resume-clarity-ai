export interface ResumeCategory {
  score: number;
  feedback: string;
}

export interface ExperienceImprovement {
  original: string;
  improved: string;
}

export interface ActionItem {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timeframe: string;
}

export interface ResumeAnalysis {
  overall_score: number;
  status: 'critical' | 'weak' | 'moderate' | 'strong';
  headline: string;
  categories: {
    ats_compatibility: ResumeCategory;
    content_strength: ResumeCategory;
    writing_clarity: ResumeCategory;
    job_match: ResumeCategory;
  };
  failure_reasons: string[];
  rebuild_roadmap: {
    summary_rewrite: {
      issue: string;
      suggestion: string;
    };
    experience_improvements: ExperienceImprovement[];
    keyword_gaps: string[];
    action_items: ActionItem[];
  };
}

export interface AnalysisResponse {
  success: boolean;
  error?: string;
  analysis?: ResumeAnalysis;
}
