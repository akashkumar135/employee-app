import DocumentView from "@components/employee/DocumentView/DocumentView";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("DocumentView component", () => {
  it("should render without crashing", () => {
    const { container } = render(<DocumentView label="Test" />);

    expect(container).toMatchSnapshot();
  });
});
