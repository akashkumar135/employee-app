import Button from "../../components/Button/Button";
import FileInput from "../../components/FileInput/FileInput";
import Input from "../../components/Input/Input";
import { Select, SelectOption } from "../../components/select/Select";
import "./style.css";

const EmployeeCreate = () => {
  return (
    <aside className="employee-rigth-container">
      <div className="employee-head-section">
        <h2>Create Employee</h2>
      </div>

      <form className="employee-create-form">
        <div className="employee-form-fields-container">
          <Input
            id="employee-name"
            type="text"
            label="Employee Name"
            placeholder="Employee Name"
            isRequired
          />
          <Input
            id="employee-id"
            type="text"
            label="Employee ID"
            placeholder="Employee ID"
            isRequired
          />
          <Input
            id="joining-date"
            type="text"
            label="Joining Date"
            placeholder="Joining Date"
            isRequired
          />

          <Select id="role" label="Role" isRequired>
            <SelectOption value="DEVELOPER">Developer</SelectOption>
            <SelectOption value="QA">QA</SelectOption>
            <SelectOption value="DESIGNER">Designer</SelectOption>
          </Select>

          <Select id="status" label="Status" isRequired>
            <SelectOption value="ACTIVE">Active</SelectOption>
            <SelectOption value="INACTIVE">Inactive</SelectOption>
          </Select>
          <Input
            id="employee-experience"
            type="text"
            label="Experience"
            placeholder="Experience"
            isRequired
          />

          <div className="input-wrapper">
            <label htmlFor="employee-address">Address</label>
            <div className="address-group">
              <input id="address" type="text" placeholder="Address" />
              <Input
                id="employee-address"
                type="text"
                placeholder="Address"
                isRequired
              />
              <div className="address-subdetails-group">
                <Input
                  id="employee-address-city"
                  type="text"
                  placeholder="City"
                  isRequired
                />
                <Input
                  id="employee-address-country"
                  type="text"
                  placeholder="Country"
                  isRequired
                />
                <Input
                  id="employee-address-postal-code"
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
