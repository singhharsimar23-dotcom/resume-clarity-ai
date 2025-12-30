import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, SectionType } from '@/types/builder';

interface ResumeState {
  resumes: ResumeData[];
  currentResumeId: string | null;
  
  // Actions
  createResume: (resume: ResumeData) => void;
  updateResume: (id: string, updates: Partial<ResumeData>) => void;
  deleteResume: (id: string) => void;
  setCurrentResume: (id: string | null) => void;
  getCurrentResume: () => ResumeData | null;
  
  // Section management
  addSection: (resumeId: string, sectionType: SectionType) => void;
  removeSection: (resumeId: string, sectionType: SectionType) => void;
  reorderSections: (resumeId: string, newOrder: SectionType[]) => void;
  
  // Score updates
  updateScore: (resumeId: string, score: number) => void;
}

const generateId = () => crypto.randomUUID();

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [],
      currentResumeId: null,

      createResume: (resume) => {
        set((state) => ({
          resumes: [...state.resumes, resume],
          currentResumeId: resume.id,
        }));
      },

      updateResume: (id, updates) => {
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
          ),
        }));
      },

      deleteResume: (id) => {
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
          currentResumeId: state.currentResumeId === id ? null : state.currentResumeId,
        }));
      },

      setCurrentResume: (id) => {
        set({ currentResumeId: id });
      },

      getCurrentResume: () => {
        const state = get();
        return state.resumes.find((r) => r.id === state.currentResumeId) || null;
      },

      addSection: (resumeId, sectionType) => {
        set((state) => ({
          resumes: state.resumes.map((r) => {
            if (r.id === resumeId && !r.sectionOrder.includes(sectionType)) {
              return {
                ...r,
                sectionOrder: [...r.sectionOrder, sectionType],
                updatedAt: new Date().toISOString(),
              };
            }
            return r;
          }),
        }));
      },

      removeSection: (resumeId, sectionType) => {
        set((state) => ({
          resumes: state.resumes.map((r) => {
            if (r.id === resumeId) {
              return {
                ...r,
                sectionOrder: r.sectionOrder.filter((s) => s !== sectionType),
                updatedAt: new Date().toISOString(),
              };
            }
            return r;
          }),
        }));
      },

      reorderSections: (resumeId, newOrder) => {
        set((state) => ({
          resumes: state.resumes.map((r) => {
            if (r.id === resumeId) {
              return {
                ...r,
                sectionOrder: newOrder,
                updatedAt: new Date().toISOString(),
              };
            }
            return r;
          }),
        }));
      },

      updateScore: (resumeId, score) => {
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === resumeId ? { ...r, score, updatedAt: new Date().toISOString() } : r
          ),
        }));
      },
    }),
    {
      name: 'resume-storage',
    }
  )
);
