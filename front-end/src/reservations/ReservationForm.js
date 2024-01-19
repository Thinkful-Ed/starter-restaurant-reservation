import { useState } from "react";
import { useHistory} from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import {createReservation} from "../utils/api";

export default function ReservationForm({ type }) {
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState({ ...initialState });

  function changeHandler({ target }) {
    const value =
      target.type === "number" ? Number(target.value) : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await createReservation({ data: formData });
      setFormData({ ...initialState });
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (err) {
      if (err.response)
        setReservationsError({ message: err.response.data.error });
      if (!err.response) setReservationsError(err);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="text-center pb-2">{type} Reservation</h2>
      <form action="" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="first_name" className="form-label">
            First name:
            <input
              className="form-control"
              id="first_name"
              type="text"
              name="first_name"
              onChange={changeHandler}
              value={formData.first_name}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="last_name" className="form-label">
            Last name:
            <input
              className="form-control"
              id="last_name"
              type="text"
              name="last_name"
              onChange={changeHandler}
              value={formData.last_name}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number" className="form-label">
            Phone number:
            <input
              className="form-control"
              id="mobile_number"
              type="tel"
              pattern="(1?)\(?([0-9]{3})?\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})"
              name="mobile_number"
              onChange={changeHandler}
              value={formData.mobile_number}
              required
            ></input>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date" className="form-label">
            Date:
            <input
              className="form-control"
              id="reservation_date"
              type="date"
              placeholder="YYYY-MM-DD"
              pattern="\d{4}-\d{2}-\d{2}"
              name="reservation_date"
              onChange={changeHandler}
              value={formData.reservation_date}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time" className="form-label">
            Time:
            <input
              className="form-control"
              id="reservation_time"
              type="time"
              placeholder="HH:MM"
              pattern="[0-9]{2}:[0-9]{2}"
              name="reservation_time"
              onChange={changeHandler}
              value={formData.reservation_time}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="people" className="form-label">
            Number of guests:
            <input
              className="form-control"
              id="people"
              type="number"
              min="1"
              max="22"
              name="people"
              onChange={changeHandler}
              value={formData.people}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-sm btn-info">
            Submit
          </button>
          <button
            className="mx-3 btn btn-sm btn-danger"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>
      </form>
      <ErrorAlert error={reservationsError} />
    </div>
  );
}
