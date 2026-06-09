import { useState, type ChangeEvent } from "react";
import Button from "../../components/Button/Button";
import FileInput from "../../components/FileInput/FileInput";
import Input from "../../components/Input/Input";
import SectionHeader from "../../components/layout/Section/SectionHeader";
import { Select, SelectOption } from "../../components/select/Select";
import { useLocation, useNavigate } from "react-router";

import "./style.css";
import type { Employee } from "../../types/employee";
import FileUploadDialog from "../../components/FileUpload/FileUpload";
import { useDialog } from "../../hooks/useDialog";
import { useDispatch } from "react-redux";
import { addEmployeeActionCreator } from "../../store/employee/employeeActions";

const EmployeeCreate = () => {
  const navigte = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const {
    showDialog: showFileDialog,
    hideDialog: hideFileDialog,
    isOpen: isFileDialogOpen,
    containerRef: fileContainerRef,
    triggerRef: fileTriggerRef,
  } = useDialog();

  const [data, setData] = useState<Employee>(
    location.state || {
      employeeName: "",
      employeeId: "",
      joiningDate: "",
      role: "",
      status: "",
      experience: "",
      action: "",
      address: {
        address: "",
        city: "",
        country: "",
        postalCode: "",
      },
      idProof: null,
    },
  );

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    console.log("Submitted data", data);
    dispatch(addEmployeeActionCreator(data));
    navigte(`/employee/${data.employeeId}/details`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [keys[1]]: value,
        },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File) => {
    if (!file) return;

    setData((prev) => ({
      ...prev,
      idProof: file,
    }));
  };

  const handleFileUpload = () => {
    hideFileDialog();
  };

  const handleRemoveFile = () => {
    setData((prev) => ({
      ...prev,
      idProof: null,
    }));
  };

  console.log(isFileDialogOpen);
  return (
    <aside className="employee-create-wrapper">
      <SectionHeader label="Create Employee" />
      {isFileDialogOpen && (
        <FileUploadDialog
          id="id-proof"
          ref={fileContainerRef}
          onChange={handleFileChange}
          onCancel={hideFileDialog}
          onUpload={handleFileUpload}
          value={data.idProof?.name || ""}
        />
      )}
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
            <SelectOption value="">Select a role</SelectOption>

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
            <SelectOption value="">Select a status</SelectOption>
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
              <Input
                id="employee-address"
                name="address.address"
                value={data.address.address}
                onChange={handleChange}
                type="text"
                placeholder="Address"
                isRequired
              />
              <div className="address-subdetails-group">
                <Input
                  id="employee-address-city"
                  name="address.city"
                  value={data.address.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  isRequired
                />
                <Input
                  id="employee-address-country"
                  name="address.country"
                  type="text"
                  value={data.address.country}
                  onChange={handleChange}
                  placeholder="Country"
                  isRequired
                />
                <Input
                  id="employee-address-postal-code"
                  name="address.postalCode"
                  value={data.address.postalCode}
                  onChange={handleChange}
                  type="text"
                  placeholder="Postal Code"
                  isRequired
                />
              </div>
            </div>
          </div>
          <FileInput
            ref={fileTriggerRef}
            id="upload-file"
            label="Upload ID Proof"
            name="idProof"
            fileName={data.idProof?.name || ""}
            actionLabel="Attach files"
            onClick={showFileDialog}
            onRemoveClick={handleRemoveFile}
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
