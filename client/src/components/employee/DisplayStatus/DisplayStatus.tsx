import "./style.css";

type DisplayStatusProps = {
  status: string;
};

const getClassNameByStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "probation":
      return "status-probation";
    case "inactive":
      return "status-inactive";
    case "active":
      return "status-active";
  }
};

const DisplayStatus: React.FC<DisplayStatusProps> = ({ status }) => {
  return (
    <div className={`display-status center ${getClassNameByStatus(status)}`}>
      {status}
    </div>
  );
};

export default DisplayStatus;
