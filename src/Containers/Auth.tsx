import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { LoginForm } from "../Components/loginForm";
import { RegisterForm } from "../Components/registerForm";

const LoginRegisterCard: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div className="card">
      <div className="card-buttons">
        <Button
          variant={isLoginForm ? "dark" : "secondary"}
          color="primary"
          onClick={() => setIsLoginForm(true)}
        >
          Login
        </Button>
        <h2>BlogPost</h2>
        <Button
          variant={!isLoginForm ? "dark" : "secondary"}
          onClick={() => setIsLoginForm(false)}
        >
          Register
        </Button>
      </div>
      <div className="card-body">
        {isLoginForm ? (
          <>
            <div className="card-header">Login</div>
            <div className="login-form">
              <LoginForm />
            </div>
          </>
        ) : (
          <>
            <div className="card-header">Register</div>
            <div className="register-form">
              <RegisterForm />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterCard;
