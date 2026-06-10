import { useNavigate, useParams } from "react-router";

import Button from "../../components/Button/Button";
import SectionHeader from "../../components/layout/Section/SectionHeader";

import "./style.css";
import DisplayField from "../../components/employee/DisplayField/DisplayField";
import DocumentView from "../../components/employee/DocumentView/DocumentView";
import DisplayStatus from "../../components/employee/DisplayStatus/DisplayStatus";
import { LuPencil } from "react-icons/lu";
import { useAppSelector } from "../../store/store";
import { useGetEmployeeQuery } from "../../api-service/employees/employees.api";

const EmployeeDetails = () => {
  const { id } = useParams();

  const {
    data: currentEmployee,
    isLoading,
    error,
  } = useGetEmployeeQuery(id as string);
  // const currentEmployee = useAppSelector((state) =>
  //   state.employee.employees.find((eachEmp) => eachEmp.employeeId === id),
  // );

  const navigate = useNavigate();

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
            {currentEmployee?.name}
          </DisplayField>
          <DisplayField label="Joining Date">12-12-2004</DisplayField>
          <DisplayField label="Experience">5</DisplayField>
          <DisplayField label="Role">{currentEmployee?.role}</DisplayField>
          <DisplayField label="Status">
            <DisplayStatus status="probation" />
          </DisplayField>
        </div>
        <div className="details-fields">
          <DisplayField label="Address">
            {currentEmployee?.addresses[0] ? (
              <>
                {currentEmployee?.addresses[0]?.line1},
                {currentEmployee?.addresses[0]?.city},{" "}
                {currentEmployee?.addresses[0]?.country},{" "}
                {currentEmployee?.addresses[0]?.postal_code}
              </>
            ) : (
              "No address available"
            )}
          </DisplayField>

          <DisplayField label="Employee Document">
            <DocumentView label="View Document" />
          </DisplayField>
          <DisplayField label="Employee ID">{currentEmployee?.id}</DisplayField>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetails;
