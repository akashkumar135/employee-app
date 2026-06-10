export type Employee = {
  employeeName: string;
  employeeId: string;
  joiningDate: string;
  age: number | null;
  employeeEmail: string;
  role: string;
  status: string;
  experience: number;
  action: string;
  password: string;
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
