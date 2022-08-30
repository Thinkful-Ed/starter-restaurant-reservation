import React from "react";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function NewReservation() {
  return (
    <main>
      <h1>New Reservation</h1>
    <form>
      <div className="form-group">
      <label for="first_name" class="col-sm-2 col-form-label">First name</label>
      <input name="first_name" />
      <label for="last_name" class="col-sm-2 col-form-label">Last name</label>
      <input name="last_name" />
      <label for="mobile_number" class="col-sm-2 col-form-label">Mobile number</label>
      <input name="mobile_number" />
      <label for="reservation_date" class="col-sm-2 col-form-label">Date of reservation</label>
      <input type="date" name="reservation_date" />
      <label for="reservation_time" class="col-sm-2 col-form-label">Time of reservation</label>
      <input type="time" name="reservation_time" />
      <label for="people" class="col-sm-2 col-form-label">Number of people in the party</label>
      <input name="people" />
      <div>
      <button className="btn btn-primary mr-1" type="submit">Submit</button>
      <button className="btn btn-secondary mr-1" /*onClick={cancelFn}*/ type="button">Cancel</button>
      </div>
      </div>
    </form>
    <ErrorAlert />
    </main>
  );
}

export default NewReservation;
