import { MdClose } from "react-icons/md";
import FileIcon from "../../assets/file-icon.svg";
import Button from "../Button/Button";
import "../Input/style.css";

type FileInputProps = {
  id: string;
  label: string;
  name?: string;
  actionLabel: string;
  fileName?: string;
  onClick?: () => void;
  onRemoveClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  name,
  fileName,
  onRemoveClick,
  actionLabel,
  onClick,
}) => {
  const handleRemoveClick: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.stopPropagation();

    if (onRemoveClick) onRemoveClick(event);
  };

  return (
    <div className="input-wrapper" onClick={onClick}>
      <label htmlFor={id}>{label}</label>
      <div className="custom-file-upload-container">
        <label htmlFor={id} className="custom-file-upload">
          {fileName && (
            <div className="custom-file-value-wrapper">
              <div className="custom-file-value">
                <div>{fileName}</div>
                <Button
                  className="custom-file-remove center"
                  onClick={handleRemoveClick}
                >
                  <MdClose size={16} />
                </Button>
              </div>
            </div>
          )}
          <div className="custom-file-action-label">
            <img src={FileIcon} width="16" height="16" />
            {actionLabel}
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileInput;
