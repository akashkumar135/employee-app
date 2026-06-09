import { MdClose } from "react-icons/md";
import Button from "../Button/Button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../Dialog/Dialog";

import "./style.css";
import { BsCloudArrowUpFill } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import { forwardRef, useState } from "react";

type FileUploadDialogProps = {
  id: string;
  onCancel: () => void;
  onUpload: () => void;
  onChange: (file: File) => void;
  ref?: React.Ref<HTMLDivElement | null>;
  value: string;
};
const FileUploadDialog: React.FC<FileUploadDialogProps> = forwardRef(
  (
    { id, onChange, onCancel, onUpload, value },
    ref: React.Ref<HTMLDivElement | null>,
  ) => {
    const handleFileDropEnter = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const handleFileDropLeave = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const handleFileDropOver = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const handleFileDropEnd = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!event.dataTransfer || !event.dataTransfer.files) {
        return;
      }
      const file = event.dataTransfer.files[0];

      onChange(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      onChange(event.target.files[0]);
    };

    return (
      <Dialog>
        <DialogBody className="custom-body" ref={ref}>
          <DialogTitle className="custom-title">
            Upload Proof
            <Button className="action-button icon-button" onClick={() => {}}>
              <MdClose size={24} />
            </Button>
          </DialogTitle>
          <DialogContent>
            <label
              htmlFor={id}
              className="file-upload"
              onDragEnter={handleFileDropEnter}
              onDragLeave={handleFileDropLeave}
              onDragOver={handleFileDropOver}
              onDragEnd={handleFileDropEnd}
              onDrop={handleFileDrop}
            >
              <div className="file-upload-drag">
                <BsCloudArrowUpFill size={64} color="#183072" opacity="0.1" />
                <span>Drag & drop excel file here</span>
              </div>
              <span>Or</span>
              <div className="file-second-option">
                <FiUpload size={24} />
                <p>Upload file</p>
              </div>
              <input
                id={id}
                type="file"
                className="visually-hidden"
                onChange={handleFileChange}
              />
              {value && (
                <p>
                  <span>Uploaded file :</span>
                  {value}
                </p>
              )}
            </label>
          </DialogContent>
          <DialogFooter>
            <Button
              type="button"
              className="action-button cancel-button center"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="action-button confirm-button center"
              onClick={onUpload}
              disabled={!value}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogBody>
      </Dialog>
    );
  },
);

export default FileUploadDialog;
