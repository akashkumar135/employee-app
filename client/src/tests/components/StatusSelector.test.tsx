import StatusSelector from "@components/employee/StatusSelector/StatusSelector";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("StatusSelector component", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <StatusSelector
        name="Test Options"
        selected=""
        options={[{ label: "Test", value: "Test" }]}
        onChange={vi.fn()}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should select given value", async () => {
    render(
      <StatusSelector
        name="Test Options"
        selected="Test"
        options={[
          { label: "Select a option", value: "" },
          { label: "Test Label", value: "Test" },
        ]}
        onChange={vi.fn()}
      />,
    );

    const statusElement = screen.getByRole("combobox");

    expect(statusElement).toHaveDisplayValue("Test Label");
    expect(statusElement).toHaveValue("Test");
  });
});
