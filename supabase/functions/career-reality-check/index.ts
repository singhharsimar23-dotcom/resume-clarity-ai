import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CAREER-REALITY-CHECK] ${step}${detailsStr}`);
};

const SYSTEM_PROMPT = `You are a senior career strategist who provides brutally honest, market-reality assessments. You analyze candidates against real hiring signals, not theoretical best practices.

Your role is to answer one question: "Given who you are and what you want, how does the market actually see you?"

You will receive:
1. Resume text
2. Target role
3. Target market/country
4. Years of experience
5. Biggest constraint (location, degree, gaps, skills, visa, etc.)
6. Timeline urgency

You must respond with a JSON object in this exact format:
{
  "role_fit": {
    "verdict": "strong" | "borderline" | "weak",
    "explanation": "<1-2 sentence honest assessment of fit>"
  },
  "hidden_risks": [
    {
      "type": "ats" | "perception" | "market" | "credential",
      "risk": "<specific hidden hiring risk>",
      "severity": "high" | "medium" | "low"
    }
  ],
  "interview_probability": {
    "percentage": <number 0-100>,
    "reasoning": "<brief explanation of why this percentage>"
  },
  "top_fixes": [
    {
      "action": "<specific high-leverage fix>",
      "impact": "high" | "medium",
      "effort": "quick" | "moderate" | "significant"
    }
  ],
  "recommendation": {
    "action": "apply_now" | "delay_and_fix" | "pivot_role",
    "message": "<clear, direct recommendation in 1-2 sentences>"
  }
}

Analysis guidelines:
- Be direct. No fake encouragement.
- Focus on market reality, not resume perfection.
- Hidden risks should be things the candidate likely doesn't know.
- Interview probability is a rough signal, not a promise.
- Top fixes must be high-leverage only (3-4 max). No cosmetic advice.
- Recommendation should be actionable and honest.

Tone: Direct, calm, professional. Like a trusted advisor who respects you enough to tell the truth.`;

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

    const { resumeText, targetRole, targetMarket, yearsExperience, biggestConstraint, timeline } = await req.json();
    
    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Resume text is too short. Please provide more content." 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    if (!targetRole || !targetMarket) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Target role and market are required." 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    logStep("Input received", { 
      resumeLength: resumeText.length, 
      targetRole, 
      targetMarket,
      yearsExperience,
      timeline
    });

    const userMessage = `Analyze this candidate's market position:

---RESUME---
${resumeText}
---END RESUME---

---CANDIDATE PROFILE---
Target Role: ${targetRole}
Target Market: ${targetMarket}
Years of Experience: ${yearsExperience || "Not specified"}
Biggest Constraint: ${biggestConstraint || "Not specified"}
Timeline: ${timeline || "Not specified"}
---END PROFILE---

Provide your market reality assessment in the exact JSON format specified. Be direct and honest.`;

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
          { role: "user", content: userMessage }
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

    let assessment;
    try {
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
      assessment = JSON.parse(cleanedContent.trim());
    } catch (parseError) {
      const errorMsg = parseError instanceof Error ? parseError.message : "Unknown parse error";
      logStep("JSON parse error", { error: errorMsg, content: content.substring(0, 500) });
      throw new Error("Failed to parse AI response");
    }

    logStep("Assessment complete", { 
      verdict: assessment.role_fit?.verdict,
      probability: assessment.interview_probability?.percentage
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        assessment 
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
