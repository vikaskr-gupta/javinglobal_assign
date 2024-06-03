import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./add.css";

const Login = () => {
  const usersinit = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(usersinit);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (
      user.email !== "" &&
      user.password !== "" &&
      user.email &&
      user.password
    ) {
      await axios
        .post("http://localhost:8000/user/login", user)
        .then((response) => {
          toast.success(response.data.msg, { position: "top-right" });
          navigate("/employee");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="addEmployee">
      <h3>Login</h3>
      <form className="addEmployeeForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
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
            onChange={inputHandler}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
          />
        </div>

        <div className="inputGroup">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
