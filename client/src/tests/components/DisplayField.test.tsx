import DisplayField from "@components/employee/DisplayField/DisplayField";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("DisplayField component", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <DisplayField label="Test Label">Test</DisplayField>,
    );

    expect(container).toMatchSnapshot();
  });
});
