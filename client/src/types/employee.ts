export type Employee = {
  employeeName: string;
  employeeId: string;
  joiningDate: string;
  age: number | null;
  employeeEmail: string;
  role: string;
  status: string;
  experience: number;
  password: string;
  address: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  idProof: File | null;
};

export type UpdateEmployeeForm = {
  employeeName: string;
  employeeId: string;
  joiningDate: string;
  age: number | null;
  employeeEmail: string;
  role: string;
  status: string;
  experience: number;
  address: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  idProof: File | null;
};
export type EmployeeState = {
  employees: Employee[];
};
