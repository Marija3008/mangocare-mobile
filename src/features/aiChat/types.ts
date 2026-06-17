export type ChatMessageRole = "user" | "assistant" | "system";

export interface AiChatMessage {
  id: string;
  role: ChatMessageRole;
  content: string;
  createdAt: string;
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  message: string;
}

export interface SendAiMessagePayload {
  message: string;
}

export interface SendAiMessageResponse {
  userMessage: AiChatMessage;
  assistantMessage: AiChatMessage;
}