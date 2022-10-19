import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL as url, findRes, addRes, updateRes } from "../utils/api";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({ setDate }){
    const {reservation_id} = useParams();
    const history = useHistory();
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: setDate,
        reservation_time: "",
        people: "1",
    });

    const [reservationError, setReservationError] = useState();
    
    useEffect(() => {
        const abortController = new AbortController();
        reservation_id && findRes(reservation_id).then(setReservation)
        return () => abortController.abort();
    }, []);

    let { 
        first_name, 
        last_name, 
        mobile_number, 
        reservation_time, 
        reservation_date,
        people
        } = reservation;

    function handleChange(event){
        setReservation({
            ...reservation, [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        setReservationError(null);
        reservation.people = Number(reservation.people)

        if (!reservation_id){
            addRes(reservation)
        } else {
            updateRes(reservation)
        } setDate(reservation.reservation_date)
    }

return (
    <div>
        <form onSubmit={handleSubmit}>
            <h1>
                {reservation.reservation_id ? "Edit" : "New"} Reservation
            </h1>
            <ErrorAlert error={reservationError}/>
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                    className="form-control"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                    className="form-control"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="mobile_number">Mobile Number</label>
                <input
                    className="form-control"
                    type="tel"
                    name="mobile_number"
                    placeholder="xxx-xxx-xxxx"
                    value={mobile_number}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_date">Reservation Date</label>
                <input
                    className="form-control"
                    type="date"
                    name="reservation_date"
                    id="reservation_date"
                    value={reservation_date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="reservation_time">Time</label>
                <input
                    className="form-control"
                    type="time"
                    name="reservation_time"
                    id="reservation_time"
                    value={reservation_time}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="people">Party Size</label>
                <input
                    className="form-control"
                    type="text"
                    name="people"
                    id="people"
                    placeholder="Enter Party Size"
                    value={people}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="buttons">
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
                <button
                    onClick={() => history.goBack()}
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
)

}

export default ReservationForm;