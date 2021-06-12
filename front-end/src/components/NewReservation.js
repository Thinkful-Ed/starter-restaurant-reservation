import React, { useState } from "react";

function NewReservation() {

    const initialFormData = {
        firstName: undefined, 
        lastName: undefined,
        mobileNumber: undefined,
        reservationDate: undefined,
        reservationTime:undefined,
    }

    const [form, setForm] = useState({...initialFormData})

  function handleSelect({target}) {
      const fieldName = target.name
      const selection = target.value
    setForm({...form, [fieldName]: selection})
  }

  function handleChange(event) {
      const inputName = event.target.name
      const value = event.target.value
      setForm(
        {...form, [inputName]: value}
      )   
      console.log(event.target, event.target.value, form)
  }

  function handleSubmit(event) {
      event.preventDefault()
      console.log("here!")
      setForm(form => form = {...initialFormData})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input type="text" onChange={handleChange} name="firstName" value = {form.firstName}/>
        </label>
        <label>
          Last Name
          <input type="text" onChange={handleChange} name="lastName" value = {form.lastName} />
        </label>
        <label>
          Mobile Number
          <input type="text" onChange={handleChange} name="mobileNumber" />
        </label>
        <label>
          Date of Reservation
          <select onChange={handleSelect} name="reservationDate">
          </select>
        </label>
        <label>
          Time of Reservation
          <select type="text" onChange={handleSelect} name="reservationTime">
          </select>
        </label>
        <button type="submit">Submit</button>
        <button type="reset">Cancel</button>
      </form>
    </div>
  );
}

export default NewReservation;
