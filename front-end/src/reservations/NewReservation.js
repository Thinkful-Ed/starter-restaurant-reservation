//This file will be responsible for displaying a form used to submit a new reservation
import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
    const history = useHistory();
    const inifialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    }
    const [reservation, setReservation] = useState({...inifialFormState});
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log("Reservation:", reservation.people);
        createReservation(reservation)
        .then(() => {
            history.push(`/dashboard?date=${reservation.reservation_date}`);
        })
        .catch(setError);
    };

    const handleChange = ({ target }) => {
        setReservation({
            ...reservation,
            [target.name]: target.name === "people" ? parseInt(target.value) : target.value,
        });
        //console.log(reservation);
    };

    const handleCancel = () => {
        history.push("/");
    }

    

    return (
        <main>
            <h1>New Reservation</h1>
            <ErrorAlert error={error} />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col form-group">
                        <label className="form-label" htmlFor="first_name">
                            First Name
                        </label>
                        <input className="form-control" id="first_name" name="first_name" value={reservation.first_name} onChange={handleChange} required={true} />
                    </div>
                    <div className="col form-group">
                        <label className="form-label" htmlFor="last_name">
                            Last Name
                        </label>
                        <input className="form-control" id="last_name" name="last_name" value={reservation.last_name} onChange={handleChange} required={true} />
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <label className="form-label" htmlFor="people">
                            Party Size
                        </label>
                        <input className="form-control" id="people" name="people" type="number" value={reservation.people} onChange={handleChange} required={true} />
                    </div>
                    <div className="col form-group">
                        <label className="form-label" htmlFor="mobile_number">
                            Mobile Number
                        </label>
                        <input className="form-control" id="mobile_number" name="mobile_number" value={reservation.mobile_number} onChange={handleChange} required={true} />
                    </div>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <label className="form-label" htmlFor="reservation_date">
                            Reservation Date
                        </label>
                        <input type="date" name="reservation_date" id="reservation_date" className="form-control" onChange={handleChange} value={reservation.reservation_date} placeholder="YYYY-MM-DD"  pattern="\d{4}-\d{2}-\d{2}" required={true} />
                    </div>
                    <div className="col form-group">
                        <label className="form-label" htmlFor="reservation_time">
                            Reservation Time
                        </label>
                        <input type="time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" name="reservation_time" id="reservation_time" className="form-control" onChange={handleChange} value={reservation.reservation_time} required={true} />
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </main>
    )
}

export default NewReservation;