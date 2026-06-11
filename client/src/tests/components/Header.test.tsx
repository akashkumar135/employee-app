import Header from "@components/layout/Header/Header";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Header component", () => {
  it("should render without crashing", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
