import { useEffect, useState, useCallback } from "react";

import { aiChatService } from "@/features/aiChat/services/aiChatService";
import { AiChatMessage, SuggestedPrompt } from "@/features/aiChat/types";

export function useAiChat() {
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [suggestedPrompts, setSuggestedPrompts] = useState<SuggestedPrompt[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [initialMessages, prompts] = await Promise.all([
        aiChatService.getInitialMessages(),
        aiChatService.getSuggestedPrompts(),
      ]);

      setMessages(initialMessages);
      setSuggestedPrompts(prompts);
    } catch {
      setError("We could not load the AI chat right now.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = useCallback(async (message: string) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || sending) return;

    setSending(true);
    setError(null);

    try {
      const response = await aiChatService.sendMessage({
        message: trimmedMessage,
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        response.userMessage,
        response.assistantMessage,
      ]);
    } catch {
      setError("Message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }, [sending]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  return {
    messages,
    suggestedPrompts,
    loading,
    sending,
    error,
    sendMessage,
    retry: fetchInitialData,
  };
}