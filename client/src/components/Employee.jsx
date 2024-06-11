import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees, editEmp, deleteEmp } from "../features/empSlice.js";

const Employee = () => {
  const [search, setSearch] = useState("");
  const [refreshPage, setRefreshPage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.emp.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/emp/getall");
        dispatch(setEmployees(response.data));
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };

    fetchData();
    setRefreshPage(false);
  }, [refreshPage, dispatch]);

  const filterData = search.length > 0
    ? employees.filter((item) => item.fname?.toLowerCase().includes(search.toLowerCase()))
    : employees;

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8000/emp/delete/${employeeId}`);
      dispatch(deleteEmp(employeeId));
      setRefreshPage(true);
    } catch (error) {
      console.log("Error deleting employee:", error);
    }
  };

  const handleEdit = (item) => {
    dispatch(editEmp(item));
    navigate("/edit");
  };

  return (
    <div className="employeeTable">
      <Link to={"/add"} className="addButton">
        Add Employee
      </Link>

      <div className="search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Phone No.</th>
            <th>State</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((employee, index) => {
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
                <td>
                  <button onClick={() => handleEdit(employee)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
                <td className="actionButtons">
                  <button onClick={() => handleDelete(employee._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
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
