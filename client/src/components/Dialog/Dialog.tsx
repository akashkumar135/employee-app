import "./style.css";

type DialogProps = {
  children: React.ReactNode;
};

type DialogBodyProps = {
  children: React.ReactNode;
};

type DialogTitleProps = {
  children: React.ReactNode;
};

type DialogContentProps = {
  children: React.ReactNode;
};

type DialogFooterProps = {
  children: React.ReactNode;
};

export const Dialog: React.FC<DialogProps> = ({ children }) => {
  return <div className="dialog">{children}</div>;
};

export const DialogBody: React.FC<DialogBodyProps> = ({ children }) => {
  return <div className="dialog-body">{children}</div>;
};

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  return <div className="dialog-content">{children}</div>;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return <div className="dialog-title">{children}</div>;
};

export const DialogFooter: React.FC<DialogFooterProps> = ({ children }) => {
  return <div className="dialog-footer">{children}</div>;
};
