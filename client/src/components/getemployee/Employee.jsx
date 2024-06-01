import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./employee.css";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/emp/getall");
      setEmployees(response.data);
    };

    fetchData();
  }, []);

  const deleteEmployee = async (employeeId) => {
    await axios
      .delete(`http://localhost:8000/emp/delete/${employeeId}`)
      .then((respones) => {
        setEmployees((prevEmployee) => prevEmployee.filter((employee) => employee._id !== employeeId));
        toast.success(respones.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="employeeTable">
      <Link to={"/add"} className="addButton">
        Add Employee
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Phone No.</th>
            <th>State</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => {
            return (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>
                  {employee.fname} {employee.lname}
                </td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.state}</td>
                <td>{employee.city}</td>

                <td className="actionButtons">
                  <button onClick={() => deleteEmployee(employee._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>

                  <Link to={`/edit/` + employee._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
