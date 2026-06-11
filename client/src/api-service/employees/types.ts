import { type BaseApiResponse } from "../type";

export type BaseEmployeeApiResponse = {
  id: number;
  name: string;
  email: string;
  age: number | null;
  role: string;
  experience: number;
  joining_date: string | null;
  alternate_id: string;
  status: string;
};

export type EmployeeApiResponse = BaseEmployeeApiResponse & {
  created_at: string;
  updated_at: string;
};

export type EmployeeListResponse = BaseEmployeeApiResponse[];
export type SearchEmployeeQueryParams = {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
};

type BaseDepartmentApiResponse = BaseApiResponse & {
  name: string;
};

export type EmployeeWithAddressAndDepartmentApiResponse =
  EmployeeApiResponse & {
    addresses: AddressApiResponse[];
    departments: BaseDepartmentApiResponse[];
  };

export type GetEmployeeQuery = {
  id: number;
};

export type CreateAddressPayload = {
  line1: string;
  city: string;
  country: string;
  postal_code: string;
};

export type AddressApiResponse = BaseApiResponse & {
  city: string;
  line1: string;
  postal_code: string;
  country: string;
};

export type CreateEmployeePayload = {
  name: string;
  email: string;
  age: number | null;
  role: string;
  password: string;
  address: CreateAddressPayload | null;
  experience: number;
  status: string;
  joining_date: Date;
  alternate_id: string;
};

export type UpdateEmployeePayload = {
  id: string;
  payload: {
    name?: string;
    email?: string;
    age?: number | null;
    role?: string;
    experience?: number;
    status?: string;
    joining_date?: Date;
    alternate_id?: string;
  };
};

export type UpdateAddressPayload = {
  employeeId: string;
  addressId: string;
  payload: {
    city?: string;
    line1?: string;
    postal_code?: string;
    country?: string;
  };
};

export type CreateAddressApiPayload = {
  employeeId: string;
  payload: CreateAddressPayload;
};
