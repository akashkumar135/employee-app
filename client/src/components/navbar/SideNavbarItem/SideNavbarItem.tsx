type SideNavbarItemProps = {
  label: string;
  iconUrl?: string;
  iconSize?: number;
};

const SideNavbarItem: React.FC<SideNavbarItemProps> = ({
  label,
  iconUrl,
  iconSize = 20,
}) => {
  return (
    <div className="navbar-item">
      {iconUrl && (
        <div className="navbar-icon-container center">
          <img src={iconUrl} width={iconSize} height={iconSize} />
        </div>
      )}
      <span>{label}</span>
    </div>
  );
};

export default SideNavbarItem;
