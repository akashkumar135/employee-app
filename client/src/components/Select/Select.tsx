import "./style.css";

import "../Input/style.css";

type SelectProps = {
  id?: string;
  label?: string;
  name?: string;
  isRequired?: boolean;
  containerClassName?: string;
  className?: string;
  children: React.ReactNode[] | React.ReactNode;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};
type SelectOptionProps = {
  value?: string;
  children: React.ReactNode;
};

export const Select: React.FC<SelectProps> = ({
  id,
  isRequired = false,
  label,
  name,
  className,
  containerClassName,
  children,
  value,
  onChange,
}) => {
  return (
    <div className={`input-wrapper ${containerClassName}`}>
      {label && <label htmlFor="role">{label}</label>}
      <select
        id={id}
        required={isRequired}
        name={name}
        className={className}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};

export const SelectOption: React.FC<SelectOptionProps> = ({
  value,
  children,
}) => {
  return <option value={value}>{children}</option>;
};
export default {
  Select,
};
