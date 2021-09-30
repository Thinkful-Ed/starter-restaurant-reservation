import { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { createReservation } from "../../utils/api";

function ReservationCreate() {
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const history = useHistory();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setFormData((previousRes) => ({
      ...previousRes,
      [name]: value,
    }));
  }

  function submitHandler(evt) {
    evt.preventDefault();
    createReservation(formData)
      .then(() => {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      })
      .catch(setError);
  }

  function cancelHandler() {
    history.push("/");
  }
  return (
    <main>
      <h1>Create Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler} className="reservation-edit">
        <fieldset>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="firstName"
              name="first_name"
              className="form-control"
              value={formData.first_name}
              required={true}
              placeholder="First Name"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="last_name"
              className="form-control"
              value={formData.last_name}
              required={true}
              placeholder="Last Name"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobile_number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              className="form-control"
              value={formData.mobile_number}
              required={true}
              placeholder="Number"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              type="date"
              id="reservationDate"
              name="reservation_date"
              className="form-control"
              value={formData.reservation_date}
              required={true}
              placeholder="Reservation Date"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              type="time"
              id="reservationTime"
              name="reservation_time"
              className="form-control"
              value={formData.reservation_time}
              required={true}
              placeholder="Reservation Date"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">People</label>
            <input
              type="number"
              min="1"
              id="people"
              name="people"
              className="form-control"
              value={formData.people}
              required={true}
              placeholder="Party Size"
              onChange={changeHandler}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            <span className="oi oi-x" /> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            <span className="oi oi-check" /> Submit
          </button>
        </fieldset>
      </form>
    </main>
  );
}

export default ReservationCreate;
