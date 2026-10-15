import Anthropic from "@anthropic-ai/sdk";
import type { Intake, Turn } from "@/components/lab/coach-script";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5";

/**
 * Difficult Conversation Coach — concept prototype.
 * The model returns JSON in a fixed shape so the interface can render
 * separate, dismissible suggestions. With no API key this returns
 * { mode: "offline" } and the client uses its scripted fallback.
 */
const RULES = `You are a preparation coach inside a design prototype. You help someone get ready for a difficult family conversation that they will have themselves, in person.

RULES
- Help with HOW to talk, never WHAT to decide. Give no financial, legal, tax or medical advice. If asked, say that is a question for a qualified professional.
- Never offer to contact, message or speak to the other person.
- You do not know the other person. Phrase anything about their feelings as a possibility ("may", "might").
- Warm, plain, brief. No therapy jargon, no exclamation marks.
- If the situation describes abuse, coercion or someone at risk of harm, do not coach; say this is beyond what the tool is for and suggest speaking with a qualified professional or local support service.
- Respond with JSON only. No prose outside the JSON.`;

const clip = (s: unknown, n: number) => (typeof s === "string" ? s.slice(0, n) : "");

function parseJson(text: string) {
  const a = text.indexOf("{");
  const b = text.lastIndexOf("}");
  if (a === -1 || b === -1) throw new Error("no json");
  return JSON.parse(text.slice(a, b + 1));
}

export async function POST(req: Request) {
  let body: { mode?: "prep" | "rehearse"; intake?: Intake; turns?: Turn[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return Response.json({ mode: "offline" }, { status: 503 });
  if (!body.intake || !body.mode) return Response.json({ error: "Missing fields." }, { status: 400 });

  const i = body.intake;
  const situation = `Talking with: ${clip(i.who, 60)}\nTopic: ${clip(i.topic, 80)}\nWhat makes it hard: ${clip(i.worry, 600) || "(not given)"}\nReaction they expect: ${clip(i.reaction, 60)}`;

  const task =
    body.mode === "prep"
      ? `Create a preparation sheet as JSON: {"opening": string (one or two sentences the person could actually say to open, in quotes), "theirSide": string[3] (what the other person may be feeling), "questions": string[4] (open questions to ask), "avoid": string[3] (short things to avoid)}.`
      : `Role-play the other person so the user can rehearse. Reply as JSON: {"reply": string (what the other person says next, 1-2 sentences, realistic for the expected reaction, softening slightly if the user is listening well), "note": string (one sentence of coaching for the user, out of character)}.`;

  const history =
    body.mode === "rehearse"
      ? "\n\nRehearsal so far:\n" +
        (body.turns ?? [])
          .slice(-10)
          .map((t) => `${t.role === "you" ? "User" : "Other person"}: ${clip(t.text, 500)}`)
          .join("\n")
      : "";

  try {
    const anthropic = new Anthropic({ apiKey });
    const res = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 700,
      system: RULES,
      messages: [{ role: "user", content: `${situation}${history}\n\n${task}` }],
    });
    const text = res.content.map((c) => (c.type === "text" ? c.text : "")).join("");
    return Response.json({ mode: "live", data: parseJson(text) }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("coach route error", err);
    return Response.json({ mode: "offline" }, { status: 503 });
  }
}
