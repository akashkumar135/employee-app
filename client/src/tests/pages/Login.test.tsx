import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Login from "@pages/login/Login";

// Mock react-router's useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the login mutation
const mockLoginMutation = vi.fn();
vi.mock("../../api-service/auth/login.api", () => ({
  useLoginMutation: () => [() => mockLoginMutation(), { isLoading: false }],
}));

describe("Login page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should match snapshot", () => {
    const { container } = render(<Login />);

    expect(container).toMatchSnapshot();
  });

  it("should show validation error for email and password", async () => {
    render(<Login />);

    const usernameField = screen.getByPlaceholderText("Username");
    const passwordField = screen.getByPlaceholderText("Password");

    await userEvent.type(usernameField, "a".repeat(10));
    await userEvent.type(passwordField, "a".repeat(4));

    const errors = screen.getAllByRole("error");

    expect(errors).toHaveLength(2);
    expect(errors[0]).toHaveTextContent("Must contain @");
    expect(errors[1]).toHaveTextContent(
      "Must be greater than or equal 8 characters",
    );
  });

  it("should navigate to /employee for successful login", async () => {
    mockLoginMutation.mockResolvedValue({
      data: {
        access_token: "test_access_token",
        refresh_token: "test_refresh_token",
      },
    });
    render(<Login />);

    const usernameField = screen.getByPlaceholderText("Username");
    const passwordField = screen.getByPlaceholderText("Password");

    await userEvent.type(usernameField, "testuser1@example.com");
    await userEvent.type(passwordField, "testpassword");

    const submitButton = screen.getByRole("button", { name: "Login" });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginMutation).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/employee");
    });
  });

  it("should handle failed login", async () => {
    mockLoginMutation.mockResolvedValue({
      data: null,
    });

    render(<Login />);

    const usernameField = screen.getByPlaceholderText("Username");
    const passwordField = screen.getByPlaceholderText("Password");

    await userEvent.type(usernameField, "testuser1@example.com");
    await userEvent.type(passwordField, "testpassword");

    const submitButton = screen.getByRole("button", { name: "Login" });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginMutation).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
