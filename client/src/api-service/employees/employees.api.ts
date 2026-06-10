import employeeBaseApi from "../api";
import type { EmployeeListResponse } from "./types";

const employeeApi = employeeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeeListResponse, void>({
      query: () => "employee", // The reason for not defining the url, path , is due to its default nature. Also we cam access params with callback
      providesTags: ["Employees"],
    }),
  }),
});

export const { useGetEmployeesQuery } = employeeApi;
