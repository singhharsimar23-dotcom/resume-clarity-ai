import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  Target,
  GraduationCap,
  Briefcase,
  Users,
  FolderOpen,
  FlaskConical,
  Award,
  Trophy,
  BookOpen,
  Wrench,
} from 'lucide-react';
import type { SectionType, SectionConfig } from '@/types/builder';

const sectionConfigs: SectionConfig[] = [
  {
    type: 'summary',
    title: 'Professional Summary',
    description: 'A brief overview of your qualifications and career goals',
    icon: 'FileText',
  },
  {
    type: 'objective',
    title: 'Career Objective',
    description: 'Your specific career goals and what you aim to achieve',
    icon: 'Target',
  },
  {
    type: 'education',
    title: 'Education',
    description: 'Your academic background and qualifications',
    icon: 'GraduationCap',
  },
  {
    type: 'experience',
    title: 'Professional Experience',
    description: 'Your work history and professional achievements',
    icon: 'Briefcase',
  },
  {
    type: 'leadership',
    title: 'Leadership',
    description: 'Leadership roles and management experience',
    icon: 'Users',
  },
  {
    type: 'projects',
    title: 'Projects',
    description: 'Notable projects you have worked on',
    icon: 'FolderOpen',
  },
  {
    type: 'research',
    title: 'Research',
    description: 'Research experience and contributions',
    icon: 'FlaskConical',
  },
  {
    type: 'certifications',
    title: 'Certifications',
    description: 'Professional certifications and credentials',
    icon: 'Award',
  },
  {
    type: 'awards',
    title: 'Awards & Honors',
    description: 'Recognition and achievements',
    icon: 'Trophy',
  },
  {
    type: 'publications',
    title: 'Publications',
    description: 'Published works and articles',
    icon: 'BookOpen',
  },
  {
    type: 'skills',
    title: 'Skills',
    description: 'Technical and soft skills',
    icon: 'Wrench',
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Target,
  GraduationCap,
  Briefcase,
  Users,
  FolderOpen,
  FlaskConical,
  Award,
  Trophy,
  BookOpen,
  Wrench,
};

interface AddContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectSection: (section: SectionType) => void;
  existingSections: SectionType[];
}

export function AddContentModal({
  open,
  onOpenChange,
  onSelectSection,
  existingSections,
}: AddContentModalProps) {
  const availableSections = sectionConfigs.filter(
    (s) => !existingSections.includes(s.type)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Content</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-4">
          {availableSections.map((section) => {
            const Icon = iconMap[section.icon] || FileText;
            return (
              <button
                key={section.type}
                onClick={() => {
                  onSelectSection(section.type);
                  onOpenChange(false);
                }}
                className="p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all text-left group"
              >
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-accent/10">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent" />
                </div>
                <h4 className="font-medium text-sm text-foreground mb-1">
                  {section.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {section.description}
                </p>
              </button>
            );
          })}

          {availableSections.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              All sections have been added to your resume.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
