import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function NewReservation() {
  const history = useHistory();
  console.log(history)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [people, setPeople] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    switch(event.target.id) {
      case 'first_name':
        setFirstName(value);
        break
      case 'last_name':
        setLastName(value);
        break
      case 'mobile_number':
        setMobileNumber(value);
        break
      case 'reservation_date':
        setReservationDate(value);
        break
      case 'reservation_time':
        setReservationTime(value);
        break
      case 'people':
        setPeople(value);
        break
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //implement saving of reservation to db
    history.push(`/dashboard?date=${reservationDate}`)
    setFirstName('');
    setLastName('');
    setMobileNumber('');
    setReservationDate('');
    setReservationTime('');
    setPeople('');
  };

  return (
    <>
      <h1>Create a new reservation</h1>
      <form name='newreservation' onSubmit={handleSubmit} >
        <div>
          <label htmlFor='first_name'>
            First Name
            <br/>
            <input id='first_name' name='first_name' type='text' onChange={handleChange} value={firstName} required />
          </label>
        </div>
        <div>
          <label htmlFor='last_name'>
            Last Name
            <br />
            <input id='last_name' name='last_name' type='text' onChange={handleChange} value={lastName} required />
          </label>
        </div>
        <div>
          <label htmlFor='mobile_number'>
            Mobile Number
            <br/>
            <input id='mobile_number' name="mobile_number" type='tel' onChange={handleChange} value={mobileNumber} required />
          </label>
        </div>
        <div>
          <label htmlFor='reservation_date'>
            Reservation Date
            <br/>
            <input id='reservation_date' name='reservation_date' type="date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" onChange={handleChange} value={reservationDate} required />
          </label>
        </div>
        <div>
          <label htmlFor='reservation_time'>
            Reservation Time
            <br/>
            <input id='reservation_time' name='reservation_time' type="time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" onChange={handleChange} value={reservationTime} required />
          </label>
        </div>
        <div>
          <label htmlFor='people'>
            Party Size
            <br/>
            <input id='people' name='people' type='number' min='1' onChange={handleChange} value={people} required />
          </label>
        </div>
        <div>
          <button onClick={history.goBack}>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  )
}

export default NewReservation;