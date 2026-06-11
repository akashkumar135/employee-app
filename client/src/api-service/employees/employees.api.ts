import employeeBaseApi from "../api";
import {
  type EmployeeWithAddressAndDepartmentApiResponse,
  type EmployeeListResponse,
  type EmployeeApiResponse,
  type CreateEmployeePayload,
  type UpdateEmployeePayload,
  type AddressApiResponse,
  type UpdateAddressPayload,
  type CreateAddressApiPayload,
  type SearchEmployeeQueryParams,
} from "./types";

const employeeApi = employeeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<
      EmployeeListResponse,
      SearchEmployeeQueryParams
    >({
      query: (queryParams) => ({
        url: "/employee/search",
        method: "GET",
        params: queryParams,
      }), // The reason for not defining the url, path , is due to its default nature. Also we cam access params with callback
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
    updateEmployee: builder.mutation<
      EmployeeApiResponse,
      UpdateEmployeePayload
    >({
      query: ({ id, payload }) => ({
        url: `/employee/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
    createAddress: builder.mutation<
      AddressApiResponse,
      CreateAddressApiPayload
    >({
      query: ({ employeeId, payload }) => ({
        url: `/employee/${employeeId}/addresses`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateAddressById: builder.mutation<
      AddressApiResponse,
      UpdateAddressPayload
    >({
      query: ({ employeeId, addressId, payload }) => ({
        url: `/employee/${employeeId}/addresses/${addressId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useCreateAddressMutation,
  useUpdateAddressByIdMutation,
} = employeeApi;
