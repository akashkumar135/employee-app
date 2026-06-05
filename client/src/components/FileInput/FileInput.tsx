import FileIcon from "../../assets/file-icon.svg";
import "../Input/style.css";

type FileInputProps = {
  id: string;
  label: string;
  name?: string;
  actionLabel: string;
};

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  name,
  actionLabel,
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <div className="custom-file-upload-container">
        <label htmlFor={id} className="custom-file-upload">
          <img src={FileIcon} width="16" height="16" />
          {actionLabel}
        </label>
        <input id={id} type="file" name={name} />
      </div>
    </div>
  );
};

export default FileInput;
