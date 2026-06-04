import SideNavbar from "../../navbar/SideNavbar/SideNavbar";
import Header from "../Header/Header";

import {
  ChatHeader,
  ChatInputBox,
  ChatMessageBody,
  ChatMessageBox,
  ChatTrigger,
  ChatWrapper,
} from "../../../components/chat/Chat";

import Icon from "../../../assets/message-icon.svg";
import MessageIcon from "../../../assets/send-icon.svg";

import "./style.css";
import { useState } from "react";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main>
      <Header />
      <section className="body-container">
        <SideNavbar />
        <div className="rigth-container">{children}</div>

        <div className="chat-section">
          {isChatOpen && (
            <ChatWrapper>
              <ChatHeader label="Help Desk" iconUrl={Icon} />
              <ChatMessageBody>
                <ChatMessageBox isSend={true}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                  iusto aliquid quibusdam dolorem nemo veritatis debitis
                  molestias mollitia sint ex distinctio quae quidem incidunt
                  modi hic totam nostrum voluptates architecto.
                </ChatMessageBox>
                <ChatMessageBox isSend={true}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                  iusto aliquid quibusdam dolorem nemo veritatis debitis
                  molestias mollitia sint ex distinctio quae quidem incidunt
                  modi hic totam nostrum voluptates architecto.
                </ChatMessageBox>
                <ChatMessageBox isSend={false}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                  iusto aliquid quibusdam dolorem nemo veritatis debitis
                  molestias mollitia sint ex distinctio quae quidem incidunt
                  modi hic totam nostrum voluptates architecto.
                </ChatMessageBox>
                <ChatMessageBox isSend={true}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                  iusto aliquid quibusdam dolorem nemo veritatis debitis
                  molestias mollitia sint ex distinctio quae quidem incidunt
                  modi hic totam nostrum voluptates architecto.
                </ChatMessageBox>
              </ChatMessageBody>
              <ChatInputBox
                placeholder="Type your question"
                iconUrl={MessageIcon}
              />
            </ChatWrapper>
          )}
          <ChatTrigger isOpen={isChatOpen} onChange={setIsChatOpen} />
        </div>
      </section>
    </main>
  );
};

export default Layout;
