import "./style.css";

type TableProps = {
  children: React.ReactNode;
};

type TableCellProps = {
  className?: string;
  children: React.ReactNode;
};

type TableRowProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
};

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="table-wrapper">
      <table className="table">{children}</table>
    </div>
  );
};

export const TableHeader: React.FC<TableProps> = ({ children }) => {
  return <thead className="table-header">{children}</thead>;
};

export const TableBody: React.FC<TableProps> = ({ children }) => {
  return <tbody className="table-body">{children}</tbody>;
};

export const TableRow: React.FC<TableRowProps> = ({ children, onClick }) => {
  return (
    <tr className="table-row" onClick={onClick}>
      {children}
    </tr>
  );
};

export const TableHead: React.FC<TableProps> = ({ children }) => {
  return <th className="table-head">{children}</th>;
};

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
}) => {
  return <td className={`table-cell ${className}`}>{children}</td>;
};
