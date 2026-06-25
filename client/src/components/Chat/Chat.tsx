import Button from "../Button/Button";

import ChatIcon from "../../assets/message-icon.svg";
import "./styles.css";
import { LuBot } from "react-icons/lu";
import type { ChangeEvent } from "react";
import { FiUpload } from "react-icons/fi";

type ChatWrapperProps = {
  children: React.ReactNode[];
  className?: string;
};

type ChatHeaderProps = {
  iconUrl: string;
  label: string;
};

type ChatMessageBoxProps = {
  isSend: boolean;
  children: React.ReactNode;
};

type ChatInputBoxProps = {
  placeholder: string;
  iconUrl: string;
  onSubmit?: () => void;
  onChange?: (value: string) => void;
  onFileUpload: (file: File) => void;
  value?: string;
  loading?: boolean;
};

type ChatMessageBodyProps = {
  children: React.ReactNode[];
};
type ChatTriggerProps = {
  isOpen: boolean;
  onChange: (value: boolean) => void;
};
export const ChatTrigger: React.FC<ChatTriggerProps> = ({
  isOpen,
  onChange,
}) => {
  const handleTrigger = () => {
    onChange(!isOpen);
  };

  return (
    // <div className="chat-trigger">
    <Button
      type="button"
      className="chat-trigger center"
      onClick={handleTrigger}
    >
      <div className="center icon-circle">
        <img src={ChatIcon} width={28} height={28} />
      </div>
    </Button>
    // </div>
  );
};
export const ChatWrapper: React.FC<ChatWrapperProps> = ({
  children,
  className,
}) => {
  return <div className={`chat-wrapper ${className}`}>{children}</div>;
};

export const ChatMessageBody: React.FC<ChatMessageBodyProps> = ({
  children,
}) => {
  return <div className="chat-body">{children}</div>;
};
export const ChatHeader: React.FC<ChatHeaderProps> = ({ label, iconUrl }) => {
  return (
    <div className="chat-header">
      <img src={iconUrl} width={24} height={24} />
      <span>{label}</span>
    </div>
  );
};

export const ChatMessageBox: React.FC<ChatMessageBoxProps> = ({
  children,
  isSend = true,
}) => {
  return (
    <div
      className={`chat-message-box ${isSend ? "chat-message-send" : "chat-message-receive"}`}
    >
      {children}
    </div>
  );
};

export const ChatBotTyping = () => {
  return (
    <div className="chat-bottyping">
      <LuBot size={24} className="chat-boticon" />
      <span>Typing...</span>
    </div>
  );
};

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  placeholder,
  iconUrl,
  onSubmit,
  onChange,
  onFileUpload,
  value,
  loading = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter" && onSubmit) {
      onSubmit();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    onFileUpload(file);

    event.target.value = "";
  };

  return (
    <div className="chat-input-wrapper">
      <label
        htmlFor="chat-file-input"
        className="action-button icon-button"
        onClick={() => {}}
      >
        <FiUpload size={16} />
      </label>
      <input
        id="chat-file-input"
        type="file"
        className="visually-hidden"
        onChange={handleFileChange}
      />
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      {iconUrl && (
        <Button
          className="action-button icon-button"
          onClick={onSubmit}
          disabled={loading}
        >
          <img src={iconUrl} width={20} height={20} />
        </Button>
      )}
    </div>
  );
};
