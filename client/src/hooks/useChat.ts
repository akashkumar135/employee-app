import { streamChatResponse } from "@utils/stream.util";
import { useRef, useState } from "react";

type Message = {
  role: string;
  text: string;
};

export const useChat = (initialValue?: Message) => {

  const [messages, setMessages] = useState<Message[]>(
    initialValue ? [initialValue] : [],
  );
  const [isStreaming, setIsStreaming] = useState(false);

  const chatIdRef = useRef<null | string>(null)

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


    if (!chatIdRef.current) {
      chatIdRef.current = crypto.randomUUID()
    }

    signalRef.current = new AbortController();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
      { role: "assistant", text: "" },
    ]);

    try {
      setIsStreaming(true);
      await streamChatResponse(chatIdRef.current, message, onStreamData, signalRef.current.signal);
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
