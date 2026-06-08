import { Link } from "react-router";

type SideNavbarItemProps = {
  label: string;
  iconUrl?: string;
  iconSize?: number;
  url: string;
};

const SideNavbarItem: React.FC<SideNavbarItemProps> = ({
  label,
  iconUrl,
  url,
  iconSize = 20,
}) => {
  return (
    <Link to={url} className="navbar-item">
      {iconUrl && (
        <div className="navbar-icon-container center">
          <img src={iconUrl} width={iconSize} height={iconSize} />
        </div>
      )}
      <span>{label}</span>
    </Link>
  );
};

export default SideNavbarItem;
