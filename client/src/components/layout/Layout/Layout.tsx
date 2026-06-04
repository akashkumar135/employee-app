import SideNavbar from "../../navbar/SideNavbar/SideNavbar";
import Header from "../Header/Header";
import "./style.css";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <Header />
      <section className="body-container">
        <SideNavbar />
        <div className="rigth-container">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
