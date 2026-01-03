import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Copy, Download, FileText } from 'lucide-react';
import type { ProfessionTemplate, ExperienceLevel } from '@/data/profession-templates';
import { getExperienceLevelLabel } from '@/data/profession-templates';

interface TemplateCardProps {
  template: ProfessionTemplate;
  onUseTemplate: (template: ProfessionTemplate) => void;
  onPreview: (template: ProfessionTemplate) => void;
}

const experienceLevelColors: Record<ExperienceLevel, string> = {
  entry: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  mid: 'bg-blue-100 text-blue-700 border-blue-200',
  senior: 'bg-purple-100 text-purple-700 border-purple-200',
};

export function TemplateCard({ template, onUseTemplate, onPreview }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const previewData = template.previewData;
  const contact = previewData.contact;
  const experience = previewData.experience?.[0];
  const education = previewData.education?.[0];
  const skills = previewData.skills?.slice(0, 4);

  return (
    <Card 
      className="group overflow-hidden transition-all duration-200 hover:shadow-lg border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Template Preview */}
      <div className="relative bg-secondary/30 p-4">
        {/* Mini Resume Preview */}
        <div className="bg-white rounded-lg shadow-sm p-4 text-[9px] leading-tight space-y-2 min-h-[180px]">
          {/* Header */}
          <div className="text-center border-b border-border/30 pb-2">
            <p className="font-semibold text-[11px] text-foreground">{contact?.fullName || 'Full Name'}</p>
            <p className="text-muted-foreground text-[8px]">
              {contact?.email} • {contact?.phone}
            </p>
          </div>
          
          {/* Summary */}
          {previewData.summary && (
            <div className="space-y-0.5">
              <p className="font-semibold text-[8px] uppercase text-muted-foreground tracking-wider">Summary</p>
              <p className="text-foreground/80 line-clamp-2">{previewData.summary.content}</p>
            </div>
          )}
          
          {/* Experience */}
          {experience && (
            <div className="space-y-0.5">
              <p className="font-semibold text-[8px] uppercase text-muted-foreground tracking-wider">Experience</p>
              <p className="font-medium text-foreground">{experience.title}</p>
              <p className="text-muted-foreground">{experience.company}</p>
            </div>
          )}
          
          {/* Education */}
          {education && (
            <div className="space-y-0.5">
              <p className="font-semibold text-[8px] uppercase text-muted-foreground tracking-wider">Education</p>
              <p className="font-medium text-foreground">{education.degree} in {education.field}</p>
              <p className="text-muted-foreground">{education.institution}</p>
            </div>
          )}
          
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="space-y-0.5">
              <p className="font-semibold text-[8px] uppercase text-muted-foreground tracking-wider">Skills</p>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-1.5 py-0.5 bg-secondary rounded text-[7px]"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Hover Actions Overlay */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Button 
            size="sm" 
            onClick={() => onPreview(template)}
            variant="outline"
            className="h-8"
          >
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
          <Button 
            size="sm" 
            onClick={() => onUseTemplate(template)}
            className="h-8"
          >
            Use Template
          </Button>
        </div>
      </div>
      
      {/* Template Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.professionLabel}</p>
          </div>
          <Badge 
            variant="outline" 
            className={`text-[10px] ${experienceLevelColors[template.experienceLevel]}`}
          >
            {getExperienceLevelLabel(template.experienceLevel)}
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2">
          {template.description}
        </p>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-1 pt-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => onPreview(template)}
          >
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => onUseTemplate(template)}
          >
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
}
