import "./style.css";

type InputProps = {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type: string;
  className?: string;
  containerClassName?: string;
  isRequired?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  placeholder,
  type,
  className = "",
  containerClassName = "",
  value,
  onChange,
  isRequired = false,
}) => {
  return (
    <div className={"input-wrapper" + containerClassName}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={isRequired}
      />
    </div>
  );
};

export default Input;
