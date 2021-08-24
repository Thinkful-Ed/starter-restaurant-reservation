import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function NewReservation() {
  const [reservation, setReservation] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    party_size: '',
  });

  const reservations = [];

  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    reservations.push(reservation);
    console.log(reservations[0]);
    setReservation({
      first_name: '',
      last_name: '',
      mobile_number: '',
      reservation_date: '',
      reservation_time: '',
      party_size: '',
    });
    history.push('/');
  }
  function handleChange({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  }
  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          name="first_name"
          type="text"
          placeholder="Bob"
          required
          value={reservation.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          name="last_name"
          type="text"
          placeholder="Bobbinson"
          required
          value={reservation.last_name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Mobile Number:
        <input
          name="mobile_number"
          type="tel"
          placeholder="555-666-6969"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          value={reservation.mobile_number}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Date of Reservation:
        <input
          name="reservation_date"
          type="date"
          required
          value={reservation.reservation_date}
          onChange={handleChange}
        />
      </label>
      <label>
        Time of Reservation:
        <input
          name="reservation_time"
          type="time"
          required
          value={reservation.reservation_time}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Number of people in Party:
        <input
          name="party_size"
          type="number"
          placeholder="min. 1 person"
          min="1"
          required
          value={reservation.party_size}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button className="btn btn-danger" onClick={history.goBack}>
        Cancel
      </button>
    </form>
  );
}
