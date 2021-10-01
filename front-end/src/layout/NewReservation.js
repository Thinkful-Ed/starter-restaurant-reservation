import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { createReservation } from "../utils/api";

export default function NewReservation() {
  const history = useHistory();
  const initialFormState = {
    firstName: "",
    lastName: "",
    mobile_number: "",
    date: "",
    time: "",
    peopleInParty: "",
  }

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
    console.log("form data changed")
  }

  const validateForm = () => {
    const today = new Date();
    const resDate = new Date(formData.date);
    const resTime = formData.time;
    const errorArray = [];

    if (resDate.getDay() == 2) {
      errorArray.push({ message: "Restaurant is closed on Tuesdays. Please choose a different day." })
    }
    if (resTime < "10:30") {
      errorArray.push({ message: "Restaurant opens at 10:30AM. Please choose a different time." })
    }
    if (resTime > "21:30") {
      errorArray.push({ message: "Last reservations are at 9:30PM. Please choose a different time" })
    }
    if (resDate < today) {
      errorArray.push({ message: "You can only set reservations for future dates. Please choose a different date." })
    }

    setErrors(errorArray);
    if (errorArray.length > 0) {
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createReservation(formData)
        .then((output) => 
          history.push(`/dashboard?date=${formData.date}`))
        .catch(errors);
    }
  }

  const handleCancel = (e) => {
    history.push("/dashboard")
  }

  return (
    <div>
      <h1>New Reservations</h1>
      <form onSubmit={handleSubmit} method="post">
        <label>
          First Name:
          <input 
            type="text"
            id='firstName'
            name="firstName"
            required={true}
            placeholder='enter first name'
            onChange={handleChange}
            value={formData.firstName}
            />
        </label>
        <br />
        <label>
          Last Name:
          <input 
            type='text'
            id="lastName"
            name="lastName"
            required={true}
            placeholder='enter last name'
            onChange={handleChange}
            value={formData.lastName}
            />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            id='mobile_number'
            name='mobile_number'
            required={true}
            placeholder='enter phone number'
            onChange={handleChange}
            value={formData.mobile_number}
          />
        </label>
        <br />
        <label>
          Reservation Date:
          <input 
            type='date'
            id="date"
            name='date'
            required={true}
            onChange={handleChange}
            value={formData.date}
            />
        </label>
        <br />
        <label>
          Reservation Time:
          <input 
            type='time'
            id="time"
            name='time'
            required={true}
            onChange={handleChange}
            value={formData.time}
            />
        </label>
        <br />
        <label>
          People in party:
          <input 
            type='number' 
            id="peopleInParty"
            name='peopleInParty'
            required={true}
            placeholder='enter number'
            onChange={handleChange}
            value={formData.peopleInParty}
            />
        </label>
        <br />
        <button 
          type="submit"
          >Submit</button>
        <button 
          type='cancel' 
          className='cancelButton'
          onClick={() => {
            const confirmBox = window.confirm(
              "If you cancel all information will be lost"
            )
            if (confirmBox === true) {
              console.log("going back a page")
              handleCancel();
            }
          }}>
            Cancel
          </button>
      </form>
    </div>
  )
}