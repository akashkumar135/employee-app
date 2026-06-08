import SideNavbarItem from "../SideNavbarItem/SideNavbarItem";
import "./style.css";

import EmployeeListIcon from "../../../assets/navbar-employee-icon.svg";

const SideNavbar = () => {
  return (
    <aside className="navbar-container">
      <SideNavbarItem
        url="/employee"
        label="Employee list"
        iconUrl={EmployeeListIcon}
      />
    </aside>
  );
};

export default SideNavbar;
