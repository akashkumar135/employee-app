import SideNavbar from "../../navbar/SideNavbar/SideNavbar";
import Header from "../Header/Header";

import { ChatTrigger } from "../../Chat/Chat";

import "./style.css";
import { Suspense, useState } from "react";
import { Outlet } from "react-router";
import { CommonPageSkeleton } from "../../pre-loaders/CommonPageSkeleton/CommonPageSkeleton";
import ChatWindow from "@components/ChatWindow/ChatWIndow";

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main>
      <Header />
      <section className="body-container">
        <SideNavbar />
        <div className="rigth-container">
          <Suspense fallback={<CommonPageSkeleton />}>
            <Outlet />
          </Suspense>
        </div>

        <div className="chat-section">
          {isChatOpen && <ChatWindow />}
          <ChatTrigger isOpen={isChatOpen} onChange={setIsChatOpen} />
        </div>
      </section>
    </main>
  );
};

export default Layout;
