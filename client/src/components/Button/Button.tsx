type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ type = "button", className }) => {
  return (
    <button type={type} className={className}>
      Login
    </button>
  );
};

export default Button;
