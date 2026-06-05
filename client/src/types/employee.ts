export type Employee = {
  employeeName: string;
  employeeId: string;
  joiningDate: string;
  role: string;
  status: string;
  experience: number;
  action: string;
  address: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
};
