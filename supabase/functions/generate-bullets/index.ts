const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobTitle, company } = await req.json();

    if (!jobTitle) {
      return new Response(
        JSON.stringify({ error: 'Job title is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompt = `Generate 5 professional resume bullet points for a ${jobTitle}${company ? ` at ${company}` : ''}.

Requirements:
- Start each bullet with a strong action verb
- Include specific metrics and quantifiable results where realistic
- Focus on impact and outcomes, not just responsibilities
- Use ATS-friendly formatting (no special characters)
- Keep each bullet to 1-2 lines maximum
- Make them realistic and professional
- Avoid generic phrases like "responsible for" or "worked on"
- Structure: Action verb + What you did + Result/Impact

Return ONLY a JSON array of 5 strings, no other text. Example format:
["Bullet 1", "Bullet 2", "Bullet 3", "Bullet 4", "Bullet 5"]`;

    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    
    if (!anthropicApiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error('Failed to generate bullets');
    }

    const data = await response.json();
    const content = data.content[0]?.text || '[]';
    
    // Parse the JSON array from the response
    let bullets: string[];
    try {
      bullets = JSON.parse(content);
      if (!Array.isArray(bullets)) {
        throw new Error('Invalid format');
      }
    } catch {
      // If parsing fails, try to extract bullets from text
      const lines = content.split('\n').filter((line: string) => line.trim());
      bullets = lines.slice(0, 5).map((line: string) => 
        line.replace(/^[\d\.\-\*\•]\s*/, '').trim()
      );
    }

    return new Response(
      JSON.stringify({ bullets }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-bullets:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate bullet points' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
