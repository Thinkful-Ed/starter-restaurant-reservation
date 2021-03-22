import React from "react"
import {useState} from "react"
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";

function ReservationForm(){
    const history = useHistory();
    const initialState = {
        "first_name": "",
        "last_name": "",
        "mobile_number": "",
        "reservation_date": "",
        "reservation_time": "",
        "people": 0
    }

    // Similar to Form index.js from flashcards project:
    const [reservation, setReservation] = useState(initialState);
    function changeHandler({ target: { name, value } }) {
      setReservation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    function changeHandlerNum({ target: { name, value } }) {
      setReservation((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    }

    function submitHandler(event){
        event.preventDefault();
        event.stopPropagation();
        createReservation(reservation)
        .then((createdReservation) => {
            const res_date = createdReservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
        history.push(
          `/dashboard?date=`+res_date
        );
      })
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">First name:</label>
                <div className="col-sm-10">
                    <input name="first_name" value={reservation.first_name} onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Last name:</label>
                <div className="col-sm-10">
                    <input name="last_name" value={reservation.last_name} onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Mobile Number:</label>
                <div className="col-sm-10">
                    <input name="mobile_number" type="tel" value={reservation.mobile_number} onChange={changeHandler}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Reservation Date:</label>
                <div className="col-sm-10">
                    <input name="reservation_date" type="date" value={reservation.reservation_date} onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Time:</label>
                <div className="col-sm-10">
                    <input name="reservation_time" type="time" value={reservation.reservation_time} onChange={changeHandler} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Number of people:</label>
                <div className="col-sm-10">
                    <input name="people" type="number" min={1} value={reservation.people} onChange={changeHandlerNum} />
                </div>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => history.goBack()}>Cancel</button>
        </form>
    )
}

export default ReservationForm;
