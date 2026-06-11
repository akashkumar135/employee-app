import { describe, expect, it, vi } from "vitest";
import Input from "../../components/Input/Input";
import { render, screen } from "@testing-library/react";

describe("Input component", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <Input
        id="test-input"
        name="test-input"
        label="Test Input"
        type="text"
        placeholder="test"
        className=""
        containerClassName=""
        isRequired={false}
        onChange={vi.fn()}
        value=""
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render an input with the provided id and placeholder", () => {
    render(<Input id="username" placeholder="username" type="text" />);

    const input = screen.getByPlaceholderText("username");

    expect(input).toHaveAttribute("id", "username");
    expect(input).toHaveAttribute("placeholder", "username");
  });
});
