import SideNavbar from "../../navbar/SideNavbar/SideNavbar";
import Header from "../Header/Header";
import "./style.css";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <Header />
      <section className="body-container">
        <SideNavbar />
        {children}
      </section>
    </main>
  );
};

export default Layout;
