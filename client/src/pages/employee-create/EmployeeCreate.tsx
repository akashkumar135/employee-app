import { useState } from "react";
import Button from "../../components/Button/Button";
import FileInput from "../../components/FileInput/FileInput";
import Input from "../../components/Input/Input";
import SectionHeader from "../../components/layout/Section/SectionHeader";
import { Select, SelectOption } from "../../components/select/Select";
import "./style.css";

const EmployeeCreate = () => {
  const [data, setData] = useState({});

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const datas: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      datas[key] = value;
    }

    setData(datas);
    console.log("Submitted data", datas);
  };
  return (
    <aside className="employee-create-wrapper">
      <SectionHeader label="Create Employee" />

      <form className="employee-create-form" onSubmit={handleSubmit}>
        <div className="employee-form-fields-container">
          <Input
            id="employee-name"
            name="name"
            type="text"
            label="Employee Name"
            placeholder="Employee Name"
            isRequired
          />
          <Input
            id="employee-id"
            name="id"
            type="text"
            label="Employee ID"
            placeholder="Employee ID"
            isRequired
          />
          <Input
            id="joining-date"
            name="joiningDate"
            type="date"
            label="Joining Date"
            placeholder="Joining Date"
            isRequired
          />

          <Select id="role" label="Role" name="role" isRequired>
            <SelectOption value="DEVELOPER">Developer</SelectOption>
            <SelectOption value="QA">QA</SelectOption>
            <SelectOption value="DESIGNER">Designer</SelectOption>
          </Select>

          <Select id="status" label="Status" name="status" isRequired>
            <SelectOption value="ACTIVE">Active</SelectOption>
            <SelectOption value="INACTIVE">Inactive</SelectOption>
          </Select>
          <Input
            id="employee-experience"
            type="text"
            name="experience"
            label="Experience"
            placeholder="Experience"
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
