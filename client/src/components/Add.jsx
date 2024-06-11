import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useDispatch } from "react-redux";
import { addEmp } from "../features/empSlice";

const Add = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  };

  const [employee, setEmployee] = useState(users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (employee.fname !== "" && employee.lname !== "" && employee.email !== "") {
      const response = await axios.post("http://localhost:8000/emp/create", employee);
      dispatch(addEmp(response.data));
      navigate("/employee");
    }
  };

  return (
    <div className="addEmployee">
      <Link to={"/"}>Back</Link>
      <h3>Add new employee</h3>
      <form className="addEmployeeForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last name"
          />
        </div>
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
          <label htmlFor="phone">Phone No.</label>
          <input
            type="phone"
            onChange={inputHandler}
            id="phone"
            name="phone"
            autoComplete="off"
            placeholder="Phone No."
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="state">State</label>
          <select onChange={inputHandler} id="state" name="state">
            <option defaultValue={""}>Select State</option>
            <option value={"Uttar Pradesh"}>Uttar Pradesh</option>
            <option value={"Punjab"}>Punjab</option>
            <option value={"Maharashtra"}>Maharashtra</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="city">City</label>
          <select onChange={inputHandler} id="city" name="city">
            <option defaultValue={""}>Select City</option>
            <option value={"Delhi"}>Delhi</option>
            <option value={"Gurugram"}>Gurugram</option>
            <option value={"Noida"}>Noida</option>
          </select>
        </div>
        <div className="inputGroup">
          <button type="submit">ADD EMPLOYEE</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
