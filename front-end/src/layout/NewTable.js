import React, { useState } from 'react';

export default function NewTable() {
  const initialFormState = {
    tableName: "",
    capacity: "",
  }

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleSubmit = (target) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleChange = (e) => {
    e.preventDefault();
    console.log('form data changed')
  }

  return (
    <div>
      <h1>New Reservations</h1>
      <form name='newTable' onSubmit={handleSubmit}>
        <label>
          Table Name:
          <input 
            type="text"
          />
        </label>
        <br />
        <label>
          Capacity:
          <input 
            type="text"
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