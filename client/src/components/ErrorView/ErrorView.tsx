import Button from "../Button/Button";
import DangerIcon from "../../assets/danger-icon.svg";

import "./style.css";
type ErrorViewProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorView: React.FC<ErrorViewProps> = ({ onRetry, message }) => {
  return (
    <div className="error-view-wrapper">
      <img src={DangerIcon} width={128} height={128} />
      <p>{message || "Something went wrong"}</p>
      <Button className="error-button" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
};

export default ErrorView;
