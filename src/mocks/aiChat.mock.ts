import { AiChatMessage, SuggestedPrompt } from "@/features/aiChat/types";

export const aiChatInitialMessagesMock: AiChatMessage[] = [
  {
    id: "system-1",
    role: "assistant",
    content:
      "Hi Alex, I’m your MangoCare AI assistant. I can help you understand symptoms, prepare questions for your doctor, and explain lab results in simple language.",
    createdAt: "2026-06-16T09:00:00.000Z",
  },
];

export const aiChatSuggestedPromptsMock: SuggestedPrompt[] = [
  {
    id: "prompt-1",
    title: "Explain my blood results",
    message: "Can you explain my latest blood analysis in simple words?",
  },
  {
    id: "prompt-2",
    title: "I feel tired",
    message: "I have been feeling tired recently. What could be the reason?",
  },
  {
    id: "prompt-3",
    title: "Prepare doctor questions",
    message:
      "Help me prepare questions for my next consultation with my doctor.",
  },
  {
    id: "prompt-4",
    title: "Mood check-in",
    message: "Can you help me check in with my mood today?",
  },
];