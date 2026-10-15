/**
 * Shared shapes + the scripted fallback for the Difficult Conversation Coach.
 * The fallback is deterministic: it runs with no API key, and is always
 * labelled as scripted in the interface.
 */
export type Intake = { who: string; topic: string; worry: string; reaction: string };
export type Prep = { opening: string; theirSide: string[]; questions: string[]; avoid: string[] };
export type Turn = { role: "you" | "them"; text: string };
export type RehearseReply = { reply: string; note: string };

export const WHO = ["A parent", "An adult child", "My partner", "A sibling"];
export const TOPICS = [
  "Inheritance & estate plans",
  "Helping a family member financially",
  "Aging & future care",
  "Different expectations about money",
];
export const REACTIONS = ["Change the subject", "Get defensive", "Get upset", "I don't know"];

const who = (w: string) => w.replace(/^(A|An|My) /, "").toLowerCase();

export function scriptedPrep(i: Intake): Prep {
  const p = who(i.who);
  const t = i.topic.toLowerCase();
  return {
    opening: `"There's something I've been wanting to talk about, and I've been putting it off because it matters to me. Could we find some time to talk about ${t}? I'm not looking to decide anything today — I'd just like to understand how you see it."`,
    theirSide: [
      `Your ${p} may hear this as a question about trust or control, even if you don't mean it that way.`,
      "They may not have thought it through yet, and feel put on the spot.",
      i.reaction === "Get upset"
        ? "Strong emotion often means the topic is tied to something bigger — fairness, independence, or fear of loss."
        : "Avoidance is often protective. It doesn't necessarily mean they don't care.",
    ],
    questions: [
      "What matters most to you about this?",
      "Is there anything about this you've been worried to bring up with me?",
      "What would a good outcome look like for you?",
      "Would it help to have someone else — an advisor or attorney — in a later conversation?",
    ],
    avoid: [
      "Opening with a solution or a number.",
      "\"You always…\" or \"You never…\"",
      "Trying to finish everything in one conversation.",
    ],
  };
}

const SCRIPT: Record<string, string[]> = {
  "Change the subject": [
    "Oh — we don't need to get into all that right now. How's work going?",
    "I just don't see why it has to be today.",
    "…All right. I suppose I have been avoiding it. What did you want to know?",
  ],
  "Get defensive": [
    "Why are you bringing this up? Do you think I haven't handled things properly?",
    "It feels like you're checking up on me.",
    "…I hear that you're not criticising me. It's just hard to talk about.",
  ],
  "Get upset": [
    "I really don't want to think about this. It's upsetting.",
    "It makes it feel like something bad is about to happen.",
    "…Thank you for not pushing. Maybe we can talk a little.",
  ],
  "I don't know": [
    "Hm. I wasn't expecting that. What's on your mind?",
    "I haven't really thought about it, to be honest.",
    "…I suppose it would be good to talk it through. Where would we start?",
  ],
};

const NOTES = [
  "Notice the reaction is about how it feels, not the facts. Try acknowledging the feeling before repeating your point.",
  "You don't need to win this turn. A question that invites their view often lowers the temperature.",
  "This is an opening. A good next step is to agree on a time to continue, rather than push further now.",
];

export function scriptedReply(i: Intake, turns: Turn[]): RehearseReply {
  const n = Math.min(turns.filter((t) => t.role === "you").length - 1, 2);
  const lines = SCRIPT[i.reaction] ?? SCRIPT["I don't know"];
  return { reply: lines[Math.max(n, 0)], note: NOTES[Math.max(n, 0)] };
}
