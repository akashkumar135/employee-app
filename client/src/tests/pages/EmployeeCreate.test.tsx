import EmployeeCreate from "@pages/employee-create/EmployeeCreate";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCreateEmployeeMutation = vi.fn();
vi.mock("@api-service/employees/employees.api", () => ({
  useCreateEmployeeMutation: () => [
    () => ({
      unwrap: mockCreateEmployeeMutation,
    }),
    { isLoading: false },
  ],
}));

describe("EmployeeCreate component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crash", async () => {
    const { container } = render(<EmployeeCreate />);

    expect(container).toMatchSnapshot();
  });

  it("should create an employee and navigate to details", async () => {
    const mockResponseValue = {
      id: 1,
      name: "Test User",
      email: "testuser@example.com",
      age: 10,
      role: "HR",
      experience: 10,
      joining_date: "2025-05-05",
      alternate_id: "EMP111",
      status: "Active",
      created_at: "2025-05-05",
      updated_at: "2025-05-05",
    };

    const employee = {
      name: "Test User",
      email: "testuser@example.com",
      password: "TestUserPassword",
      age: 10,
      role: "HR",
      experience: 10,
      joining_date: "2025-05-05",
      alternate_id: "EMP111",
      status: "Active",
      address: {
        address: "Test Address",
        city: "Test City",
        country: "Test Country",
        postalCode: "Test Postal Code",
      },
    };

    mockCreateEmployeeMutation.mockResolvedValue(mockResponseValue);

    render(<EmployeeCreate />);

    const nameElement = screen.getByLabelText("Employee Name");
    const idElement = screen.getByLabelText("Employee ID");
    const joiningDateElement = screen.getByLabelText("Joining Date");
    const roleElement = screen.getByLabelText("Role");
    const statusElement = screen.getByLabelText("Status");

    const experienceElement = screen.getByLabelText("Experience");
    const emailElement = screen.getByLabelText("Employee Email");
    const passwordElement = screen.getByLabelText("Passowrd");
    const addressElement = screen.getByPlaceholderText("Address");
    const cityElement = screen.getByPlaceholderText("City");
    const countryElement = screen.getByPlaceholderText("Country");
    const postalCodeElement = screen.getByPlaceholderText("Postal Code");

    await userEvent.type(nameElement, employee.name);
    await userEvent.type(idElement, employee.alternate_id);
    await userEvent.type(joiningDateElement, employee.joining_date);
    await userEvent.selectOptions(roleElement, employee.role);
    await userEvent.selectOptions(statusElement, employee.status);
    await userEvent.type(experienceElement, employee.experience.toString());
    await userEvent.type(emailElement, employee.email);
    await userEvent.type(passwordElement, employee.password);
    await userEvent.type(addressElement, employee.address.address);
    await userEvent.type(cityElement, employee.address.city);
    await userEvent.type(countryElement, employee.address.country);
    await userEvent.type(postalCodeElement, employee.address.postalCode);

    const submitButtonElement = screen.getByRole("button", {
      name: "Create",
    });

    await userEvent.click(submitButtonElement);

    await waitFor(() => {
      expect(mockCreateEmployeeMutation).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(
        `/employee/${mockResponseValue.id}/details`,
      );
    });
  });
});
