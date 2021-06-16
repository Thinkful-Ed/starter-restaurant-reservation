import { useState } from "react";
import { useHistory } from "react-router-dom";
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const DEFAULT_RESERVATION_STATE = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: 1,
};

function NewReservation() {
  const history = useHistory();
  const [reservation, setReservation] = useState(DEFAULT_RESERVATION_STATE);
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = reservation;
  console.log(reservation);

  function handleChange({ target: { name, value } }) {
    setReservation({ ...reservation, [name]: value });
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const body = {
        data: {
          first_name,
          last_name,
          mobile_number,
          reservation_date,
          reservation_time,
          people,
        },
      };
      await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      history.goBack();
    } catch (error) {
      console.error(error.message);
    }
  };

  function cancel() {
    history.goBack();
  }

  return (
    <div className="conatiner">
      <h4>Make a reservation</h4>
      <form onSubmit={submitHandler}>
        <div className="row g-2">
          <div className="col-md">
            <label htmlFor="first_name">First Name</label>
            <input
              className="form-control"
              id="first_name"
              name="first_name"
              type="text"
              required={true}
              value={first_name}
              placeholder="First name"
              aria-label="First name"
              onChange={handleChange}
            />
          </div>
          {/* Form input */}
          <div className="col-md">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="form-control"
              id="last_name"
              name="last_name"
              type="text"
              required={true}
              value={last_name}
              placeholder="Last name"
              aria-label="Last name"
              onChange={handleChange}
            />
          </div>
          {/* Form input */}
        </div>
        {/* Form Group */}
        <div className="row g-2">
          <div className="col-md">
            <label htmlFor="last_name">Mobile number</label>
            <input
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              type="text"
              required={true}
              value={mobile_number}
              placeholder="Mobile number"
              aria-label="Mobile number"
              onChange={handleChange}
            />
          </div>
          {/* Form input */}
          <div className="col-md">
            <label htmlFor="people">Number of people</label>
            <input
              className="form-control"
              id="people"
              name="people"
              type="text"
              required={true}
              placeholder="Number of people"
              aria-label="Number of people"
              defaultValue="1"
              onChange={handleChange}
            />
          </div>
          {/* Form input */}
        </div>
        {/* Form Group */}
        <div className="row g-2">
          <div className="col-md">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              className="form-control"
              id="reservation_date"
              name="reservation_date"
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="YYYY-MM-DD"
              required={true}
              defaultValue={reservation_date}
              aria-label="Reservation date"
              onChange={handleChange}
            />
          </div>
          {/* Form input */}
          <div className="col-md">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              type="time"
              pattern="[0-9]{2}:[0-9]{2}"
              placeholder="HH:MM"
              required={true}
              defaultValue={reservation_time}
              aria-label="Reservation time"
              onChange={handleChange}
            />
          </div>
          {/* Form input */}
        </div>
        {/* Form Group */}
        <div className="d-flex">
          <button type="submit" className="btn btn-primary ml-1 mt-2">
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-danger ml-1 mt-2"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
        {/* Button Group */}
      </form>
    </div>

    /* Container */
  );
}
export default NewReservation;
