import { useNavigate } from "react-router";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./style.css";

import IconImage from "../../assets/icon.png";
import LoginHeroImage from "../../assets/login-left-image-mask.png";
import { useState } from "react";
import { useLoginMutation } from "../../api-service/auth/login.api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Login = () => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username": {
        const emailMsg = value && !value.includes("@") ? "Must contain @" : "";

        setErrors((prev) => ({ ...prev, username: emailMsg }));
        return;
      }
      case "password": {
        const passwordMsg =
          value && value.length < 8
            ? "Must be greater than or equal 8 characters"
            : "";
        setErrors((prev) => ({
          ...prev,
          password: passwordMsg,
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    validateField(name, value);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.set("username", data.username);
      formData.set("password", data.password);

      const response = await login(formData);

      if (response.data) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate("/employee");
      }
      console.log(data, "FORM Submitted");
    } catch (err) {
      console.log(err instanceof Error ? err.message : err);
    }
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
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              // placeholder="Username"
              containerClassName="custom-input"
              isRequired
            />
            {errors.username && <ErrorMessage message={errors.username} />}
            <Input
              id="password"
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              containerClassName="custom-input"
              isRequired
            />
            {errors.password && <ErrorMessage message={errors.password} />}

            <Button
              type="submit"
              className="login-submit-button"
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
