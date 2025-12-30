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
import { Check, FileText } from 'lucide-react';
import type { ResumeTemplate } from '@/types/builder';

const templates: ResumeTemplate[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    role: 'Software Engineer',
    layout: 'standard',
    isAtsOptimized: true,
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    role: 'Data Analyst',
    layout: 'standard',
    isAtsOptimized: true,
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    role: 'Product Manager',
    layout: 'standard',
    isAtsOptimized: true,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    role: 'Marketing Specialist',
    layout: 'standard',
    isAtsOptimized: true,
  },
  {
    id: 'general-ats',
    name: 'General ATS',
    role: 'General',
    layout: 'standard',
    isAtsOptimized: true,
  },
  {
    id: 'compact',
    name: 'Compact',
    role: 'General',
    layout: 'compact',
    isAtsOptimized: true,
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
      onSelect({ ...template, layout });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose a Template</DialogTitle>
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
                className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTemplate === template.id
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-muted-foreground/50'
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-accent flex items-center justify-center">
                    <Check className="h-3 w-3 text-accent-foreground" />
                  </div>
                )}

                {/* Mini Preview */}
                <div className="aspect-[8.5/11] bg-secondary rounded-md mb-3 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground/50" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-medium text-sm text-foreground">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">{template.role}</p>
                  {template.isAtsOptimized && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      ATS Optimized
                    </Badge>
                  )}
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
