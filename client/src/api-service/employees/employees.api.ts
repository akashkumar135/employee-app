import employeeBaseApi from "../api";
import {
  type EmployeeWithAddressAndDepartmentApiResponse,
  type EmployeeListResponse,
  type EmployeeApiResponse,
  type CreateEmployeePayload,
} from "./types";

const employeeApi = employeeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeeListResponse, void>({
      query: () => "employee", // The reason for not defining the url, path , is due to its default nature. Also we cam access params with callback
      providesTags: ["Employees"],
    }),
    getEmployee: builder.query<
      EmployeeWithAddressAndDepartmentApiResponse,
      string
    >({
      query: (id) => `employee/${id}`,
      providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation<
      EmployeeApiResponse,
      CreateEmployeePayload
    >({
      query: (payload) => ({
        url: "/employee",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
} = employeeApi;
