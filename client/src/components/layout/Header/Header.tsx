import "./style.css";
import Icon from "../../../assets/icon.png";

const Header = () => {
  return (
    <header className="header-container">
      <img src={Icon} className="header-icon" />
    </header>
  );
};

export default Header;
