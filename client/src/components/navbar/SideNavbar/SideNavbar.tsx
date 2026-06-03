import SideNavbarItem from "../SideNavbarItem/SideNavbarItem";
import "./style.css";

import EmployeeListIcon from "../../../assets/navbar-employee-icon.svg";

const SideNavbar = () => {
  return (
    <aside className="navbar-container">
      {/* <div className="navbar-item">
        <div className="navbar-icon-container center">
          <img src="./assets/navbar-employee-icon.svg" width="20" height="20" />
        </div>
        <span>Employee list</span>
      </div> */}
      <SideNavbarItem label="Employee list" iconUrl={EmployeeListIcon} />
    </aside>
  );
};

export default SideNavbar;
