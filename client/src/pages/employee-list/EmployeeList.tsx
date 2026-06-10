import { useNavigate, useSearchParams } from "react-router";

import Button from "../../components/Button/Button";
import SectionHeader from "../../components/layout/Section/SectionHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table/Table";

import DeleteIcon from "../../assets/delete-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";

import StatusSelector from "../../components/employee/search-filters/StatusSelect";
import PlusIcon from "../../assets/plus-icon.svg";

import "./style.css";
import DisplayStatus from "../../components/employee/DisplayStatus/DisplayStatus";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../../components/Dialog/Dialog";
import { useDialog } from "../../hooks/useDialog";
import { useAppSelector } from "../../store/store";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../../api-service/employees/employees.api";
import type { BaseEmployeeApiResponse } from "../../api-service/employees/types";

const StatusOptions = [
  { label: "Status", value: "" },
  { label: "Active", value: "active" },
];
const EmployeeList = () => {
  const {
    showDialog,
    hideDialog,
    isOpen,
    containerRef: confirmDialogContaierRef,
    payload: deleteEmployeeId,
  } = useDialog<string>();

  const navigate = useNavigate();

  const { data = [], isLoading, error } = useGetEmployeesQuery();
  const [deleteEmployee, { isLoading: isDeleteLoading }] =
    useDeleteEmployeeMutation();

  const employees = useAppSelector((state) => state.employee.employees);

  const handleEmployeeCreteClick = () => {
    navigate("/employee/create");
  };

  const handleRowClick = (id: number) => {
    navigate(`/employee/${id}/details`);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    employee: BaseEmployeeApiResponse,
  ) => {
    event.stopPropagation();
    navigate("/employee/create", {
      state: employee,
    });
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    employee: BaseEmployeeApiResponse,
  ) => {
    event.stopPropagation();
    showDialog(String(employee.id));
  };

  const handleDeleteConfirm = () => {
    if (!deleteEmployeeId) return;

    deleteEmployee(deleteEmployeeId)
      .unwrap()
      .then(() => {
        alert("Employee deleted");
        hideDialog();
      });
  };

  console.log(data[0], isLoading, error);
  return (
    <section className="employee-list-wrapper">
      <SectionHeader
        label="Employee List"
        extraOptions={
          <div className="filter-options">
            <span>Filter by</span>
            <StatusSelector selected="status" options={StatusOptions} />
            <Button
              className=" action-button create-button"
              onClick={handleEmployeeCreteClick}
            >
              <div className="center icon-circle">
                <img src={PlusIcon} width={20} height={20} />
              </div>
              Create Employee
            </Button>
          </div>
        }
      />

      <Table>
        <TableHeader>
          <TableHead>Employee Name</TableHead>
          <TableHead>Employee Id</TableHead>
          <TableHead>Joining Date</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Action</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((eachEmp) => (
            <TableRow onClick={() => handleRowClick(eachEmp.id)}>
              <TableCell>{eachEmp.name}</TableCell>
              <TableCell>{eachEmp.id}</TableCell>
              <TableCell>12-12-2020</TableCell>
              <TableCell>{eachEmp.role}</TableCell>
              <TableCell>
                <DisplayStatus status="probation" />
              </TableCell>
              <TableCell>5</TableCell>
              <TableCell>
                <div className="action-group">
                  <Button
                    type="button"
                    className="action-button icon-button"
                    onClick={(event) => handleDeleteClick(event, eachEmp)}
                  >
                    <img src={DeleteIcon} width={20} height={20} />
                  </Button>
                  <Button
                    type="button"
                    className="action-button icon-button"
                    onClick={(event) => handleEditClick(event, eachEmp)}
                  >
                    <img src={EditIcon} width={20} height={20} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isOpen && (
        <Dialog>
          <DialogBody ref={confirmDialogContaierRef}>
            <DialogContent>
              <DialogTitle>Are you sure ?</DialogTitle>
              Do you really want to delete employee?
            </DialogContent>
            <DialogFooter>
              <Button
                className="action-button cancel-button center"
                onClick={hideDialog}
              >
                Cancel
              </Button>
              <Button
                className="action-button confirm-button center"
                onClick={handleDeleteConfirm}
                disabled={isDeleteLoading}
              >
                {isDeleteLoading ? "Deleting" : "Confirm"}
              </Button>
            </DialogFooter>
          </DialogBody>
        </Dialog>
      )}
    </section>
  );
};

export default EmployeeList;
