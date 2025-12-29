import { create } from 'zustand';
import type { ResumeAnalysis } from '@/types/resume';

interface AnalysisState {
  analysis: ResumeAnalysis | null;
  setAnalysis: (analysis: ResumeAnalysis) => void;
  clearAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),
  clearAnalysis: () => set({ analysis: null }),
}));
