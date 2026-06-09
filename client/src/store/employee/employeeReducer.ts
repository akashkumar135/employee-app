import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Employee, EmployeeState } from "../../types/employee";

import DummyEmployees from "../../datas/employees.json";

const initialState: EmployeeState = {
  employees: DummyEmployees as Employee[],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
