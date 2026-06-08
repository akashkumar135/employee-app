import { useNavigate, useParams } from "react-router";

import Button from "../../components/Button/Button";
import SectionHeader from "../../components/layout/Section/SectionHeader";

import "./style.css";
import DisplayField from "../../components/employee/DisplayField/DisplayField";
import DocumentView from "../../components/employee/DocumentView/DocumentView";
import DisplayStatus from "../../components/employee/DisplayStatus/DisplayStatus";
import Employees from "../../datas/employees.json";
import { LuPencil } from "react-icons/lu";

const EmployeeDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const currentEmployee = Employees.find(
    (eachEmp) => eachEmp.employeeId === id,
  );

  const handleEditClick = () => {
    navigate("/employee/create", {
      state: currentEmployee,
    });
  };

  return (
    <section className="employee-details-wrapper">
      <SectionHeader
        label={`Employee Details (${id})`}
        extraOptions={
          <Button
            type="button"
            className="action-button edit-button"
            onClick={handleEditClick}
          >
            <div className="center icon-circle">
              <LuPencil size={20} />
            </div>
            Edit Details
          </Button>
        }
      />
      <div className="details-wrapper">
        <div className="details-fields">
          <DisplayField label="Employee Name">
            {currentEmployee?.employeeName}
          </DisplayField>
          <DisplayField label="Joining Date">
            {currentEmployee?.joiningDate}
          </DisplayField>
          <DisplayField label="Experience">
            {currentEmployee?.experience}
          </DisplayField>
          <DisplayField label="Role">{currentEmployee?.role}</DisplayField>
          <DisplayField label="Status">
            <DisplayStatus status={currentEmployee?.status || ""} />
          </DisplayField>
        </div>
        <div className="details-fields">
          <DisplayField label="Address">
            {currentEmployee?.address.address},{currentEmployee?.address.city},{" "}
            {currentEmployee?.address.country},{" "}
            {currentEmployee?.address.postalCode}
          </DisplayField>

          <DisplayField label="Employee Document">
            <DocumentView label="View Document" />
          </DisplayField>
          <DisplayField label="Employee ID">
            {currentEmployee?.employeeId}
          </DisplayField>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetails;
