import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../addemployee/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

 const employees = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    state: "",
    city: ""
 }

 const {id} = useParams();
 const navigate = useNavigate();
 const [employee, setEmployee] = useState(employees);

 const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setEmployee({...employee, [name]:value});
    console.log(employee);
 }

 useEffect(()=>{
    axios.get(`http://localhost:8000/emp/getone/${id}`)
    .then((response)=>{
        setEmployee(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
 },[id])


 const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, employee)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
 }

  return (
    <div className='addEmployee'>
        <Link to={"/"}>Back</Link>
        <h3>Update employee</h3>
        <form className='addEmployeeForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">First name</label>
                <input type="text" value={employee.fname} onChange={inputChangeHandler} id="fname" name="fname" autoComplete='off' placeholder='First name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Last name</label>
                <input type="text" value={employee.lname} onChange={inputChangeHandler} id="lname" name="lname" autoComplete='off' placeholder='Last name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" value={employee.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="phone">Phone</label>
                <input type="phone" value={employee.phone} onChange={inputChangeHandler} id="phone" name="phone" autoComplete='off' placeholder='Phone No.' />
            </div>
            <div className="inputGroup">
                <label htmlFor="state">State</label>
                <select value={employee.state} onChange={inputChangeHandler} id="state" name="state" autoComplete='off' placeholder='Select State' />
            </div>
            <div className="inputGroup">
                <label htmlFor="city">City</label>
                <select value={employee.city} onChange={inputChangeHandler} id="city" name="city" autoComplete='off' placeholder='Select City' />
            </div>
            <div className="inputGroup">
                <button type="submit">UPDATE EMPLOYEE</button>
            </div>
        </form>
    </div>
  )
}

export default Edit