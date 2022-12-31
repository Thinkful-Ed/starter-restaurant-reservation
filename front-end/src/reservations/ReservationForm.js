import { useHistory } from "react-router-dom";

function NewReservation({ reservation, handleChange, onSubmit }) {
  const history = useHistory();

  function handleCancel() {
    history.goBack();
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="first_name">First Name</label>
      <input
        name="first_name"
        id="first_name"
        type="text"
        value={reservation.first_name}
        onChange={handleChange}></input>

      <label htmlFor="last_name">Last Name</label>
      <input
        name="last_name"
        id="last_name"
        type="text"
        value={reservation.last_name}
        onChange={handleChange}></input>

      <label htmlFor="mobile_number">Mobile Number</label>
      <input
        name="mobile_number"
        id="mobile_number"
        type="tel"
        value={reservation.mobile_number}
        onChange={handleChange}></input>

      <label htmlFor="reservation_date">Reservation date</label>
      <input
        name="reservation_date"
        id="reservation_date"
        type="date"
        value={reservation.reservation_date}
        onChange={handleChange}></input>

      <label htmlFor="reservation_time">Reservation Time</label>
      <input
        name="reservation_time"
        id="reservation_time"
        type="time"
        value={reservation.reservation_time}
        onChange={handleChange}></input>

      <label htmlFor="people">Number of people</label>
      <input
        name="people"
        id="people"
        type="number"
        value={reservation.people}
        onChange={handleChange}></input>

      <button type="submit">Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default NewReservation;
