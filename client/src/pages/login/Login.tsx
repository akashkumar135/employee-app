import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./style.css";

import IconImage from "../../assets/icon.png";
import LoginHeroImage from "../../assets/login-left-image-mask.png";
import { useState } from "react";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    console.log(data, "FORM Submitted");
  };

  return (
    <main className="login-layout">
      <div className="login-left-container center">
        <div className="login-left-image-container w-full center">
          <img className="login-left-image" src={LoginHeroImage} />
        </div>
      </div>

      <div className="login-right-container center">
        <div className="login-container">
          <img src={IconImage} className="login-form-icon" />

          <form className="login-form-layout" onSubmit={handleSubmit}>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              isRequired
            />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              isRequired
            />
            <Button type="submit" className="login-submit-button">
              Login
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
