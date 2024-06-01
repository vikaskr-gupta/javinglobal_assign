import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


const Login = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const body = {
      email: "",
      password: "",
    };
    if (email) {
      body.email = email;
      setEmailError(false);
    } else {
      setEmailError(true);
    }

    if (password && password.length >= 6 && password.length <= 12) {
      body.password = password;
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }

    if (body.email && body.password) {
      axios
        .post("http://localhost:8000/user/login", body, { headers: {} })
        .then((response) => {
          toast.success(response.data.msg, { position: "top-right" });
          setEmailError(false);
          setPasswordError(false);
          navigate("/employee");
        })
        .catch((e) => {
          console.log(e);
          setEmailError(true);
          setPasswordError(true);
        });
    }

  };

  return (
    <div className="addEmployee">
      <h3>Login</h3>
      <form className="addEmployeeForm">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
          {emailError && <p>Email is invalid</p>}
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
          />
          {passwordError && <p>Password should be in range 6 and 12</p>}
        </div>

        <div className="inputGroup">
          <button onClick={() => handleLogin()}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;