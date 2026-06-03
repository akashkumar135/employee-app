type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  className,
  children,
}) => {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
