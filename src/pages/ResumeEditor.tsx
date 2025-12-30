import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Pencil, Trash2, GripVertical, Save, Eye, ArrowLeft } from 'lucide-react';
import { useResumeStore } from '@/stores/resume-store';
import { TemplateSelectionModal } from '@/components/builder/TemplateSelectionModal';
import { AddContentModal } from '@/components/builder/AddContentModal';
import { SectionFormModal } from '@/components/builder/SectionFormModal';
import { ResumePreview } from '@/components/builder/ResumePreview';
import { ScoreBadge } from '@/components/builder/ScoreBadge';
import type { ResumeData, SectionType, ResumeTemplate } from '@/types/builder';
import { toast } from '@/hooks/use-toast';

const createEmptyResume = (template: ResumeTemplate): ResumeData => ({
  id: crypto.randomUUID(),
  name: 'Untitled Resume',
  templateId: template.id,
  contact: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  awards: [],
  publications: [],
  skills: [],
  leadership: [],
  research: [],
  sectionOrder: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  score: 0,
});

const sectionLabels: Record<SectionType, string> = {
  summary: 'Professional Summary',
  objective: 'Career Objective',
  education: 'Education',
  experience: 'Professional Experience',
  leadership: 'Leadership',
  projects: 'Projects',
  research: 'Research',
  certifications: 'Certifications',
  awards: 'Awards & Honors',
  publications: 'Publications',
  skills: 'Skills',
};

