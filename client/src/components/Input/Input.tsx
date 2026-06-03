import "./style.css";

type InputProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  type: string;
  className?: string;
  containerClassName?: string;
  isRequired?: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type,
  className = "",
  containerClassName = "",
  isRequired = false,
}) => {
  return (
    <div className={"input-wrapper" + containerClassName}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
};

export default Input;
