import SectionHeader from "@components/layout/SectionHeader/SectionHeader";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("SectionHeader component", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <SectionHeader
        label="Test Header"
        extraOptions={<p>Test extra options</p>}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
