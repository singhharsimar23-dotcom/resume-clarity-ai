import { Badge } from '@/components/ui/badge';
import type { ResumeData } from '@/types/builder';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  compact?: boolean;
}

export function ResumePreview({ resume, compact = false }: ResumePreviewProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className={`bg-white text-gray-900 ${compact ? 'p-4 text-xs' : 'p-8'} min-h-full`}>
      {/* Contact Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h1 className={`font-bold text-gray-900 ${compact ? 'text-lg' : 'text-2xl'} mb-1`}>
          {resume.contact.fullName || 'Your Name'}
        </h1>
        <div className={`flex flex-wrap gap-3 ${compact ? 'text-[10px]' : 'text-sm'} text-gray-600`}>
          {resume.contact.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {resume.contact.email}
            </span>
          )}
          {resume.contact.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {resume.contact.phone}
            </span>
          )}
          {resume.contact.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {resume.contact.location}
            </span>
          )}
          {resume.contact.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              {resume.contact.linkedin}
            </span>
          )}
          {resume.contact.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {resume.contact.website}
            </span>
          )}
        </div>
      </div>

      {/* Sections based on order */}
      {resume.sectionOrder.map((sectionType) => {
        switch (sectionType) {
          case 'summary':
            return resume.summary?.content ? (
              <section key="summary" className="mb-4">
                <h2 className={`font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                  Professional Summary
                </h2>
                <p className={`text-gray-700 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                  {resume.summary.content}
                </p>
              </section>
            ) : null;

          case 'objective':
            return resume.objective?.content ? (
              <section key="objective" className="mb-4">
                <h2 className={`font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                  Career Objective
                </h2>
                <p className={`text-gray-700 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                  {resume.objective.content}
                </p>
              </section>
            ) : null;

          case 'experience':
            return resume.experience.length > 0 ? (
              <section key="experience" className="mb-4">
                <h2 className={`font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                  Professional Experience
                </h2>
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>
                          {exp.title}
                        </h3>
                        <p className={`text-gray-600 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                          {exp.company}{exp.location && ` • ${exp.location}`}
                        </p>
                      </div>
                      <span className={`text-gray-500 ${compact ? 'text-[10px]' : 'text-xs'}`}>
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.bullets.length > 0 && (
                      <ul className={`list-disc list-inside mt-1 text-gray-700 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                        {exp.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            ) : null;

          case 'education':
            return resume.education.length > 0 ? (
              <section key="education" className="mb-4">
                <h2 className={`font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                  Education
                </h2>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-semibold text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className={`text-gray-600 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                          {edu.institution}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </p>
                      </div>
                      <span className={`text-gray-500 ${compact ? 'text-[10px]' : 'text-xs'}`}>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </section>
            ) : null;

          case 'skills':
            return resume.skills.length > 0 ? (
              <section key="skills" className="mb-4">
                <h2 className={`font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className={`bg-gray-100 text-gray-700 ${compact ? 'text-[9px] px-1.5 py-0' : 'text-xs'}`}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </section>
            ) : null;

          case 'projects':
            return resume.projects.length > 0 ? (
              <section key="projects" className="mb-4">
                <h2 className={`font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                  Projects
                </h2>
                {resume.projects.map((project) => (
                  <div key={project.id} className="mb-2">
                    <h3 className={`font-semibold text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>
                      {project.name}
                    </h3>
                    <p className={`text-gray-700 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                      {project.description}
                    </p>
                    {project.technologies.length > 0 && (
                      <p className={`text-gray-500 ${compact ? 'text-[10px]' : 'text-xs'}`}>
                        Technologies: {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            ) : null;

          case 'certifications':
            return resume.certifications.length > 0 ? (
              <section key="certifications" className="mb-4">
                <h2 className={`font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                  Certifications
                </h2>
                {resume.certifications.map((cert) => (
                  <div key={cert.id} className="mb-1">
                    <span className={`font-medium text-gray-900 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                      {cert.name}
                    </span>
                    <span className={`text-gray-600 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                      {' '}— {cert.issuer}, {formatDate(cert.date)}
                    </span>
                  </div>
                ))}
              </section>
            ) : null;

          case 'awards':
            return resume.awards.length > 0 ? (
              <section key="awards" className="mb-4">
                <h2 className={`font-semibold uppercase tracking-wide text-gray-700 border-b border-gray-200 pb-1 mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                  Awards & Honors
                </h2>
                {resume.awards.map((award) => (
                  <div key={award.id} className="mb-1">
                    <span className={`font-medium text-gray-900 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                      {award.title}
                    </span>
                    <span className={`text-gray-600 ${compact ? 'text-[10px]' : 'text-sm'}`}>
                      {' '}— {award.issuer}, {formatDate(award.date)}
                    </span>
                  </div>
                ))}
              </section>
            ) : null;

          default:
            return null;
        }
      })}

      {/* Empty State */}
      {resume.sectionOrder.length === 0 && !resume.contact.fullName && (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>Start adding sections to build your resume</p>
        </div>
      )}
    </div>
  );
}
