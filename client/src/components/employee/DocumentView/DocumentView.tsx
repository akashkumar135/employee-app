import ViewIcon from "../../../assets/view-icon.svg";
import "./style.css";

type DisplayFileProps = {
  label: string;
};

const DocumentView: React.FC<DisplayFileProps> = ({ label }) => {
  return (
    <div className="document-wrapper">
      <img src={ViewIcon} width={20} height={20} />
      <span>{label}</span>
    </div>
  );
};

export default DocumentView;
