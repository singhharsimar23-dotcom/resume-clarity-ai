import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Loader2, Sparkles, Copy, Check, Wand2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface BulletGeneratorProps {
  onInsert?: (bullet: string) => void;
  compact?: boolean;
}

export function BulletGenerator({ onInsert, compact = false }: BulletGeneratorProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bullets, setBullets] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateBullets = async () => {
    if (!jobTitle.trim()) {
      toast({
        title: 'Job title required',
        description: 'Please enter a job title to generate bullet points.',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    setBullets([]);

    try {
      const { data, error } = await supabase.functions.invoke('generate-bullets', {
        body: { 
          jobTitle: jobTitle.trim(), 
          company: company.trim() || undefined 
        }
      });

      if (error) throw error;

      if (data?.bullets && Array.isArray(data.bullets)) {
        setBullets(data.bullets);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      console.error('Error generating bullets:', error);
      toast({
        title: 'Generation failed',
        description: 'Unable to generate bullet points. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyBullet = async (bullet: string, index: number) => {
    await navigator.clipboard.writeText(bullet);
    setCopiedIndex(index);
    toast({
      title: 'Copied',
      description: 'Bullet point copied to clipboard.'
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleInsert = (bullet: string) => {
    if (onInsert) {
      onInsert(bullet);
      toast({
        title: 'Inserted',
        description: 'Bullet point added to your resume.'
      });
    }
  };

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">AI Bullet Generator</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="jobTitle-compact" className="text-xs">Job Title</Label>
            <Input
              id="jobTitle-compact"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Software Engineer"
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="company-compact" className="text-xs">Company (optional)</Label>
            <Input
              id="company-compact"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Google"
              className="h-9 text-sm"
            />
          </div>
        </div>

        <Button 
          onClick={generateBullets} 
          disabled={isGenerating || !jobTitle.trim()}
          size="sm"
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-3 w-3 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3 mr-2" />
              Generate Bullets
            </>
          )}
        </Button>

        {bullets.length > 0 && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {bullets.map((bullet, index) => (
              <div 
                key={index} 
                className="p-2 text-xs bg-secondary/50 rounded-md flex items-start gap-2 group"
              >
                <span className="flex-1">{bullet}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyBullet(bullet, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                  {onInsert && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleInsert(bullet)}
                    >
                      <Sparkles className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
          <Wand2 className="h-5 w-5 text-foreground" />
        </div>
        <div>
          <h3 className="font-semibold">AI Bullet Point Generator</h3>
          <p className="text-sm text-muted-foreground">
            Generate impact-focused resume bullet points
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title *</Label>
          <Input
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Software Engineer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company (optional)</Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Google"
          />
        </div>
      </div>

      <Button 
        onClick={generateBullets} 
        disabled={isGenerating || !jobTitle.trim()}
        className="w-full mb-6"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating bullet points...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Bullet Points
          </>
        )}
      </Button>

      {bullets.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Generated Bullets</h4>
          <div className="space-y-2">
            {bullets.map((bullet, index) => (
              <div 
                key={index} 
                className="p-3 text-sm bg-secondary/50 rounded-lg flex items-start gap-3 group"
              >
                <span className="text-muted-foreground mt-0.5">•</span>
                <span className="flex-1">{bullet}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => copyBullet(bullet, index)}
                    title="Copy"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                  {onInsert && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleInsert(bullet)}
                      title="Insert into resume"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Click to copy or insert into your resume. Edit as needed for accuracy.
          </p>
        </div>
      )}

      {!isGenerating && bullets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Enter a job title and click generate to create bullet points</p>
        </div>
      )}
    </Card>
  );
}
