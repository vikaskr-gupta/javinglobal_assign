import React, { useEffect, useState } from "react";
import axios from "axios";
import "./employee.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editEmp } from "../features/empSlice.js";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshPage, setRefreshPage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setRefreshPage(false);
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/emp/getall");
      setEmployees(response.data);
    };
    fetchData();
  }, [refreshPage]);

  useEffect(() => {
    if (search.length > 0) {
      let res = employees.filter((item) => item.fname?.includes(search));
      setFilterData(res);
    } else {
      setFilterData(employees);
    }
  }, [search, employees]);

  const deleteEmployee = (employeeId) => {
    axios
      .delete(`http://localhost:8000/emp/delete/${employeeId}`)
      .then((response) => {
        setRefreshPage(true);
      })
      .catch((error) => {
        console.log(error);
      });
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
                  <button onClick={() => deleteEmployee(employee._id)}>
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
