import "./style.css";

import "../Input/style.css";

type SelectProps = {
  id?: string;
  label?: string;
  isRequired?: boolean;
  containerClassName?: string;
  className?: string;
  children: React.ReactNode[] | React.ReactNode;
};
type SelectOptionProps = {
  value?: string;
  children: React.ReactNode;
};

export const Select: React.FC<SelectProps> = ({
  id,
  isRequired = false,
  label,
  className,
  containerClassName,
  children,
}) => {
  return (
    <div className={`input-wrapper ${containerClassName}`}>
      {label && <label htmlFor="role">{label}</label>}
      <select id={id} required={isRequired} className={className}>
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
