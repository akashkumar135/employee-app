import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./style.css";

import IconImage from "../../assets/icon.png";
import LoginHeroImage from "../../assets/login-left-image-mask.png";

const Login = () => {
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

          <form className="login-form-layout">
            <Input
              id="username"
              type="text"
              placeholder="Username"
              isRequired
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              isRequired
            />
            <Button type="submit" className="login-submit-button" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
