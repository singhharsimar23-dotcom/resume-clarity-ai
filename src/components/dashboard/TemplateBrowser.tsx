import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ProfessionSelector } from './ProfessionSelector';
import { TemplateCard } from './TemplateCard';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { useResumeStore } from '@/stores/resume-store';
import { toast } from '@/hooks/use-toast';
import type { ProfessionCategory, ProfessionTemplate } from '@/data/profession-templates';
import { getTemplatesByProfession } from '@/data/profession-templates';
import type { ResumeData } from '@/types/builder';

export function TemplateBrowser() {
  const navigate = useNavigate();
  const { createResume } = useResumeStore();
  const [selectedProfession, setSelectedProfession] = useState<ProfessionCategory>('all');
  const [previewTemplate, setPreviewTemplate] = useState<ProfessionTemplate | null>(null);

  const templates = getTemplatesByProfession(selectedProfession);

  const handleUseTemplate = (template: ProfessionTemplate) => {
    const { previewData, sectionOrder, name, professionLabel } = template;
    
    // Create a new resume with pre-filled data
    const newResume: ResumeData = {
      id: crypto.randomUUID(),
      name: `${professionLabel} Resume`,
      templateId: template.id,
      contact: previewData.contact || {
        fullName: '',
        email: '',
        phone: '',
        location: '',
      },
      summary: previewData.summary,
      objective: previewData.objective,
      education: previewData.education || [],
      experience: previewData.experience || [],
      projects: previewData.projects || [],
      certifications: previewData.certifications || [],
      awards: previewData.awards || [],
      publications: previewData.publications || [],
      skills: previewData.skills || [],
      leadership: previewData.leadership || [],
      research: previewData.research || [],
      sectionOrder: sectionOrder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      score: 45, // Starting score for pre-filled template
    };

    createResume(newResume);
    
    toast({
      title: 'Template loaded',
      description: `Started with ${name} template. Customize it to make it yours!`,
    });
    
    navigate(`/builder/${newResume.id}`);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">Choose a Template</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Start with a profession-specific template pre-filled with example content
          </p>
        </div>

        {/* Profession Selector */}
        <ProfessionSelector
          selected={selectedProfession}
          onSelect={setSelectedProfession}
        />

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUseTemplate={handleUseTemplate}
              onPreview={setPreviewTemplate}
            />
          ))}
        </div>

        {/* Empty State */}
        {templates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No templates found for this category.</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        open={!!previewTemplate}
        onOpenChange={(open) => !open && setPreviewTemplate(null)}
        onUseTemplate={handleUseTemplate}
      />
    </Card>
  );
}
