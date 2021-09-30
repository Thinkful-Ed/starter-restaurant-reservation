import React, { useState } from 'react';

export default function NewReservation() {
  const initialFormState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    date: "",
    time: "",
    peopleInParty: "",
  }

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
    console.log("form data changed")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div>
      <h1>New Reservations</h1>
      <form name='newReservation' onSubmit={handleSubmit}>
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
            id='phoneNumber'
            name='phoneNumber'
            required={true}
            placeholder='enter phone number'
            onChange={handleChange}
            value={formData.phoneNumber}
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
            }
          }}>
            Cancel
          </button>
      </form>
    </div>
  )
}