import { create } from 'zustand';
import type { ResumeAnalysis } from '@/types/resume';

interface AnalysisState {
  analysis: ResumeAnalysis | null;
  fileName: string | null;
  setAnalysis: (analysis: ResumeAnalysis, fileName?: string) => void;
  clearAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analysis: null,
  fileName: null,
  setAnalysis: (analysis, fileName) => set({ analysis, fileName: fileName || null }),
  clearAnalysis: () => set({ analysis: null, fileName: null }),
}));