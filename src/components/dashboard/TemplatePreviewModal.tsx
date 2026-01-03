import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Copy, FileText } from 'lucide-react';
import type { ProfessionTemplate, ExperienceLevel } from '@/data/profession-templates';
import { getExperienceLevelLabel } from '@/data/profession-templates';

interface TemplatePreviewModalProps {
  template: ProfessionTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseTemplate: (template: ProfessionTemplate) => void;
}

const experienceLevelColors: Record<ExperienceLevel, string> = {
  entry: 'bg-emerald-100 text-emerald-700',
  mid: 'bg-blue-100 text-blue-700',
  senior: 'bg-purple-100 text-purple-700',
};

export function TemplatePreviewModal({ 
  template, 
  open, 
  onOpenChange, 
  onUseTemplate 
}: TemplatePreviewModalProps) {
  if (!template) return null;

  const { previewData } = template;
  const contact = previewData.contact;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{template.name}</DialogTitle>
              <p className="text-muted-foreground text-sm mt-1">{template.professionLabel}</p>
            </div>
            <Badge className={`${experienceLevelColors[template.experienceLevel]}`}>
              {getExperienceLevelLabel(template.experienceLevel)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Resume Preview */}
          <ScrollArea className="flex-1 h-[60vh] lg:h-[70vh]">
            <div className="bg-white border border-border rounded-lg shadow-sm p-8 text-sm space-y-6">
              {/* Header */}
              <div className="text-center border-b border-border pb-4">
                <h1 className="text-2xl font-bold text-foreground">{contact?.fullName}</h1>
                <p className="text-muted-foreground mt-1">
                  {[contact?.email, contact?.phone, contact?.location].filter(Boolean).join(' • ')}
                </p>
                {contact?.linkedin && (
                  <p className="text-muted-foreground text-xs mt-1">{contact.linkedin}</p>
                )}
              </div>

              {/* Summary */}
              {previewData.summary && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Professional Summary
                  </h2>
                  <p className="text-foreground leading-relaxed">{previewData.summary.content}</p>
                </section>
              )}

              {/* Experience */}
              {previewData.experience && previewData.experience.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Professional Experience
                  </h2>
                  <div className="space-y-4">
                    {previewData.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground">{exp.title}</h3>
                            <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                        <ul className="mt-2 space-y-1">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="text-foreground flex items-start gap-2">
                              <span className="text-muted-foreground mt-1.5">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {previewData.education && previewData.education.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {previewData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {edu.degree} in {edu.field}
                            </h3>
                            <p className="text-muted-foreground">{edu.institution}</p>
                            {edu.gpa && <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>}
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </span>
                        </div>
                        {edu.description && (
                          <p className="text-sm text-muted-foreground mt-1">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {previewData.projects && previewData.projects.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Projects
                  </h2>
                  <div className="space-y-3">
                    {previewData.projects.map((project) => (
                      <div key={project.id}>
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-muted-foreground text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="text-xs bg-secondary px-2 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {previewData.skills && previewData.skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {previewData.skills.map((skill) => (
                      <span 
                        key={skill.id} 
                        className="px-3 py-1 bg-secondary rounded-full text-sm text-foreground"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {previewData.certifications && previewData.certifications.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Certifications
                  </h2>
                  <div className="space-y-2">
                    {previewData.certifications.map((cert) => (
                      <div key={cert.id} className="flex justify-between">
                        <div>
                          <span className="font-medium text-foreground">{cert.name}</span>
                          <span className="text-muted-foreground"> - {cert.issuer}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{formatDate(cert.date)}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Publications */}
              {previewData.publications && previewData.publications.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Publications
                  </h2>
                  <div className="space-y-2">
                    {previewData.publications.map((pub) => (
                      <div key={pub.id}>
                        <p className="font-medium text-foreground">{pub.title}</p>
                        <p className="text-muted-foreground text-sm">
                          {pub.publisher} • {formatDate(pub.date)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Research */}
              {previewData.research && previewData.research.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Research
                  </h2>
                  <div className="space-y-3">
                    {previewData.research.map((research) => (
                      <div key={research.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground">{research.title}</h3>
                            <p className="text-muted-foreground">{research.institution}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(research.startDate)} - {research.endDate ? formatDate(research.endDate) : 'Present'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{research.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Leadership */}
              {previewData.leadership && previewData.leadership.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Leadership
                  </h2>
                  <div className="space-y-3">
                    {previewData.leadership.map((lead) => (
                      <div key={lead.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground">{lead.role}</h3>
                            <p className="text-muted-foreground">{lead.organization}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(lead.startDate)} - {lead.endDate ? formatDate(lead.endDate) : 'Present'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{lead.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Awards */}
              {previewData.awards && previewData.awards.length > 0 && (
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Awards & Honors
                  </h2>
                  <div className="space-y-2">
                    {previewData.awards.map((award) => (
                      <div key={award.id} className="flex justify-between">
                        <div>
                          <span className="font-medium text-foreground">{award.title}</span>
                          <span className="text-muted-foreground"> - {award.issuer}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{formatDate(award.date)}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </ScrollArea>

          {/* Actions Sidebar */}
          <div className="lg:w-64 space-y-4">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => {
                onUseTemplate(template);
                onOpenChange(false);
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Use This Template
            </Button>
            
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Template Info
              </p>
              <div className="text-sm space-y-2 text-foreground">
                <p><span className="text-muted-foreground">Sections:</span> {template.sectionOrder.length}</p>
                <p><span className="text-muted-foreground">Format:</span> ATS-Optimized</p>
                <p><span className="text-muted-foreground">Layout:</span> Single Column</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                About This Template
              </p>
              <p className="text-sm text-muted-foreground">
                {template.description}. Pre-filled with realistic example content that you can customize.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
