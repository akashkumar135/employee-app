import Button from "../Button/Button";

import ChatIcon from "../../assets/message-icon.svg";
import "./styles.css";

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

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  placeholder,
  iconUrl,
}) => {
  return (
    <div className="chat-input-wrapper">
      <input type="text" placeholder={placeholder} />
      {iconUrl && <img src={iconUrl} width={20} height={20} />}
    </div>
  );
};
