import "./styles.css";

type ChatWrapperProps = {
  children: React.ReactNode[];
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

export const ChatWrapper: React.FC<ChatWrapperProps> = ({ children }) => {
  return <div className="chat-wrapper">{children}</div>;
};

export const ChatMessageBody: React.FC<ChatMessageBodyProps> = ({
  children,
}) => {
  return <div className="chat-body">{children}</div>;
};
export const ChatHeader: React.FC<ChatHeaderProps> = ({ label, iconUrl }) => {
  return (
    <div className="chat-header">
      <img src={iconUrl} width={16} height={16} />
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
      {iconUrl && <img src={iconUrl} width={12} height={12} />}
    </div>
  );
};
