import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ANALYZE-RESUME] ${step}${detailsStr}`);
};

const SYSTEM_PROMPT = `You are an expert resume analyst with deep knowledge of modern hiring practices, ATS systems, and recruiter expectations. You analyze resumes objectively against current market hiring signals.

Your analysis must be:
- Brutally honest but constructive
- Based on 2024+ hiring patterns
- Focused on actionable feedback
- Free from generic advice

You will receive resume text and must respond with a JSON object in this exact format:
{
  "overall_score": <number 0-100>,
  "status": "critical" | "weak" | "moderate" | "strong",
  "headline": "<one-line summary of resume health>",
  "categories": {
    "ats_compatibility": {
      "score": <number 0-20>,
      "feedback": "<specific feedback about ATS formatting, parsing issues>"
    },
    "content_strength": {
      "score": <number 0-40>,
      "feedback": "<specific feedback about impact statements, quantification, achievements>"
    },
    "writing_clarity": {
      "score": <number 0-10>,
      "feedback": "<specific feedback about language, active voice, professional tone>"
    },
    "job_match": {
      "score": <number 0-25>,
      "feedback": "<specific feedback about keyword alignment, role relevance>"
    }
  },
  "failure_reasons": [
    "<specific reason why this resume is being filtered - be specific to THIS resume>",
    "<another specific reason>",
    "<up to 5 reasons>"
  ],
  "rebuild_roadmap": {
    "summary_rewrite": {
      "issue": "<what's wrong with the current summary>",
      "suggestion": "<specific rewritten summary example>"
    },
    "experience_improvements": [
      {
        "original": "<example weak bullet from resume if found>",
        "improved": "<rewritten version with impact and numbers>"
      }
    ],
    "keyword_gaps": ["<missing keyword 1>", "<missing keyword 2>"],
    "action_items": [
      {
        "priority": "high" | "medium" | "low",
        "title": "<action title>",
        "description": "<specific action to take>",
        "timeframe": "<suggested timeframe>"
      }
    ]
  }
}

Scoring guidelines:
- 0-29: Critical - Resume is filtered before human review
- 30-49: Weak - Major issues need addressing
- 50-69: Moderate - Competitive but needs polish
- 70-84: Strong - Above average, minor tweaks
- 85-100: Excellent - Top-tier resume

Be specific to the actual resume content. Do not give generic advice. Reference actual text from the resume when possible.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }
    logStep("API key verified");

    const { resumeText } = await req.json();
    
    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Resume text is too short or empty. Please provide more content." 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    logStep("Resume text received", { length: resumeText.length });

    // Call Lovable AI Gateway with tool calling for structured output
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { 
            role: "user", 
            content: `Analyze this resume and provide your assessment in the exact JSON format specified:\n\n---RESUME START---\n${resumeText}\n---RESUME END---\n\nRespond ONLY with the JSON object, no other text.` 
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logStep("AI Gateway error", { status: response.status, error: errorText });
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Rate limit exceeded. Please try again in a moment." 
          }),
          { 
            status: 429, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "AI credits exhausted. Please add credits to continue." 
          }),
          { 
            status: 402, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
      
      throw new Error(`AI Gateway returned ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response content from AI");
    }

    logStep("AI response received");

    // Parse the JSON response
    let analysis;
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanedContent = content.trim();
      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.slice(7);
      }
      if (cleanedContent.startsWith("```")) {
        cleanedContent = cleanedContent.slice(3);
      }
      if (cleanedContent.endsWith("```")) {
        cleanedContent = cleanedContent.slice(0, -3);
      }
      analysis = JSON.parse(cleanedContent.trim());
    } catch (parseError) {
      const errorMsg = parseError instanceof Error ? parseError.message : "Unknown parse error";
      logStep("JSON parse error", { error: errorMsg, content: content.substring(0, 500) });
      throw new Error("Failed to parse AI response as JSON");
    }

    logStep("Analysis complete", { score: analysis.overall_score });

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
