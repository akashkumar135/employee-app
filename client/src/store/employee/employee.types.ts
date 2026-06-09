export const EMPLOYEE_ACTION_TYPES = {
  ADD: "employee/ADD",
  UPDATE: "employee/UPDATE",
  DELETE: "employee/DELETE",
} as const;

export type EmployeeAction = {
  type: string;
  payload: any;
};
