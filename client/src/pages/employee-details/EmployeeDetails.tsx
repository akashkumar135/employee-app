import Button from "../../components/Button/Button";
import SectionHeader from "../../components/layout/Section/SectionHeader";

import EditIcon from "../../assets/edit-icon.svg";

import "./style.css";
import DisplayField from "../../components/employee/DisplayField/DisplayField";
import DocumentView from "../../components/employee/DocumentView/DocumentView";
import DisplayStatus from "../../components/employee/DisplayStatus/DisplayStatus";

const EmployeeDetails = () => {
  return (
    <section className="employee-details-wrapper">
      <SectionHeader
        label="Employee Details"
        extraOptions={
          <Button type="button" className="action-button edit-button">
            <div className="center icon-circle">
              <img src={EditIcon} width={20} height={20} />
            </div>
            Edit Details
          </Button>
        }
      />
      <div className="details-wrapper">
        <div className="details-fields">
          <DisplayField label="Employee Name">Data 1</DisplayField>
          <DisplayField label="Joining Date">Data 1</DisplayField>
          <DisplayField label="Experience">Data 1</DisplayField>
          <DisplayField label="Role">Data 1</DisplayField>
          <DisplayField label="Status">
            <DisplayStatus status="Probation" />
          </DisplayField>
          <DisplayField label="Experience">Data 1</DisplayField>
        </div>
        <div className="details-fields">
          <DisplayField label="Address">Data 1</DisplayField>

          <DisplayField label="Employee Document">
            <DocumentView label="View Document" />
          </DisplayField>
          <DisplayField label="Employee ID">Data 1</DisplayField>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetails;
