import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FileInput from "../../components/FileInput/FileInput";
import Input from "../../components/Input/Input";
import SectionHeader from "../../components/layout/SectionHeader/SectionHeader";
import { Select, SelectOption } from "../../components/Select/Select";
import { useNavigate, useParams } from "react-router";

import "./style.css";
import type { UpdateEmployeeForm } from "../../types/employee";
import FileUploadDialog from "../../components/FileUploadDialog/FileUploadDialog";
import { useDialog } from "../../hooks/useDialog";
import {
  useCreateAddressMutation,
  useGetEmployeeQuery,
  useUpdateAddressByIdMutation,
  useUpdateEmployeeMutation,
} from "../../api-service/employees/employees.api";
import type { UpdateEmployeePayload } from "../../api-service/employees/types";
import { getInputDateFormat } from "../../utils/date.util";

const EmployeeUpdate = () => {
  const navigte = useNavigate();
  const { id } = useParams();

  const [updateEmployee, { isLoading: isUpdateEmployeeLoading }] =
    useUpdateEmployeeMutation();

  const [updateAddress, { isLoading: isUpdateAddressLoading }] =
    useUpdateAddressByIdMutation();

  const [createAddress, { isLoading: isCreateAddressLoading }] =
    useCreateAddressMutation();

  const {
    data: currentEmployee,
    isLoading: isEmployeeLoading,
    error: employeeLoadingError,
  } = useGetEmployeeQuery(id!, {
    skip: !id,
  });

  const {
    showDialog: showFileDialog,
    hideDialog: hideFileDialog,
    isOpen: isFileDialogOpen,
    containerRef: fileContainerRef,
    triggerRef: fileTriggerRef,
  } = useDialog();

  const [data, setData] = useState<UpdateEmployeeForm>({
    employeeName: "",
    employeeId: "",
    joiningDate: "",
    role: "",
    status: "",
    experience: 0,
    age: null,
    employeeEmail: "",
    address: {
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
    idProof: null,
  });

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const employeePayload: UpdateEmployeePayload = {
      id: String(currentEmployee?.id),
      payload: {
        name: data.employeeName,
        email: data.employeeEmail,
        age: data.age,
        role: data.role,
        experience: data.experience,
        joining_date: new Date(data.joiningDate),
        alternate_id: data.employeeId,
        status: data.status,
      },
    };

    const promises: Promise<any>[] = [updateEmployee(employeePayload).unwrap()];

    if (currentEmployee?.addresses[0]) {
      promises.push(
        updateAddress({
          employeeId: String(currentEmployee?.id),
          addressId: String(currentEmployee?.addresses[0].id),
          payload: {
            line1: data.address.address,
            city: data.address.city,
            country: data.address.country,
            postal_code: data.address.postalCode,
          },
        }).unwrap(),
      );
    } else {
      promises.push(
        createAddress({
          employeeId: String(currentEmployee?.id),
          payload: {
            line1: data.address.address,
            city: data.address.city,
            country: data.address.country,
            postal_code: data.address.postalCode,
          },
        }).unwrap(),
      );
    }

    try {
      await Promise.all(promises);

      navigte(`/employee/${currentEmployee?.id}/details`);
    } catch (err) {
      console.log("Failed to update employee and address");
    }
  };

  const handleCancel = () => {
    navigte("/employee");
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
        employeeId: currentEmployee.alternate_id,
        joiningDate: currentEmployee.joining_date
          ? getInputDateFormat(currentEmployee.joining_date)
          : "",
        role: currentEmployee.role,
        status: currentEmployee.status,
        experience: currentEmployee.experience,
        age: currentEmployee.age,
        employeeEmail: currentEmployee.email,
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

  const isFormSubmitting =
    isUpdateEmployeeLoading || isCreateAddressLoading || isUpdateAddressLoading;

  return (
    <aside className="employee-update-wrapper">
      <SectionHeader label="Update Employee" />
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
      <form className="employee-update-form" onSubmit={handleSubmit}>
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

            <SelectOption value="HR">HR</SelectOption>
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
            <SelectOption value="Active">Active</SelectOption>
            <SelectOption value="Inactive">Inactive</SelectOption>
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
            className="action-button employee-form-submit-button center"
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? "Saving" : "Update"}
          </Button>
          <Button
            type="button"
            className="action-button employee-form-clear-button center"
            onClick={handleCancel}
            disabled={isFormSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default EmployeeUpdate;
