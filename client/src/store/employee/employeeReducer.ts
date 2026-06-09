import { EMPLOYEE_ACTION_TYPES, type EmployeeAction } from "./employee.types";

import initialEmployees from "../../datas/employees.json";

const initialState = {
  employees: initialEmployees,
};

const reducer = (state = initialState, action: EmployeeAction) => {
  switch (action.type) {
    case EMPLOYEE_ACTION_TYPES.ADD: {
      return { ...state, employees: [...state.employees, action.payload] };
    }
    default:
      return state;
  }
};

export default reducer;
