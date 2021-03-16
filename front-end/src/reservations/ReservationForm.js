import React from "react"
import { useHistory } from "react-router-dom";

function ReservationForm(){
    const history = useHistory();

    return (
        <form>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">First name:</label>
                <div class="col-sm-10">
                    <input name="first_name" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Last name:</label>
                <div class="col-sm-10">
                    <input name="last_name" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Mobile Number:</label>
                <div class="col-sm-10">
                    <input name="mobile_number" type="tel" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Reservation Date:</label>
                <div class="col-sm-10">
                    <input name="reservation_date" type="date"/>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Time:</label>
                <div class="col-sm-10">
                    <input name="reservation_time" type="time" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Number of people:</label>
                <div class="col-sm-10">
                    <input name="people" />
                </div>
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => history.goBack()}>Cancel</button>
        </form>
    )
}

export default ReservationForm;
