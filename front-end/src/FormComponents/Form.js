import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Form = ({ initialFormData, headerText, submitHandler }) => {
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

 

  const handleInput = (e) => {
    setFormData({
        ...formData ,
        [e.target.name] : e.target.value
    })
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    formData.people = parseInt(formData.people)
    submitHandler(formData);
    setFormData({...initialFormData})
  }
  
  const handleCancel = () => {
    history.push("/dashboard")
  }

  return (
    <form onSubmit={handleFormSubmit} >
        <h2>{headerText}</h2>
        <label htmlFor="first_name">First Name</label>
        <input type='text' name='first_name' id='first_name' required value={formData.first_name} onChange={handleInput}/>
        <label htmlFor="last_name">Last Name</label>
        <input type='text' name='last_name' id='last_name' required value={formData.last_name} onChange={handleInput}/>
        <label htmlFor="mobile_number">mobile_number</label>
        <input type='tel' name="mobile_number" id="mobile_number"  
        required value={formData.mobile_number} onChange={handleInput}/>
        <label htmlFor="reservation_date">Reservation Date</label>
        <input type='date' name="reservation_date"  id="reservation_date" required value={formData.reservation_date} onChange={handleInput}/>
        <label htmlFor="reservation_time">Reservation Time</label>
        <input type='time' name="reservation_time" id="reservation_time" required value={formData.reservation_time} onChange={handleInput}/>
        <label htmlFor="people">Amount of People</label>
        <input type='number' min='1' max='20' name="people" id="people" required value={formData.people} onChange={handleInput}/>
        <button type='submit'>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
    </form>
  )
};

export default Form;
