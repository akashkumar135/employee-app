import DisplayStatus from "@components/employee/DisplayStatus/DisplayStatus";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("DisplayStatus component", () => {
  it("should render without crashing", () => {
    const { container } = render(<DisplayStatus status="probation" />);

    expect(container).toMatchSnapshot();
  });
});
