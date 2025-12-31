import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Compass } from 'lucide-react';
import { CareerCheckQuestionnaire } from './CareerCheckQuestionnaire';
import { CareerCheckResults } from './CareerCheckResults';
import { CareerCheckLoading } from './CareerCheckLoading';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { CareerCheckInput, CareerCheckResult } from '@/types/career-check';

interface CareerCheckSectionProps {
  resumeText: string | null;
}

export function CareerCheckSection({ resumeText }: CareerCheckSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CareerCheckResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: CareerCheckInput) => {
    if (!resumeText) {
      toast({
        title: 'No resume data',
        description: 'Please complete an AI Review first to use Career Reality Check.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const { data: response, error } = await supabase.functions.invoke('career-reality-check', {
        body: {
          resumeText,
          targetRole: data.targetRole,
          targetMarket: data.targetMarket,
          yearsExperience: data.yearsExperience,
          biggestConstraint: data.biggestConstraint,
          timeline: data.timeline,
        },
      });

      if (error) {
        throw error;
      }

      if (!response?.success) {
        throw new Error(response?.error || 'Analysis failed');
      }

      setResult(response.assessment);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to complete analysis';
      toast({
        title: 'Analysis Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Compass className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Career Reality Check</h3>
          <p className="text-sm text-muted-foreground">
            How does the market actually see you?
          </p>
        </div>
      </div>

      {!resumeText ? (
        <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Complete an AI Review first to unlock Career Reality Check.
          </p>
        </div>
      ) : isLoading ? (
        <CareerCheckLoading />
      ) : result ? (
        <CareerCheckResults result={result} onReset={handleReset} />
      ) : (
        <CareerCheckQuestionnaire onSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </Card>
  );
}
