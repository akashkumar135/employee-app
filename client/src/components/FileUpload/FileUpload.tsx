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
import { forwardRef } from "react";

type FileUploadDialogProps = {
  onCancel: () => void;
  onUpload: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLDivElement | null>;
  value: string;
};
const FileUploadDialog: React.FC<FileUploadDialogProps> = forwardRef(
  (
    { onChange, onCancel, onUpload, value },
    ref: React.Ref<HTMLDivElement | null>,
  ) => {
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
            <label htmlFor="1234" className="file-upload">
              <div className="file-upload-drag">
                <BsCloudArrowUpFill size={64} color="#183072" opacity="0.1" />
                <span>Drag & drop excel file here</span>
              </div>
              <span>Or</span>
              <div className="file-second-option">
                <FiUpload size={24} />
                <p>Upload file</p>
              </div>
            </label>

            <input
              id="1234"
              type="file"
              className="hidden"
              onChange={onChange}
            />
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
