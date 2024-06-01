import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const body = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/user/register", body, { headers: {} })
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="addEmployee">
      <h3>SignUp</h3>
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
        </div>

        <div className="inputGroup">
          <button type="submit" onClick={() => handleSignup()}>
            Login
          </button>
          <p> Already account ? <NavLink to='/'>Login </NavLink></p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
