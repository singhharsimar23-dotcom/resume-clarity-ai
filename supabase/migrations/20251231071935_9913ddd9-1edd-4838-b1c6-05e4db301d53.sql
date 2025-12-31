-- Create career_reality_checks table to persist Career Reality Check results
CREATE TABLE public.career_reality_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_role TEXT NOT NULL,
  target_market TEXT NOT NULL,
  years_experience TEXT,
  biggest_constraint TEXT,
  timeline TEXT,
  role_fit_verdict TEXT NOT NULL,
  role_fit_explanation TEXT NOT NULL,
  interview_probability INTEGER NOT NULL,
  interview_reasoning TEXT NOT NULL,
  recommendation_action TEXT NOT NULL,
  recommendation_message TEXT NOT NULL,
  hidden_risks JSONB NOT NULL DEFAULT '[]'::jsonb,
  top_fixes JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.career_reality_checks ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own career checks" 
ON public.career_reality_checks 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own career checks" 
ON public.career_reality_checks 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own career checks" 
ON public.career_reality_checks 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_career_reality_checks_user_id ON public.career_reality_checks(user_id);
CREATE INDEX idx_career_reality_checks_created_at ON public.career_reality_checks(created_at DESC);