export default function ResumeEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { resumes, createResume, updateResume, getCurrentResume, setCurrentResume } = useResumeStore();
  
  const [showTemplateModal, setShowTemplateModal] = useState(!id);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showSectionFormModal, setShowSectionFormModal] = useState(false);
  const [activeSectionType, setActiveSectionType] = useState<SectionType | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const resume = id 
    ? resumes.find(r => r.id === id) 
    : getCurrentResume();

  useEffect(() => {
    if (id) {
      setCurrentResume(id);
    }
  }, [id, setCurrentResume]);

  const handleTemplateSelect = (template: ResumeTemplate) => {
    const newResume = createEmptyResume(template);
    createResume(newResume);
    navigate(`/builder/${newResume.id}`, { replace: true });
  };

  const handleContactChange = (field: string, value: string) => {
    if (!resume) return;
    updateResume(resume.id, {
      contact: { ...resume.contact, [field]: value },
    });
  };

  const handleAddSection = (sectionType: SectionType) => {
    setActiveSectionType(sectionType);
    setEditingItem(null);
    
    // For summary/objective, directly open the form
    if (sectionType === 'summary' || sectionType === 'objective') {
      setShowSectionFormModal(true);
    } else {
      // For array sections, add to order and open form
      if (resume && !resume.sectionOrder.includes(sectionType)) {
        updateResume(resume.id, {
          sectionOrder: [...resume.sectionOrder, sectionType],
        });
      }
      setShowSectionFormModal(true);
    }
  };

  const handleSectionSave = (sectionType: SectionType, data: any) => {
    if (!resume) return;

    if (sectionType === 'summary') {
      updateResume(resume.id, { 
        summary: data,
        sectionOrder: resume.sectionOrder.includes('summary') 
          ? resume.sectionOrder 
          : [...resume.sectionOrder, 'summary'],
      });
    } else if (sectionType === 'objective') {
      updateResume(resume.id, { 
        objective: data,
        sectionOrder: resume.sectionOrder.includes('objective') 
          ? resume.sectionOrder 
          : [...resume.sectionOrder, 'objective'],
      });
    } else {
      // Array sections
      const arrayKey = sectionType as keyof Pick<ResumeData, 'education' | 'experience' | 'projects' | 'certifications' | 'awards' | 'publications' | 'skills' | 'leadership' | 'research'>;
      const currentArray = resume[arrayKey] as any[];
      
      if (editingItem) {
        // Update existing item
        const updatedArray = currentArray.map(item => 
          item.id === data.id ? data : item
        );
        updateResume(resume.id, { [arrayKey]: updatedArray });
      } else {
        // Add new item
        updateResume(resume.id, { [arrayKey]: [...currentArray, data] });
      }
    }

    // Simulate score calculation
    calculateScore();
    toast({ title: 'Section saved', description: 'Your resume has been updated.' });
  };

  const handleDeleteItem = (sectionType: SectionType, itemId: string) => {
    if (!resume) return;
    
    const arrayKey = sectionType as keyof Pick<ResumeData, 'education' | 'experience' | 'projects' | 'certifications' | 'awards' | 'publications' | 'skills' | 'leadership' | 'research'>;
    const currentArray = resume[arrayKey] as any[];
    const updatedArray = currentArray.filter(item => item.id !== itemId);
    
    updateResume(resume.id, { [arrayKey]: updatedArray });
    
    // Remove section from order if empty
    if (updatedArray.length === 0) {
      updateResume(resume.id, {
        sectionOrder: resume.sectionOrder.filter(s => s !== sectionType),
      });
    }
    
    calculateScore();
  };

  const handleEditItem = (sectionType: SectionType, item: any) => {
    setActiveSectionType(sectionType);
    setEditingItem(item);
    setShowSectionFormModal(true);
  };

  const calculateScore = () => {
    if (!resume) return;
    
    // Simple scoring logic based on completeness
    let score = 0;
    if (resume.contact.fullName) score += 10;
    if (resume.contact.email) score += 5;
    if (resume.contact.phone) score += 5;
    if (resume.summary?.content) score += 15;
    if (resume.experience.length > 0) score += 20;
    if (resume.education.length > 0) score += 15;
    if (resume.skills.length >= 3) score += 10;
    if (resume.skills.length >= 6) score += 5;
    if (resume.projects.length > 0) score += 10;
    if (resume.certifications.length > 0) score += 5;
    
    updateResume(resume.id, { score: Math.min(score, 100) });
  };

  const handleSave = () => {
    toast({ title: 'Resume saved', description: 'Your changes have been saved.' });
  };

  if (!resume && !showTemplateModal) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Resume not found</p>
            <Button onClick={() => navigate('/resumes')}>Go to Resumes</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      {/* Template Selection Modal */}
      <TemplateSelectionModal
        open={showTemplateModal}
        onOpenChange={(open) => {
          if (!open && !resume) {
            navigate('/resumes');
          }
          setShowTemplateModal(open);
        }}
        onSelect={handleTemplateSelect}
      />

      {/* Add Content Modal */}
      <AddContentModal
        open={showAddContentModal}
        onOpenChange={setShowAddContentModal}
        onSelectSection={handleAddSection}
        existingSections={resume?.sectionOrder || []}
      />

      {/* Section Form Modal */}
      <SectionFormModal
        open={showSectionFormModal}
        onOpenChange={setShowSectionFormModal}
        sectionType={activeSectionType}
        onSave={handleSectionSave}
        editData={editingItem}
      />

      {resume && (
        <main className="flex-1 container py-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/resumes')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Input
                value={resume.name}
                onChange={(e) => updateResume(resume.id, { name: e.target.value })}
                className="text-lg font-semibold w-64 border-transparent hover:border-border focus:border-border"
              />
            </div>
            <div className="flex items-center gap-3">
              <ScoreBadge score={resume.score || 0} size="sm" />
              <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor Panel */}
            <div className={`space-y-6 ${showPreview ? 'hidden lg:block' : ''}`}>
              {/* Contact Information */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={resume.contact.fullName}
                      onChange={(e) => handleContactChange('fullName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resume.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resume.contact.phone}
                      onChange={(e) => handleContactChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resume.contact.location}
                      onChange={(e) => handleContactChange('location', e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={resume.contact.linkedin || ''}
                      onChange={(e) => handleContactChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              </Card>

              {/* Sections */}
              {resume.sectionOrder.map((sectionType) => (
                <Card key={sectionType} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      <h3 className="font-semibold">{sectionLabels[sectionType]}</h3>
                    </div>
                  </div>

                  {/* Section Content */}
                  {(sectionType === 'summary' || sectionType === 'objective') && (
                    <div className="space-y-2">
                      {resume[sectionType]?.content ? (
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm text-muted-foreground flex-1">
                            {resume[sectionType]?.content}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditItem(sectionType, resume[sectionType])}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddSection(sectionType)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add {sectionLabels[sectionType]}
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Array Sections */}
                  {!['summary', 'objective'].includes(sectionType) && (
                    <div className="space-y-3">
                      {(resume[sectionType as keyof ResumeData] as any[])?.map((item: any) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-4 p-3 rounded-lg bg-secondary/50"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {item.title || item.name || item.institution || item.company || item.role || 'Untitled'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.issuer || item.degree || item.organization || item.publisher || item.category || ''}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditItem(sectionType, item)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleDeleteItem(sectionType, item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddSection(sectionType)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add {sectionLabels[sectionType]}
                      </Button>
                    </div>
                  )}
                </Card>
              ))}

              {/* Add Section Button */}
              <Button
                variant="outline"
                className="w-full border-dashed"
                onClick={() => setShowAddContentModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>

            {/* Preview Panel */}
            <div className={`${!showPreview && 'hidden lg:block'}`}>
              <Card className="overflow-hidden sticky top-24">
                <div className="aspect-[8.5/11] overflow-auto">
                  <ResumePreview resume={resume} />
                </div>
              </Card>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
