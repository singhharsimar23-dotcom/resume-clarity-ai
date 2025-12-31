import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import type { SectionType, Education, Experience, Project, Certification, Award, Skill, Leadership, Research, Publication } from '@/types/builder';

interface SectionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionType: SectionType | null;
  onSave: (sectionType: SectionType, data: any) => void;
  editData?: any;
}

export function SectionFormModal({
  open,
  onOpenChange,
  sectionType,
  onSave,
  editData,
}: SectionFormModalProps) {
  const [formData, setFormData] = useState<any>(editData || {});

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(sectionType!, { ...formData, id: formData.id || crypto.randomUUID() });
    setFormData({});
    onOpenChange(false);
  };

  const getSectionTitle = () => {
    const titles: Record<SectionType, string> = {
      summary: 'Professional Summary',
      objective: 'Career Objective',
      education: 'Education',
      experience: 'Professional Experience',
      leadership: 'Leadership',
      projects: 'Project',
      research: 'Research',
      certifications: 'Certification',
      awards: 'Award',
      publications: 'Publication',
      skills: 'Skill',
    };
    return titles[sectionType!] || 'Add Section';
  };

  const renderForm = () => {
    switch (sectionType) {
      case 'summary':
      case 'objective':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder={sectionType === 'summary' 
                  ? 'Write a compelling summary of your professional background...'
                  : 'Describe your career objectives...'}
                rows={5}
              />
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution *</Label>
                <Input
                  id="institution"
                  value={formData.institution || ''}
                  onChange={(e) => handleChange('institution', e.target.value)}
                  placeholder="University name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree *</Label>
                <Input
                  id="degree"
                  value={formData.degree || ''}
                  onChange={(e) => handleChange('degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="field">Field of Study *</Label>
              <Input
                id="field"
                value={formData.field || ''}
                onChange={(e) => handleChange('field', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Start Date *"
                value={formData.startDate || ''}
                onChange={(value) => handleChange('startDate', value)}
              />
              <DatePicker
                label="End Date *"
                value={formData.endDate || ''}
                onChange={(value) => handleChange('endDate', value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA (optional)</Label>
              <Input
                id="gpa"
                value={formData.gpa || ''}
                onChange={(e) => handleChange('gpa', e.target.value)}
                placeholder="3.8/4.0"
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={formData.company || ''}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Start Date *"
                value={formData.startDate || ''}
                onChange={(value) => handleChange('startDate', value)}
              />
              <DatePicker
                label="End Date"
                value={formData.endDate || ''}
                onChange={(value) => handleChange('endDate', value)}
                disabled={formData.current}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={formData.current || false}
                onCheckedChange={(checked) => handleChange('current', checked)}
              />
              <Label htmlFor="current">I currently work here</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bullets">Key Achievements (one per line)</Label>
              <Textarea
                id="bullets"
                value={(formData.bullets || []).join('\n')}
                onChange={(e) => handleChange('bullets', e.target.value.split('\n').filter(Boolean))}
                placeholder="Led team of 5 engineers...&#10;Increased revenue by 20%..."
                rows={4}
              />
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe your project..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input
                id="technologies"
                value={(formData.technologies || []).join(', ')}
                onChange={(e) => handleChange('technologies', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                placeholder="React, TypeScript, Node.js"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Project Link (optional)</Label>
              <Input
                id="link"
                value={formData.link || ''}
                onChange={(e) => handleChange('link', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="JavaScript"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category (optional)</Label>
              <Input
                id="category"
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Programming Languages"
              />
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Certification Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="AWS Solutions Architect"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization *</Label>
              <Input
                id="issuer"
                value={formData.issuer || ''}
                onChange={(e) => handleChange('issuer', e.target.value)}
                placeholder="Amazon Web Services"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Issue Date *</Label>
                <Input
                  id="date"
                  type="month"
                  value={formData.date || ''}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expirationDate">Expiration (optional)</Label>
                <Input
                  id="expirationDate"
                  type="month"
                  value={formData.expirationDate || ''}
                  onChange={(e) => handleChange('expirationDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'awards':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Award Title *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Employee of the Year"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization *</Label>
              <Input
                id="issuer"
                value={formData.issuer || ''}
                onChange={(e) => handleChange('issuer', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="month"
                value={formData.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={2}
              />
            </div>
          </div>
        );

      case 'leadership':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={formData.role || ''}
                  onChange={(e) => handleChange('role', e.target.value)}
                  placeholder="Team Lead"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization *</Label>
                <Input
                  id="organization"
                  value={formData.organization || ''}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  placeholder="Organization name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={formData.startDate || ''}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={formData.endDate || ''}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 'research':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Research Title *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Research project title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution *</Label>
              <Input
                id="institution"
                value={formData.institution || ''}
                onChange={(e) => handleChange('institution', e.target.value)}
                placeholder="Research institution"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={formData.startDate || ''}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={formData.endDate || ''}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 'publications':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Publication Title *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Publication title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher *</Label>
              <Input
                id="publisher"
                value={formData.publisher || ''}
                onChange={(e) => handleChange('publisher', e.target.value)}
                placeholder="Journal or publisher name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Publication Date *</Label>
              <Input
                id="date"
                type="month"
                value={formData.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link (optional)</Label>
              <Input
                id="link"
                value={formData.link || ''}
                onChange={(e) => handleChange('link', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!sectionType) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getSectionTitle()}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {renderForm()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
