import { use, useEffect, useState } from "react";
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
import { addEmployee } from "../../store/employee/employeeReducer";
import { useAppDispatch } from "../../store/store";
import {
  useCreateEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateAddressByIdMutation,
  useUpdateEmployeeMutation,
} from "../../api-service/employees/employees.api";
import type { CreateEmployeePayload } from "../../api-service/employees/types";

const EmployeeCreate = () => {
  const navigte = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const [createEmployee, { isLoading: isCreateLoading }] =
    useCreateEmployeeMutation();

  const [updateEmployee, { isLoading: isUpdateLoading }] =
    useUpdateEmployeeMutation();

  const [updateAddress, { isLoading: isAddressLoading }] =
    useUpdateAddressByIdMutation();

  const {
    data: currentEmployee,
    isLoading: isEmployeeLoading,
    error: employeeLoadingError,
  } = useGetEmployeeQuery(location.state.id);

  const {
    showDialog: showFileDialog,
    hideDialog: hideFileDialog,
    isOpen: isFileDialogOpen,
    containerRef: fileContainerRef,
    triggerRef: fileTriggerRef,
  } = useDialog();

  const [data, setData] = useState<Employee>({
    employeeName: "",
    employeeId: "",
    joiningDate: "",
    role: "",
    status: "",
    experience: 0,
    action: "",
    age: null,
    employeeEmail: "",
    password: "",
    address: {
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
    idProof: null,
  });

  const isUpdateMode = Boolean(location.state);

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    // dispatch(addEmployee(data));

    const payload: CreateEmployeePayload = {
      name: data.employeeName,
      email: data.employeeEmail,
      age: data.age,
      role: data.role,
      password: data.password,
      address: {
        line1: data.address.address,
        city: data.address.city,
        country: data.address.country,
        postal_code: data.address.postalCode,
      },
    };

    if (isUpdateMode) {
      if (payload.address) {
        updateAddress({
          employeeId: String(currentEmployee?.id),
          addressId: String(currentEmployee?.addresses[0].id),
          payload: payload.address,
        }).catch((err) => alert(err));
      }

      updateEmployee({
        id: String(currentEmployee!.id),
        payload: payload,
      })
        .unwrap()
        .then((data) => {
          navigte(`/employee/${data.id}/details`);
        })
        .catch((err) => alert(err));
    } else {
      createEmployee(payload)
        .unwrap()
        .then((data) => {
          navigte(`/employee/${data.id}/details`);
        })
        .catch((err) => alert(err));
    }
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

  useEffect(() => {
    if (isEmployeeLoading) return;

    if (employeeLoadingError) {
      alert("Failed to fetch employee details");
      return;
    }

    if (currentEmployee) {
      setData({
        employeeName: currentEmployee.name,
        employeeId: "",
        joiningDate: "",
        role: currentEmployee.role,
        status: "",
        experience: 4,
        action: "",
        age: currentEmployee.age,
        employeeEmail: currentEmployee.email,
        password: "",
        address: {
          address: currentEmployee.addresses[0]?.line1,
          city: currentEmployee.addresses[0]?.city,
          country: currentEmployee.addresses[0]?.country,
          postalCode: currentEmployee.addresses[0]?.postal_code,
        },
        idProof: null,
      });
    }
  }, [currentEmployee, isEmployeeLoading, employeeLoadingError]);

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

            <SelectOption value="Developer">Developer</SelectOption>
            <SelectOption value="UI">UI</SelectOption>
            <SelectOption value="UX">UX</SelectOption>
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
          <Input
            id="employee-email"
            name="employeeEmail"
            type="email"
            label="Employee Email"
            placeholder="Employee Email"
            value={data.employeeEmail}
            onChange={handleChange}
            isRequired
          />
          {!isUpdateMode && (
            <Input
              id="employee-password"
              type="password"
              name="password"
              label="Passowrd"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              isRequired
            />
          )}

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
        </div>
        <div className="employee-form-actions">
          <Button
            type="submit"
            className="employee-form-submit-button"
            disabled={isCreateLoading || isUpdateLoading}
          >
            {isCreateLoading || isUpdateLoading
              ? "Saving"
              : isUpdateMode
                ? "Update"
                : "Create"}
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
