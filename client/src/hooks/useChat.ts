import { streamChatResponse } from "@utils/stream.util";
import { useRef, useState } from "react";

type Message = {
  role: string;
  text: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const signalRef = useRef<AbortController | null>(null);

  const onStreamData = (text: string, type?: string) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[prev.length - 1] = {
        role: prev[prev.length - 1].role,
        text: text,
      };

      return newMessages;
    });
  };

  const sendMessage = async (message: string) => {
    if (signalRef.current) signalRef.current.abort();

    signalRef.current = new AbortController();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
      { role: "assistant", text: "" },
    ]);

    try {
      setIsStreaming(true);
      await streamChatResponse(message, onStreamData, signalRef.current.signal);
    } catch (err) {
    } finally {
      setIsStreaming(false);
    }
  };

  return {
    isStreaming,
    messages,
    sendMessage,
  };
};
