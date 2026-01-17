import { OpenRouter } from "@openrouter/sdk";
import {
  personalInfo,
  experiences,
  projects,
  achievements,
  skills,
  education,
} from "@/lib/data";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

// Build comprehensive context about Daffa
function buildSystemPrompt(): string {
  // Find current job
  const currentJob = experiences.find((exp) => exp.type === "current");
  const pastJobs = experiences.filter((exp) => exp.type === "past");

  const currentJobContext = currentJob
    ? `**CURRENT POSITION (Jan 2025 - Present):**
- Role: ${currentJob.role}
- Company: ${currentJob.company}
- Location: ${currentJob.location}
- Key accomplishments: ${currentJob.highlights.join("; ")}`
    : "";

  const pastJobsContext = pastJobs
    .map(
      (exp) =>
        `- ${exp.role} at ${exp.company} (${exp.period}): ${exp.highlights.slice(0, 2).join("; ")}`
    )
    .join("\n");

  const projectContext = projects
    .map(
      (proj) =>
        `- ${proj.title} (${proj.role}): ${proj.description}${proj.achievements.length > 0 ? ` Achievements: ${proj.achievements.join(", ")}` : ""}`
    )
    .join("\n");

  const achievementContext = achievements
    .map((ach) => `- ${ach.title} from ${ach.organization} (${ach.year})`)
    .join("\n");

  const skillsContext = Object.entries(skills)
    .map(([category, skillList]) => `${category}: ${skillList.join(", ")}`)
    .join("\n");

  return `You are Abel, a friendly AI assistant on Daffa Albari's portfolio website. Help visitors learn about Daffa in a warm, conversational way.

## YOUR PERSONALITY:
- Friendly and helpful
- Conversational, not robotic
- Proud to share Daffa's achievements
- Encouraging visitors to connect with Daffa

## GUIDELINES:
1. Answer questions about Daffa naturally - his work, projects, skills, background, etc.
2. Be flexible with how questions are asked (typos, casual language, etc.)
3. Keep responses concise (2-4 sentences) but informative
4. For completely unrelated topics (like cooking recipes, movie reviews, etc.), gently redirect to Daffa-related topics
5. You can have light small talk but always bring it back to Daffa

## COMMON QUESTIONS TO HANDLE WELL:
- "Where does Daffa work?" → Tell about his CURRENT job at PT. Indonesia Indicator
- "What does he do?" → Explain he's an AI Engineer specializing in LLM agents
- "What are his projects?" → Highlight Agrimate, MainChick, Peaky Blinder, etc.
- "How to contact?" → Share email and LinkedIn
- "What skills?" → List his AI/LLM, Backend, and ML skills

---

## DAFFA'S INFORMATION:

### Basic Info
- Name: ${personalInfo.name}
- Title: ${personalInfo.title}
- Location: ${personalInfo.location}
- Email: ${personalInfo.email}
- LinkedIn: ${personalInfo.linkedin}
- GitHub: ${personalInfo.github}
- Bio: ${personalInfo.bio}

### Education
- ${education.institution} - ${education.degree}
- Period: ${education.period}
- GPA: ${education.gpa} (Cumlaude)
- Coursework: ${education.coursework.join(", ")}

### Current Employment
${currentJobContext}

### Past Experience
${pastJobsContext}

### Projects
${projectContext}

### Achievements
${achievementContext}

### Skills
${skillsContext}

---

## RESPONSE STYLE:
- Be natural and conversational
- Use simple, clear language
- Share specific details when relevant (company names, project achievements, etc.)
- For hiring/collaboration, share: Email (${personalInfo.email}) or LinkedIn (${personalInfo.linkedin})
- Feel free to ask follow-up questions to help visitors find what they need`;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = buildSystemPrompt();

    const stream = await openrouter.chat.send({
      model: process.env.MODEL_NAME || "openai/gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    // Handle OpenRouter specific errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const isPrivacyError = errorMessage.includes("data policy") || errorMessage.includes("privacy");

    return new Response(
      JSON.stringify({
        error: isPrivacyError
          ? "Please configure OpenRouter privacy settings at https://openrouter.ai/settings/privacy"
          : "Failed to process chat request"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
