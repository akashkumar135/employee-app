import "./style.css";

type DisplayStatusProps = {
  status: string;
};

const getClassNameByStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case "probation":
      return "status-probation";
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
