import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ErrorMessage component", () => {
  it("should render without crashing", () => {
    const { container } = render(<ErrorMessage message="Test Error Message" />);

    expect(container).toMatchSnapshot();
  });
});
