import SideNavbarItem from "@components/navbar/SideNavbarItem/SideNavbarItem";
import { render } from "@testing-library/react";
import EmployeeIcon from "../assets/navbar-employee-icon.svg";

import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";

describe("SideNavbarItem component", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <MemoryRouter>
        <SideNavbarItem
          label="Test Item"
          url="/test-url"
          iconSize={20}
          iconUrl={EmployeeIcon}
        />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
