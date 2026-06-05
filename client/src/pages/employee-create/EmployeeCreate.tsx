import { useState } from "react";
import Button from "../../components/Button/Button";
import FileInput from "../../components/FileInput/FileInput";
import Input from "../../components/Input/Input";
import SectionHeader from "../../components/layout/Section/SectionHeader";
import { Select, SelectOption } from "../../components/select/Select";
import "./style.css";
import { useLocation, useNavigate } from "react-router";

type Employee = {
  employeeName: string;
  employeeId: string;
  joiningDate: string;
  role: string;
  status: string;
  experience: number;
  action: string;
};
const EmployeeCreate = () => {
  const navigte = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<Employee>(location.state || {});

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const datas: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      datas[key] = value;
    }

    setData(datas as Employee);
    console.log("Submitted data", datas);
    navigte(`/employee/${data.employeeId}/details`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <aside className="employee-create-wrapper">
      <SectionHeader label="Create Employee" />

      <form className="employee-create-form" onSubmit={handleSubmit}>
        <div className="employee-form-fields-container">
          <Input
            id="employee-name"
            name="employeeName"
            type="text"
            label="Employee Name"
            placeholder="Employee Name"
            value={data.employeeName}
            onChange={handleChange}
            isRequired
          />
          <Input
            id="employee-id"
            name="employeeId"
            type="text"
            label="Employee ID"
            placeholder="Employee ID"
            value={data.employeeId}
            onChange={handleChange}
            isRequired
          />
          <Input
            id="joining-date"
            name="joiningDate"
            type="date"
            label="Joining Date"
            placeholder="Joining Date"
            value={data.joiningDate}
            onChange={handleChange}
            isRequired
          />

          <Select
            id="role"
            label="Role"
            name="role"
            isRequired
            value={data.role}
            onChange={handleSelectChange}
          >
            <SelectOption value="DEVELOPER">Developer</SelectOption>
            <SelectOption value="QA">QA</SelectOption>
            <SelectOption value="DESIGNER">Designer</SelectOption>
          </Select>

          <Select
            id="status"
            label="Status"
            name="status"
            isRequired
            value={data.status}
            onChange={handleSelectChange}
          >
            <SelectOption value="Probation">Probation</SelectOption>
            <SelectOption value="Inactive">Inactive</SelectOption>
            <SelectOption value="Employee">Employee</SelectOption>
          </Select>
          <Input
            id="employee-experience"
            type="text"
            name="experience"
            label="Experience"
            placeholder="Experience"
            value={data.experience?.toString()}
            onChange={handleChange}
            isRequired
          />

          <div className="input-wrapper">
            <label htmlFor="employee-address">Address</label>
            <div className="address-group">
              {/* <input id="address" type="text" placeholder="Address" /> */}
              <Input
                id="employee-address"
                name="address.address"
                type="text"
                placeholder="Address"
                isRequired
              />
              <div className="address-subdetails-group">
                <Input
                  id="employee-address-city"
                  name="address.city"
                  type="text"
                  placeholder="City"
                  isRequired
                />
                <Input
                  id="employee-address-country"
                  name="address.country"
                  type="text"
                  placeholder="Country"
                  isRequired
                />
                <Input
                  id="employee-address-postal-code"
                  name="address.postalCode"
                  type="text"
                  placeholder="Postal Code"
                  isRequired
                />
              </div>
            </div>
          </div>
          <FileInput
            id="upload-file"
            label="Upload ID Proof"
            name="idProof"
            actionLabel="Attach files"
          />
        </div>
        <div className="employee-form-actions">
          <Button type="submit" className="employee-form-submit-button">
            Create
          </Button>
          <Button type="reset" className="employee-form-clear-button">
            Cancel
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default EmployeeCreate;
