import "./style.css";

type SectionHeaderProps = {
  label: string;
  extraOptions?: React.ReactNode;
};
const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  extraOptions,
}) => {
  return (
    <div className="section-head">
      <h2>{label}</h2>

      {extraOptions && <div className="section-extra">{extraOptions}</div>}
    </div>
  );
};

export default SectionHeader;
