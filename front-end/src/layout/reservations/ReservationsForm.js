import { useState } from "react";

function ReservationsForm({
  onSubmit,
  onCancel,
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  },
}) {
  const [reservation, setReservation] = useState(initialState);

  function firstNameChange({ target: { name, value } }) {
    setReservation((previousRes) => ({
      ...previousRes,
      [name]: value,
    }));
  }

  function lastNameChange({ target: { name, value } }) {
    setReservation((previousRes) => ({
      ...previousRes,
      [name]: value,
    }));
  }
  function numberChange({ target: { name, value } }) {
    setReservation((previousRes) => ({
      ...previousRes,
      [name]: value,
    }));
  }

  function dateChange({ target: { name, value } }) {
    setReservation((previousRes) => ({
      ...previousRes,
      [name]: value,
    }));
  }

  function timeChange({ target: { name, value } }) {
    setReservation((previousRes) => ({
      ...previousRes,
      [name]: value,
    }));
  }

  function peopleChange({ target: { name, value } }) {
    setReservation((previousRes) => ({
      ...previousRes,
      [name]: value,
    }));
  }

  function submitHandler(evt) {
    evt.preventDefault();
    onSubmit(reservation);
  }

  return (
    <>
      <form onSubmit={submitHandler} className="reservation-edit">
        <fieldset>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="firstName"
              name="first_name"
              className="form-control"
              value={reservation.first_name}
              required={true}
              placeholder="First Name"
              onChange={firstNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="last_name"
              className="form-control"
              value={reservation.last_name}
              required={true}
              placeholder="Last Name"
              onChange={lastNameChange}
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
              value={reservation.mobile_number}
              required={true}
              placeholder="Number"
              onChange={numberChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              type="date"
              id="reservationDate"
              name="reservation_date"
              className="form-control"
              value={reservation.reservation_date}
              required={true}
              placeholder="Reservation Date"
              onChange={dateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              type="time"
              id="reservationTime"
              name="reservation_time"
              className="form-control"
              value={reservation.reservation_time}
              required={true}
              placeholder="Reservation Date"
              onChange={timeChange}
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
              value={reservation.people}
              required={true}
              placeholder="Party Size"
              onChange={peopleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onCancel}
          >
            <span className="oi oi-x" /> Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <span className="oi oi-check" /> Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default ReservationsForm;
