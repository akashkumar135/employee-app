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
import { useState, type ChangeEvent } from "react";
import { useChat } from "@hooks/useChat";

const ChatWindow = () => {
  const { messages, sendMessage, isStreaming } = useChat();
  const [prompt, setPrompt] = useState("");

  const handlePromptChange = (value: string) => {
    setPrompt(value);
  };

  const handleSendPrompt = async () => {
    sendMessage(prompt);
    setPrompt("");
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
        onSubmit={handleSendPrompt}
        value={prompt}
        loading={isStreaming}
      />
    </ChatWrapper>
  );
};

export default ChatWindow;
