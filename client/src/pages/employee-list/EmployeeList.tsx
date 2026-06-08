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

import Employees from "../../datas/employees.json";
import type { Employee } from "../../types/employee";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../../components/Dialog/Dialog";
import { useDialog } from "../../hooks/useDialog";
import { useRef } from "react";

const StatusOptions = [
  { label: "Status", value: "" },
  { label: "Active", value: "active" },
];
const EmployeeList = () => {
  const confirmDialogContaierRef = useRef<HTMLDivElement | null>(null);
  const confirmDialogTargetRef = useRef<HTMLDivElement | null>(null);

  const { showDialog, hideDialog, isOpen } = useDialog(
    confirmDialogContaierRef,
    confirmDialogTargetRef,
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleEmployeeCreteClick = () => {
    navigate("/employee/create");
  };

  const handleRowClick = (id: string) => {
    navigate(`/employee/${id}/details`);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    employee: Employee,
  ) => {
    event.stopPropagation();
    navigate("/employee/create", {
      state: employee,
    });
  };

  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    employee: Employee,
  ) => {
    event.stopPropagation();
    showDialog();
  };

  console.log(searchParams.get("name"), searchParams.get("role"));

  return (
    <section className="employee-list-wrapper">
      {isOpen && (
        <Dialog>
          <DialogBody>
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
                onClick={hideDialog}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogBody>
        </Dialog>
      )}
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
          {Employees.map((eachEmp) => (
            <TableRow onClick={() => handleRowClick(eachEmp.employeeId)}>
              <TableCell>{eachEmp.employeeName}</TableCell>
              <TableCell>{eachEmp.employeeId}</TableCell>
              <TableCell>{eachEmp.joiningDate}</TableCell>
              <TableCell>{eachEmp.role}</TableCell>
              <TableCell>
                <DisplayStatus status={eachEmp.status} />
              </TableCell>
              <TableCell>{eachEmp.experience}</TableCell>
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
    </section>
  );
};

export default EmployeeList;
