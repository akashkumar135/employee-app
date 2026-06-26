import { streamChatResponse } from "@utils/stream.util";
import { useEffect, useRef, useState } from "react";

type Message = {
  role: string;
  text: string;
};

export const useChat = (initialValue?: Message) => {

  const [messages, setMessages] = useState<Message[]>(
    initialValue ? [initialValue] : [],
  );
  const [isStreaming, setIsStreaming] = useState(false);

  const chatIdRef = useRef<string>("")

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
      await streamChatResponse(chatIdRef.current, message, onStreamData, signalRef.current.signal);
    } catch (err) {
    } finally {
      setIsStreaming(false);
    }
  };


  const uploadDoc = async (file: File) => {
     try {

          const formData = new FormData()

          formData.set("file", file)

          await fetch(import.meta.env.VITE_BACKEND_BASE_URL + `/chat/${chatIdRef.current}/upload`, {
            method: "POST",
            body: formData
          })

        } catch (err) {
            console.log(err)
        }
  }


  useEffect( () => {
    if (!chatIdRef.current) {
      chatIdRef.current = crypto.randomUUID()
    }
  }, [])

  return {
    isStreaming,
    messages,
    sendMessage,
    uploadDoc,
  };
};
