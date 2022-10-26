import React from "react";

function ReservationForm({submitHandler, cancelHandler, reservation, setReservation}) {
  
  
  const changeHandler = ({ target }) => {
    setReservation({ ...reservation, [target.name]: target.value });
  };

  const changeNumber = ({ target }) => {
    setReservation({ ...reservation, [target.name]: Number(target.value) });
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          First Name:
          <input
            onChange={changeHandler}
            value={reservation.first_name}
            type="text"
            id="first_name"
            name="first_name"
            required
          />
        </label>
        <label>
          Last Name:
          <input
            onChange={changeHandler}
            value={reservation.last_name}
            type="text"
            id="last_name"
            name="last_name"
            required
          />
        </label>
        <label>
          Mobile Number:
          <input
            onChange={changeHandler}
            value={reservation.mobile_number}
            placeholder="XXX-XXX-XXXX"
            type="tel"
            id="mobile_number"
            name="mobile_number"
            required
          />
        </label>
        <label>
          Reservation Date:
          <input
            onChange={changeHandler}
            value={reservation.reservation_date}
            type="date"
            id="reservation_date"
            name="reservation_date"
            required
          />
        </label>
        <label>
          Reservation Time:
          <input
            onChange={changeHandler}
            value={reservation.reservation_time}
            type="time"
            placeholder="HH:MM"
            id="reservation_time"
            name="reservation_time"
            required
          />
        </label>
        <label>
          Party Size:
          <input
            onChange={changeNumber}
            value={reservation.people}
            type="text"
            id="people"
            name="people"
            max="12"
            min="1"
            aria-label="Number of people"
            required
          />
        </label>
        <button onClick={cancelHandler}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReservationForm;
