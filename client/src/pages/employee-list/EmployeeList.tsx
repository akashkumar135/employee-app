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

const EmployeeList = () => {
  return (
    <section className="employee-list-wrapper">
      <SectionHeader
        label="Employee List"
        extraOptions={
          <div className="filter-options">
            <span className="">Filter by</span>
            <StatusSelector
              selected="status"
              options={[{ label: "status", value: "status" }]}
            />

            <Button className=" action-button create-button">
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
          <TableRow>
            <TableCell>Data1</TableCell>
            <TableCell>Data1</TableCell>
            <TableCell>Data1</TableCell>
            <TableCell>Data1</TableCell>
            <TableCell>
              <DisplayStatus status="probation" />
            </TableCell>
            <TableCell>Data1</TableCell>
            <TableCell>
              <div className="action-group">
                <Button type="button" className="action-button icon-button">
                  <img src={DeleteIcon} width={20} height={20} />
                </Button>
                <Button type="button" className="action-button icon-button">
                  <img src={EditIcon} width={20} height={20} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data1</TableCell>
            <TableCell>Data1</TableCell>
            <TableCell>Data1</TableCell>
            <TableCell>Data1</TableCell>
            <TableCell>
              <DisplayStatus status="probation" />
            </TableCell>
            <TableCell>Data1</TableCell>
            <TableCell>
              <div className="action-group">
                <Button type="button" className="action-button icon-button">
                  <img src={DeleteIcon} width={20} height={20} />
                </Button>
                <Button type="button" className="action-button icon-button">
                  <img src={EditIcon} width={20} height={20} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default EmployeeList;
