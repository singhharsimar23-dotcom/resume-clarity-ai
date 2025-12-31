import { create } from 'zustand';
import type { ResumeAnalysis } from '@/types/resume';

interface AnalysisState {
  analysis: ResumeAnalysis | null;
  fileName: string | null;
  resumeText: string | null;
  setAnalysis: (analysis: ResumeAnalysis, fileName?: string, resumeText?: string) => void;
  clearAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analysis: null,
  fileName: null,
  resumeText: null,
  setAnalysis: (analysis, fileName, resumeText) => set({ 
    analysis, 
    fileName: fileName || null,
    resumeText: resumeText || null,
  }),
  clearAnalysis: () => set({ analysis: null, fileName: null, resumeText: null }),
}));