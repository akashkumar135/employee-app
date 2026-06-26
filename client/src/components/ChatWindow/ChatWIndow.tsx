import {
  ChatWrapper,
  ChatHeader,
  ChatInputBox,
  ChatMessageBody,
  ChatMessageBox,
  ChatBotTyping,
} from "@components/Chat/Chat";

import Icon from "@assets/message-icon.svg";
import MessageIcon from "@assets/send-icon.svg";
import { useState } from "react";
import { useChat } from "@hooks/useChat";

const initialValue = { role: "assistant", text: "Hi, What can I do for you ?" };

const ChatWindow = () => {
  const { messages, sendMessage, isStreaming } = useChat(initialValue);
  const [prompt, setPrompt] = useState("");

  const handlePromptChange = (value: string) => {
    setPrompt(value);
  };

  const handleSendPrompt = async () => {
    sendMessage(prompt);
    setPrompt("");
  };

  const handleFileUpload = (file: File) => {
    console.log(file);
  };

  return (
    <ChatWrapper>
      <ChatHeader label="Help Desk" iconUrl={Icon} />
      <ChatMessageBody>
        {messages.map((eachMessage) => (
          <ChatMessageBox isSend={eachMessage.role == "user"}>
            {eachMessage.text}
          </ChatMessageBox>
        ))}
        {isStreaming && <ChatBotTyping />}
      </ChatMessageBody>
      <ChatInputBox
        placeholder="Type your question"
        iconUrl={MessageIcon}
        onChange={handlePromptChange}
        onFileUpload={handleFileUpload}
        onSubmit={handleSendPrompt}
        value={prompt}
        loading={isStreaming}
      />
    </ChatWrapper>
  );
};

export default ChatWindow;
