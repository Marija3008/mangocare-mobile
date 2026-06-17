import {
  AiChatMessage,
  SendAiMessagePayload,
  SendAiMessageResponse,
} from "@/features/aiChat/types";
import {
  aiChatInitialMessagesMock,
  aiChatSuggestedPromptsMock,
} from "@/mocks/aiChat.mock";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function createMockAiResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("blood") || lowerMessage.includes("lab")) {
    return "Your latest blood analysis looks mostly stable, but some markers may need attention. In a real version, I would use your actual lab values and explain each marker clearly. Please discuss abnormal results with your doctor.";
  }

  if (lowerMessage.includes("tired") || lowerMessage.includes("fatigue")) {
    return "Feeling tired can be related to sleep, stress, hydration, nutrition, iron levels, thyroid function, or other causes. If this continues, it would be good to track your symptoms and speak with a healthcare professional.";
  }

  if (lowerMessage.includes("mood")) {
    return "Let’s check in. How would you describe your mood today: calm, stressed, sad, anxious, or energetic? You can also write a few words about what affected your mood.";
  }

  if (lowerMessage.includes("doctor") || lowerMessage.includes("consultation")) {
    return "For your next consultation, you can ask: What do my latest results mean? Are any markers outside the normal range? Do I need lifestyle changes, medication, or follow-up tests?";
  }

  return "I understand. I can help you think through this, but I cannot replace a doctor. Could you tell me when this started, how severe it is, and whether you have any other symptoms?";
}

export const aiChatService = {
  getInitialMessages: async (): Promise<AiChatMessage[]> => {
    await wait(400);

    return aiChatInitialMessagesMock;
  },

  getSuggestedPrompts: async () => {
    await wait(200);

    return aiChatSuggestedPromptsMock;
  },

  sendMessage: async (
    payload: SendAiMessagePayload
  ): Promise<SendAiMessageResponse> => {
    await wait(700);

    const now = new Date().toISOString();

    const userMessage: AiChatMessage = {
      id: createId(),
      role: "user",
      content: payload.message,
      createdAt: now,
    };

    const assistantMessage: AiChatMessage = {
      id: createId(),
      role: "assistant",
      content: createMockAiResponse(payload.message),
      createdAt: new Date().toISOString(),
    };

    return {
      userMessage,
      assistantMessage,
    };
  },
};