import { forwardRef, type RefObject } from "react";
import "./style.css";

type DialogProps = {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement | null>;
};

type DialogBodyProps = {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement | null>;
};

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement | null>;
};

type DialogFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const Dialog: React.FC<DialogProps> = forwardRef(
  ({ children }, ref: React.Ref<HTMLDivElement | null>) => {
    return (
      <div className="dialog" ref={ref}>
        {children}
      </div>
    );
  },
);

export const DialogBody: React.FC<DialogBodyProps> = forwardRef(
  ({ children, className }, ref: React.Ref<HTMLDivElement | null>) => {
    return (
      <div className={`dialog-body ${className}`} ref={ref}>
        {children}
      </div>
    );
  },
);

export const DialogContent: React.FC<DialogContentProps> = forwardRef(
  ({ children, className }, ref: React.Ref<HTMLDivElement | null>) => {
    return (
      <div className={`dialog-content ${className}`} ref={ref}>
        {children}
      </div>
    );
  },
);

export const DialogTitle: React.FC<DialogTitleProps> = ({
  children,
  className,
}) => {
  return <div className={`dialog-title ${className}`}>{children}</div>;
};

export const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className,
}) => {
  return <div className={`dialog-footer ${className}`}>{children}</div>;
};
