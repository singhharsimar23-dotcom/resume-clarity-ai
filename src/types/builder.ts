// Resume Builder Types

export interface ResumeTemplate {
  id: string;
  name: string;
  role: string;
  layout: 'standard' | 'compact' | 'modern';
  isAtsOptimized: boolean;
  preview?: string;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

export interface ProfessionalSummary {
  content: string;
}

export interface CareerObjective {
  content: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expirationDate?: string;
  credentialId?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
}

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Research {
  id: string;
  title: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type SectionType = 
  | 'summary'
  | 'objective'
  | 'education'
  | 'experience'
  | 'leadership'
  | 'projects'
  | 'research'
  | 'certifications'
  | 'awards'
  | 'publications'
  | 'skills';

export interface ResumeData {
  id: string;
  name: string;
  templateId: string;
  contact: ContactInfo;
  summary?: ProfessionalSummary;
  objective?: CareerObjective;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  publications: Publication[];
  skills: Skill[];
  leadership: Leadership[];
  research: Research[];
  sectionOrder: SectionType[];
  createdAt: string;
  updatedAt: string;
  score?: number;
}

export interface SectionConfig {
  type: SectionType;
  title: string;
  description: string;
  icon: string;
}
