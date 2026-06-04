import "./style.css";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  className,
  onClick,
  children,
}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
