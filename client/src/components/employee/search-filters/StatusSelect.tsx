import "./style.css";

type StatusSelectorProps = {
  selected: string;
  options: { label: string; value: string }[];
};

const StatusSelector: React.FC<StatusSelectorProps> = ({
  selected,
  options,
}) => {
  return (
    <select className="search-selector">
      {options.map((eachOption) => (
        <option key={eachOption.value}>{eachOption.label}</option>
      ))}
    </select>
  );
};

export default StatusSelector;
