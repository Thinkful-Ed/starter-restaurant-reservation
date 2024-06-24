import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { formatAsDate } from "../utils/date-time";


function ReservationCreate() {

    const history = useHistory();
    const [error, setError] = useState(null);
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    });  

    function cancelHandler() {
        history.push("/");
    }

    function submitHandler(event) {
        event.preventDefault();
        createReservation(reservation)
        .then((savedReservations) => { history.push(`/dashboard?date=${formatAsDate(savedReservations.reservation_date)}`); })
        // .then((savedReservations) => { window.location.replace(`/dashboard?date=${formatAsDate(savedReservations.reservation_date)}`); })
        .catch(setError);
    }
    
 
    function changeHandler({ target: { name, value } }) {
        setReservation((previousReservation) => ({
         ...previousReservation,
            [name]: value,
        }));
    }


    function numberChangeHandler({ target: { name, value } }) {
        setReservation((previousReservation) => ({
          ...previousReservation,
          [name]: Number(value),
        }));
      }

return (
    <main>
        <h1 className="mb-3">Create Reservation</h1>
        <ErrorAlert error={error} />
        <form onSubmit={submitHandler} className="mb-4">
            <div className="row mb-3">
                <div className="col-6 form-group">
                    <label className="form-label" htmlFor="first_name">
                        First Name
                    </label>
                    <input
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        type="text"
                        
                        value={reservation.first_name}
                        onChange={changeHandler}
                        required={true}
                       />
                </div>
                <div className="col-6">
                    <label className="form-label" htmlFor="last_name">
                        Last Name
                    </label>
                    <input
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        type="text"
                        
                        value={reservation.last_name}
                        onChange={changeHandler}
                        required={true}
                    />
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="mobile_number">
                    Mobile Number
                </label>
                <input
                    className="form-control"
                    id="mobile_number"
                    name="mobile_number"
                    type="text"
                    
                    value={reservation.mobile_number}
                    onChange={changeHandler}
                    required={true}
                />
            </div>
            <div className="row mb-3">
                <div className="col-6 form-group">
                    <label className="form-label" htmlFor="reservation_date">
                        Reservation Date
                    </label>
                    <input
                        className="form-control"
                        id="reservation_date"
                        name="reservation_date"
                        type="date"
                        value={reservation.reservation_date}
                        onChange={changeHandler}
                        required={true}
                    />
                </div>
                <div className="col-6">
                    <label className="form-label" htmlFor="reservation_time">
                        Reservation Time
                    </label>
                    <input
                        className="form-control"
                        id="reservation_time"
                        name="reservation_time"
                        type="time"
                        value={reservation.reservation_time}
                        onChange={changeHandler}
                        required={true}
                    />
                </div>
            </div>
            <div className="mb-3">
                    <label className="form-label" htmlFor="people">
                        People
                    </label>
                    <input  
                        className="form-control"
                        id="people"
                        name="people"
                        type="number"
                        max={1000}
                        min= {1}
                        value={reservation.people}
                        onChange={numberChangeHandler}
                        required={true}
                    />
            </div>

            <div className="mb-3"> 
                    <button         
                        type="button" 
                        className="btn btn-secondary mr-2"
                        onClick={cancelHandler}
                    >Cancel
                    </button>
                  

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Submit
                    </button>
                
            </div>    
        </form>        
    </main>
  );

}

export default ReservationCreate;