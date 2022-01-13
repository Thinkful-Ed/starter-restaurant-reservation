import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

function ReservationForm({
    onSubmit,
    onCancel,
    initialState = { 
        firstName: "",
        lastName: "",
        mobileNumber: "",
        reservationDate: "",
        reservationTime: "",
        people: "",
    },
}) {
    const [reservation, setReservation] = useState(initialState);
    const { date } = useParams();

    function changeHandler({ target: { name, value } }) {
        setReservation((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        onSubmit(reservation);
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="deck-edit">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input 
                            type="text"
                            id="first_name"
                            name="first_name"
                            className="form-control"
                            value={reservation.firstName}
                            required={true}
                            placeholder="First Name"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input 
                            type="text"
                            id="last_name"
                            name="last_name"
                            className="form-control"
                            value={reservation.lastName}
                            required={true}
                            placeholder="Last Name"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile_number">Mobile number</label>
                        <input 
                            type="tel"
                            id="mobile_number"
                            name="mobile_number"
                            className="form-control"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={reservation.mobileNumber}
                            required={true}
                            placeholder="Mobile number"
                            onChange={changeHandler}
                        />
                    </div>
                    {console.log(reservation)}
                </fieldset>
            </form>
        </div>
    )
}