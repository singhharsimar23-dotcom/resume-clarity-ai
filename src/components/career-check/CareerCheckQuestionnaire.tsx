import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CareerCheckInput } from '@/types/career-check';
import { ArrowRight } from 'lucide-react';

interface CareerCheckQuestionnaireProps {
  onSubmit: (data: CareerCheckInput) => void;
  isLoading: boolean;
}

const CONSTRAINTS = [
  'Location restrictions',
  'Visa/work authorization',
  'Career gap',
  'Degree requirements',
  'Skill gaps',
  'Industry switch',
  'Salary expectations',
  'No constraints',
];

const TIMELINES = [
  { value: 'immediate', label: 'Immediate (actively applying)' },
  { value: '3-6-months', label: '3–6 months' },
  { value: 'flexible', label: 'Flexible / exploring' },
];

export function CareerCheckQuestionnaire({ onSubmit, isLoading }: CareerCheckQuestionnaireProps) {
  const [formData, setFormData] = useState<CareerCheckInput>({
    targetRole: '',
    targetMarket: '',
    yearsExperience: '',
    biggestConstraint: '',
    timeline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.targetRole && formData.targetMarket) {
      onSubmit(formData);
    }
  };

  const isValid = formData.targetRole.trim() && formData.targetMarket.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="targetRole" className="text-sm font-medium">
            Target Role <span className="text-destructive">*</span>
          </Label>
          <Input
            id="targetRole"
            placeholder="e.g. Software Engineer, Data Analyst"
            value={formData.targetRole}
            onChange={(e) => setFormData(prev => ({ ...prev, targetRole: e.target.value }))}
            className="bg-secondary/50"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetMarket" className="text-sm font-medium">
            Target Market <span className="text-destructive">*</span>
          </Label>
          <Input
            id="targetMarket"
            placeholder="e.g. United States, Remote Global"
            value={formData.targetMarket}
            onChange={(e) => setFormData(prev => ({ ...prev, targetMarket: e.target.value }))}
            className="bg-secondary/50"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="yearsExperience" className="text-sm font-medium">
            Years of Experience
          </Label>
          <Select
            value={formData.yearsExperience}
            onValueChange={(value) => setFormData(prev => ({ ...prev, yearsExperience: value }))}
            disabled={isLoading}
          >
            <SelectTrigger className="bg-secondary/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0–1 years</SelectItem>
              <SelectItem value="1-3">1–3 years</SelectItem>
              <SelectItem value="3-5">3–5 years</SelectItem>
              <SelectItem value="5-10">5–10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="biggestConstraint" className="text-sm font-medium">
            Biggest Constraint
          </Label>
          <Select
            value={formData.biggestConstraint}
            onValueChange={(value) => setFormData(prev => ({ ...prev, biggestConstraint: value }))}
            disabled={isLoading}
          >
            <SelectTrigger className="bg-secondary/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {CONSTRAINTS.map((constraint) => (
                <SelectItem key={constraint} value={constraint}>
                  {constraint}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline" className="text-sm font-medium">
            Timeline
          </Label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}
            disabled={isLoading}
          >
            <SelectTrigger className="bg-secondary/50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {TIMELINES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={!isValid || isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>Analyzing...</>
          ) : (
            <>
              Run Reality Check
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
