import FileInput from "@components/FileInput/FileInput";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("FileInput component", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <FileInput
        label="Test"
        actionLabel="Test File"
        id="testfile"
        fileName="test.pdf"
        name="testfile"
        onClick={vi.fn()}
        onRemoveClick={vi.fn()}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
