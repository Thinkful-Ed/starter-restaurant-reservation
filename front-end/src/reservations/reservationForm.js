import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom"


//helper functions
const dateCompare = (reservationDate, currentDate) => {
  const res = new Date(reservationDate);
  const curr = new Date(currentDate);
  if (res < curr) {
      return true
  }
  return false
}

function ReservationForm({date}) {
    const history = useHistory()
    const initFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 2
    }
    let [form, setForm] = useState(initFormState);
    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        await fetch(`http://localhost:5001/reservations/new`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        }).then(()=> {
            console.log("saved form ", form)
        })
        history.push(`/dashboard?date=${form.reservation_date}`)
    }
    const dayOfWeek = new Date(form.reservation_date).getDay()
    return <form onSubmit={submitHandler}>
        <label htmlFor="first_name" >First Name</label>
        <input type="text" name="first_name" id="first_name" value={form.first_name} onChange={changeHandler} required/>
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name" value={form.last_name} onChange={changeHandler} required/>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input type="text" name="mobile_number" id="mobile_number" value={form.mobile_number} onChange={changeHandler} maxLength={10} required/>
        <label htmlFor="reservation_date">Reservation Date</label>
        <input type="date" name="reservation_date" id="date" min={date} value={form.reservation_date} onChange={changeHandler} required/>
        {dateCompare(form.reservation_date, date) ? <alert className="alert alert-danger">Reserve after current Date</alert> : dayOfWeek === 1 ? <alert className="alert alert-danger">Closed on Tuesdays</alert> : ""}
        <label htmlFor="reservation_time">Reservation Time</label>
        <input type="time" name="reservation_time" id="time" min="10:30" max="21:30" value={form.reservation_time} onChange={changeHandler} required/>
        {form.reservation_time < "10:30" || form.reservation_time > "21:30" ? <alert className="alert alert-danger">Reservations 10:30AM-9:30PM</alert> : ""}
        <label htmlFor="people">People</label>
        <input type="text" name="people" id="people" value={form.people} onChange={changeHandler} required/>
        <Link to={"/dashboard"}><button>cancel</button></Link>
        <button type="submit">Submit</button>
    </form>
}

export default ReservationForm