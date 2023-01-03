import { useHistory } from "react-router-dom";

function NewReservation({ reservation, handleChange, onSubmit }) {
  const history = useHistory();

  function handleCancel() {
    history.goBack();
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <div className="pb-1">
          <label htmlFor="first_name">First Name</label>
          <input
            name="first_name"
            id="first_name"
            type="text"
            required
            value={reservation.first_name}
            onChange={handleChange}
          ></input>
        </div>

        <div className="pb-1">
          <label htmlFor="last_name">Last Name</label>
          <input
            name="last_name"
            id="last_name"
            type="text"
            required
            value={reservation.last_name}
            onChange={handleChange}
          ></input>
        </div>

        <div className="pb-1">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            name="mobile_number"
            id="mobile_number"
            type="tel"
            required
            value={reservation.mobile_number}
            onChange={handleChange}
          ></input>
        </div>

        <div className="pb-1">
          <label htmlFor="reservation_date">Reservation date</label>
          <input
            name="reservation_date"
            id="reservation_date"
            type="date"
            required
            value={reservation.reservation_date}
            onChange={handleChange}
          ></input>
        </div>

        <div className="pb-1">
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            name="reservation_time"
            id="reservation_time"
            type="time"
            required
            value={reservation.reservation_time}
            onChange={handleChange}
          ></input>
        </div>

        <div className="pb-1">
          <label htmlFor="people">Number of people</label>
          <input
            name="people"
            id="people"
            type="number"
            required
            value={reservation.people}
            onChange={handleChange}
          ></input>
        </div>
      </fieldset>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default NewReservation;
