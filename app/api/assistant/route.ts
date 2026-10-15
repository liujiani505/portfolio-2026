import Anthropic from "@anthropic-ai/sdk";
import { retrieve } from "@/lib/corpus";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5";

type Turn = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are the portfolio assistant for ${site.name}, ${site.role} at ${site.company}.

You are talking to hiring managers, design leaders and recruiters who are evaluating ${site.name} for Principal and Staff product design roles. Your job is to help them understand the work quickly and accurately.

RULES
1. Answer only from the <context> provided. It is drawn from the case studies on this site.
2. If the context does not contain the answer, say so plainly and suggest what the visitor could ask instead. Never invent a project, metric, employer or date.
3. Be concise. Two or three short paragraphs at most. No headers, no bullet lists unless comparing three or more things.
4. Lead with the specific — a number, a decision, a tradeoff — not with a summary sentence.
5. Speak about ${site.name} in the third person. You are an assistant, not an impersonation.
6. When a case study is relevant, name it so the visitor knows where to look.
7. If asked something evaluative ("is she senior enough", "how does she handle ambiguity"), answer by pointing at evidence in the work rather than asserting a conclusion.
8. Never discuss compensation expectations, other candidates, or anything not present in the context.

TONE
Calm, direct, specific. The voice of a well-briefed colleague, not a marketer. No superlatives, no "passionate", no exclamation marks.`;

function buildContext(query: string) {
  const chunks = retrieve(query, 5);
  return chunks
    .map((c) => `<source id="${c.id}" label="${c.source}" href="${c.href}">\n${c.text}\n</source>`)
    .join("\n\n");
}

export async function POST(req: Request) {
  let body: { messages?: Turn[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) => typeof m?.content === "string" && m.content.trim().length > 0,
  );
  if (!messages.length) {
    return Response.json({ error: "No message provided." }, { status: 400 });
  }

  const latest = messages[messages.length - 1];
  if (latest.content.length > 1200) {
    return Response.json({ error: "Question is too long." }, { status: 413 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  // No key configured (e.g. a fork, or a preview deploy). The client has a
  // deterministic retrieval fallback, so we tell it to use that rather than erroring.
  if (!apiKey) {
    return Response.json({ mode: "offline" }, { status: 503 });
  }

  const anthropic = new Anthropic({ apiKey });
  const context = buildContext(
    messages
      .slice(-3)
      .map((m) => m.content)
      .join(" "),
  );

  const encoder = new TextEncoder();

  try {
    const stream = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 700,
      system: [
        { type: "text" as const, text: SYSTEM },
        { type: "text" as const, text: `<context>\n${context}\n</context>` },
      ],
      messages: messages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
      stream: true,
    });

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch {
          controller.enqueue(
            encoder.encode("\n\n[The response was interrupted. Please try again.]"),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("assistant route error", err);
    return Response.json({ mode: "offline" }, { status: 503 });
  }
}
