export type BaseEmployeeApiResponse = {
  id: number;
  name: string;
  email: string;
  age: number | null;
  role: string;
};

export type EmployeeApiResponse = BaseEmployeeApiResponse & {
  created_at: string;
  updated_at: string;
};

export type EmployeeListResponse = BaseEmployeeApiResponse[];
