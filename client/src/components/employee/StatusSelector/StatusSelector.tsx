import "./style.css";

type StatusSelectorProps = {
  selected: string;
  options: { label: string; value: string }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  name?: string;
};

const StatusSelector: React.FC<StatusSelectorProps> = ({
  selected,
  options,
  onChange,
  name,
}) => {
  return (
    <select
      name={name}
      className="search-selector"
      onChange={onChange}
      value={selected}
    >
      {options.map((eachOption) => (
        <option key={eachOption.value} value={eachOption.value}>
          {eachOption.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelector;
