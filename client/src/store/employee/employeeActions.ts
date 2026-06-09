import type { Employee } from "../../types/employee";
import { EMPLOYEE_ACTION_TYPES } from "./employee.types";

export const addEmployeeActionCreator = (employee: Employee) => {
  return { type: EMPLOYEE_ACTION_TYPES.ADD, payload: employee };
};
