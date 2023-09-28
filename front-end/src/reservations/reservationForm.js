import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom"

function ReservationForm() {
    const history = useHistory()
    const initFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 2
    }
    let [form, setForm] = useState(initFormState)
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
    return <form onSubmit={submitHandler}>
        <label htmlFor="first_name" >First Name</label>
        <input type="text" name="first_name" id="first_name" value={form.first_name} onChange={changeHandler} required/>
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name" value={form.last_name} onChange={changeHandler} required/>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input type="text" name="mobile_number" id="mobile_number" value={form.mobile_number} onChange={changeHandler} required/>
        <label htmlFor="reservation_date">Reservation Date</label>
        <input type="date" name="reservation_date" id="date" value={form.reservation_date} onChange={changeHandler} required/>
        <label htmlFor="reservation_time">Reservation Time</label>
        <input type="time" name="reservation_time" id="time" value={form.reservation_time} onChange={changeHandler} required/>
        <label htmlFor="people">People</label>
        <input type="text" name="people" id="people" value={form.people} onChange={changeHandler} required/>
        <Link to={"/dashboard"}><button>cancel</button></Link>
        <button type="submit">Submit</button>
    </form>
}

export default ReservationForm