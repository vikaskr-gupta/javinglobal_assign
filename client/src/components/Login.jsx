import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { login } from "../features/userSlice";

const Login = () => {
  const usersinit = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(usersinit);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (user.email !== "" && user.password !== "") {
      try {
        const response = await axios.post("http://localhost:8000/user/login", user);
        dispatch(login(response.data));
        navigate("/employee");
      } catch (error) {
        console.log(error);
      }
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