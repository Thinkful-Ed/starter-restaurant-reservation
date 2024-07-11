import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ reservation, changeHandler, submitHandler }) {

    const history = useHistory();

    function cancelHandler() {
        history.goBack();
    } 
    
return (
    <form onSubmit={submitHandler} className="form-group mb-4">
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
                    placeholder="First Name"
                    autoFocus
                    pattern="^[a-zA-Z0-9'-. ]+$"
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
                    placeholder="Last Name"
                    pattern="^[a-zA-Z0-9'-. ]+$"
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
                placeholder="Mobile Number"
                pattern="\d{3}-\d{3}-\d{4}"  // Escaped backslash for correct JSX interpretation
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
                    pattern="\\d{4}-\\d{2}-\\d{2}"
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
                    pattern="[0-9]{2}:[0-9]{2}"
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
                min= {1}
                value={reservation.people}
                onChange={changeHandler}
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
);

}

export default ReservationForm;