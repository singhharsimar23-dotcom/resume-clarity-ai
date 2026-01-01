import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import type { ResumeTemplate } from '@/types/builder';

const templates: (ResumeTemplate & { image: string; description: string })[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    role: 'Software Engineer',
    layout: 'standard',
    isAtsOptimized: true,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
    description: 'Optimized for technical roles, highlighting projects and skills',
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    role: 'Data Analyst',
    layout: 'standard',
    isAtsOptimized: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    description: 'Focused on metrics, analytics tools, and business impact',
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    role: 'Product Manager',
    layout: 'standard',
    isAtsOptimized: true,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
    description: 'Emphasizes strategy, roadmaps, and cross-functional leadership',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    role: 'Marketing Specialist',
    layout: 'standard',
    isAtsOptimized: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    description: 'Showcases campaigns, growth metrics, and creative skills',
  },
  {
    id: 'general-ats',
    name: 'General ATS',
    role: 'General',
    layout: 'standard',
    isAtsOptimized: true,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80',
    description: 'Universal format optimized for all applicant tracking systems',
  },
  {
    id: 'compact',
    name: 'Compact',
    role: 'General',
    layout: 'compact',
    isAtsOptimized: true,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
    description: 'Dense layout for extensive experience in limited space',
  },
];

interface TemplateSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (template: ResumeTemplate) => void;
}

export function TemplateSelectionModal({
  open,
  onOpenChange,
  onSelect,
}: TemplateSelectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [layout, setLayout] = useState<'standard' | 'compact'>('standard');

  const handleApply = () => {
    const template = templates.find((t) => t.id === selectedTemplate);
    if (template) {
      const { image, description, ...baseTemplate } = template;
      onSelect({ ...baseTemplate, layout });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose a Template</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select a template optimized for your target role
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Layout Options */}
          <div className="flex gap-3">
            <Button
              variant={layout === 'standard' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayout('standard')}
            >
              Standard
            </Button>
            <Button
              variant={layout === 'compact' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLayout('compact')}
            >
              Compact
            </Button>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`group relative rounded-xl border-2 transition-all text-left overflow-hidden ${
                  selectedTemplate === template.id
                    ? 'border-accent ring-2 ring-accent/20'
                    : 'border-border hover:border-muted-foreground/50'
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 z-20 h-6 w-6 rounded-full bg-accent flex items-center justify-center shadow-lg">
                    <Check className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}

                {/* Image Preview */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 bg-card">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{template.name}</h4>
                    {template.isAtsOptimized && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                        ATS
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={!selectedTemplate}>
            Apply Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
