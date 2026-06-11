import {
  ChatHeader,
  ChatInputBox,
  ChatMessageBody,
  ChatMessageBox,
  ChatWrapper,
} from "../components/Chat/Chat";

import Icon from "../assets/message-icon.svg";
import MessageIcon from "../assets/send-icon.svg";

const ChatExample = () => {
  return (
    <ChatWrapper>
      <ChatHeader label="Help Desk" iconUrl={Icon} />
      <ChatMessageBody>
        <ChatMessageBox isSend={true}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, iusto
          aliquid quibusdam dolorem nemo veritatis debitis molestias mollitia
          sint ex distinctio quae quidem incidunt modi hic totam nostrum
          voluptates architecto.
        </ChatMessageBox>
        <ChatMessageBox isSend={true}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, iusto
          aliquid quibusdam dolorem nemo veritatis debitis molestias mollitia
          sint ex distinctio quae quidem incidunt modi hic totam nostrum
          voluptates architecto.
        </ChatMessageBox>
        <ChatMessageBox isSend={false}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, iusto
          aliquid quibusdam dolorem nemo veritatis debitis molestias mollitia
          sint ex distinctio quae quidem incidunt modi hic totam nostrum
          voluptates architecto.
        </ChatMessageBox>
        <ChatMessageBox isSend={true}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, iusto
          aliquid quibusdam dolorem nemo veritatis debitis molestias mollitia
          sint ex distinctio quae quidem incidunt modi hic totam nostrum
          voluptates architecto.
        </ChatMessageBox>
      </ChatMessageBody>
      <ChatInputBox placeholder="Type your question" iconUrl={MessageIcon} />
    </ChatWrapper>
  );
};

export default ChatExample;
