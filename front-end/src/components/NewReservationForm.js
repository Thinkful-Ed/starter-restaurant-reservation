
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createReservation } from '../utils/api';

function NewReservationForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: 1,
  });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createReservation(formData);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      // Implement error handling here
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
      <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
      <input name="mobile_number" value={formData.mobile_number} onChange={handleChange} placeholder="Mobile Number" required />
      <input type="date" name="reservation_date" value={formData.reservation_date} onChange={handleChange} required />
      <input type="time" name="reservation_time" value={formData.reservation_time} onChange={handleChange} required />
      <input type="number" name="people" value={formData.people} onChange={handleChange} min="1" required />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => history.goBack()}>Cancel</button>
    </form>
  );
}

export default NewReservationForm;