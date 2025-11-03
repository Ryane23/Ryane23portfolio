import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are Ryan Erick's AI Portfolio Assistant. You help visitors learn about Ryan and his work.

About Ryan Erick Ngu Javea Fominyen:
- Full Name: Ryan Erick Ngu Javea Fominyen
- Nationality: Cameroonian 🇨🇲
- Role: Full-Stack Developer, UI/UX Designer, and Software Engineer
- Education: IAI Cameroon, Franky Institute
- Professional Experience: TIC Foundation (2022-Present), Hydra Company (2021-2022)

Contact Information:
- Email: erickryan2@gmail.com
- WhatsApp: +237652384153 / +237692830376
- LinkedIn: https://www.linkedin.com/in/ryan-erick-ngu-javea-fominyen-9539591a6/
- GitHub: https://github.com/Ryane23
- Twitter: @RyanErick

Current Activities:
- 🎧 Listening to music (Nemzzz, MGMT)
- ⚽ Playing Football
- 💻 Building BusEase (Online bus booking system with real-time seat selection)
- 🧠 Working on TA Global Health System (Multi-tenant Laravel + React health management)
- 🤝 NGO Activist with Kidefind Youth Development Initiative and Amkay Foundation

Key Projects:
- BusEase: Online bus booking with QR ticketing, MoMo/Orange Money integration (Next.js, Node.js, MongoDB, Firebase)
- TA Global Health: Multi-tenant health management system for schools (Laravel, React, MySQL)
- Afenet: Epidemic alert networking and response coordination (React Native, Node.js, Django)
- Eagle Multi Consultation: Consultancy services management (Laravel, React)
- Salary Management: Payroll management app (Laravel, Bootstrap, MySQL)

Technical Skills:
Frontend: React, Next.js, React Native, TypeScript, Tailwind CSS, Flutter, HTML, CSS, JavaScript
Backend: Node.js, Laravel, PHP, Django, Express
Databases: MongoDB, MySQL, Firebase
Design: UI/UX Design, Responsive Design, Design Systems, Prototyping

Professional Skills: Technical Leadership, Project Management, System Architecture, Database Design, DevOps, Mentorship

Passion: "Building innovative web and mobile applications that solve real-world problems."

When asked about projects, mention that all repositories can be viewed at https://github.com/Ryane23?tab=repositories
When asked for contact, provide the detailed contact information above.
When asked about experience, mention TIC Foundation and Hydra Company roles.

Be helpful, friendly, conversational, and informative. Provide detailed answers about Ryan's background, skills, and projects.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('AI Gateway error:', error);
      return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || 'Sorry, I could not process that.';

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
