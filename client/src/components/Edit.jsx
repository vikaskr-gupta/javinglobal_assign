import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./add.css";

const Edit = () => {
  const employees = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(employees);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    console.log(employee);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/emp/getone/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/emp/update/${id}`, employee)
      .then((response) => {
        navigate("/employee");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addEmployee">
      <Link to={"/employee"}>Back</Link>
      <h3>Update employee</h3>
      <form className="addEmployeeForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            value={employee.fname}
            onChange={inputChangeHandler}
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
            value={employee.lname}
            onChange={inputChangeHandler}
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
            value={employee.email}
            onChange={inputChangeHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="phone">Phone</label>
          <input
            type="phone"
            value={employee.phone}
            onChange={inputChangeHandler}
            id="phone"
            name="phone"
            autoComplete="off"
            placeholder="Phone No."
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="state">State</label>
          <select
            value={employee.state}
            onChange={inputChangeHandler}
            id="state"
            name="state"
            autoComplete="off"
            placeholder="Select State"
          >
            <option value={"Uttar Pradesh"}>Uttar Pradesh</option>
            <option value={"Punjab"}>Punjab</option>
            <option value={"Maharashtra"}>Maharashtra</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="city">City</label>
          <select
            value={employee.city}
            onChange={inputChangeHandler}
            id="city"
            name="city"
            autoComplete="off"
            placeholder="Select City"
          >
            <option value={"Delhi"}>Delhi</option>
            <option value={"Gurugram"}>Gurugram</option>
            <option value={"Noida"}>Noida</option>
          </select>
        </div>
        <div className="inputGroup">
          <button type="submit">UPDATE EMPLOYEE</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
