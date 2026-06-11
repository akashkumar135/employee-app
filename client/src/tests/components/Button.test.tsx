import Button from "@components/Button/Button";
import { render } from "@testing-library/react";
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
});
