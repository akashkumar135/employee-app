import "./style.css";

type DisplayFieldProps = {
  label: string;
  children: React.ReactNode;
};

const DisplayField: React.FC<DisplayFieldProps> = ({ label, children }) => {
  return (
    <div className="display-wrapper">
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
};

export default DisplayField;
