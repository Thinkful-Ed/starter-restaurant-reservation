//Language: javascript


import React, { Component } from 'react';
import { Link,useHistory } from 'react-router-dom';
import { listReservations } from '../utils/api';
import ErrorAlert from './ErrorAlert';
import { useParams } from 'react-router';

const apiUrl = process.env.REACT_APP_API_BASE_URL;
/**
 * Defines the create new reservation form
**/


function NewReservation() {
    //form for creating a new reservation
    //the form is submitted to the server via a post request to apiUrl/reservations
      //send a form to create a new reservation
  //fields: firstName, lastName, phone, date, time, partySize
  //submit button: submit
  //submit handler: create
  //written in React.js

  //create a new reservation
  //if successful, redirect to /reservations/$date
  //if unsuccessful, redirect to /reservations/new
  let history = useHistory();

  let { date } = useParams();
  const formInitialState = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  }
  const [form, setForm] = React.useState(formInitialState);
  const [error, setError] = React.useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    const newReservation = {
      ...form
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation)
    };
    history.push(`/dashboard?date=${newReservation.reservation_date}`);
    fetch(apiUrl + '/reservations', requestOptions)
        .then(response => response.json())//then redirect to dashboard/?date=${date}
        .then(data => {
            console.log(data);
            
           
        })
  }

  function create(){
    console.log("create");
  }
  
  //returns a react component that renders a form for creating a new reservation
  return(
    <div className="NewReservation">
      <h1>New Reservation</h1>
      <form onSubmit={create}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
          /> 
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="mobile_number"
            value={form.mobile_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="reservation_date"
            value={form.reservation_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            className="form-control"
            id="time"
            name="reservation_time"
            value={form.reservation_time}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="partySize">Party Size</label>
          <input
            type="number"
            className="form-control"
            id="partySize"
            name="people"
            value={form.people}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default NewReservation;