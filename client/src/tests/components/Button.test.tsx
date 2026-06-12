import Button from "@components/Button/Button";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("Button component", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <Button type="button" className="" disabled={false} onClick={vi.fn()}>
        Test
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });

  it("should disable the button", () => {
    render(
      <Button type="button" disabled={true} onClick={vi.fn()}>
        Test
      </Button>,
    );

    const buttonElement = screen.getByRole("button", { name: "Test" });

    expect(buttonElement).toBeDisabled();
  });

  it("should trigger onClick event", async () => {
    const mockOnClick = vi.fn();

    render(
      <Button type="button" onClick={mockOnClick}>
        Test
      </Button>,
    );

    const buttonElement = screen.getByRole("button", {
      name: "Test",
    });

    await userEvent.type(buttonElement, "Hello");

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalled();
    });
  });
});
