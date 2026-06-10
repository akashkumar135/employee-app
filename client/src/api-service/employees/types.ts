import { type BaseApiResponse } from "../type";

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

type AddressApiResponse = BaseApiResponse & {
  city: string;
  line1: string;
  postal_code: string;
  country: string;
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

export type CreateEmployeePayload = {
  name: string;
  email: string;
  age: number | null;
  role: string;
  password: string;
  address: CreateAddressPayload | null;
};
