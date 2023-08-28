import React from 'react';
import { useHistory } from 'react-router-dom';


export default function FormReservation({
  reservation,
  setReservation,
  submitHandler,
  isEditing = false,
}) {
  const history = useHistory();

  function changeHandler({ target: { name, value } }) {
    let newValue;
  
    if (name === 'people') {
      newValue = parseInt(value, 10);
    } else if (name === 'mobile_number') {
      // Remove non-numeric characters
      newValue = value.replace(/[^0-9-]/g, '');
    } else {
      newValue = value;
    }

    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: newValue,
    }));
  }

  return (
    <div className=' d-flex justify-content-center text-center'>
    <div className="panel panel-default w-25">
      <div className="panel-heading text-center">
        <h2>{isEditing ? 'Edit Reservation' : 'New Reservation'}</h2>
      </div>
      <div className="panel-body d-flex justify-content-center">
        <form onSubmit={submitHandler} className="w-100">
          
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              name="first_name"
              required={true}
              type="text"
              value={reservation.first_name}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              required={true}
              type="text"
              value={reservation.last_name}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              id="mobile_number"
              name="mobile_number"
              required={true}
              type="tel"
              value={reservation.mobile_number}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Date of Reservation</label>
            <input
              id="reservation_date"
              name="reservation_date"
              required={true}
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              value={reservation.reservation_date}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Time of Reservation</label>
            <input
              id="reservation_time"
              name="reservation_time"
              required={true}
              type="time"
              pattern="\d{2}:\d{2}"
              value={reservation.reservation_time}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Number of People</label>
            <input
              id="people"
              name="people"
              type="number"
              required={true}
              min="1"
              value={reservation.people}
              onChange={changeHandler}
              className="form-control"
            />
          </div>
          <div className="panel-footer d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              onClick={history.goBack}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
