import "./style.css";

type ErrorMessageProps = {
  className?: string;
  message: string;
};
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className = "",
  message,
}) => {
  return (
    <span role="error" className={`error-box ${className}`}>
      {message}
    </span>
  );
};

export default ErrorMessage;
