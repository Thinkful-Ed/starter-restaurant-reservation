import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationForm() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);
    const reservationDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00`
    );

    const errors = [];

    if (Date.now() > Date.parse(reservationDate)) {
      errors.push({
        message: `Reservation must be for a future date or time.`,
      });
    }

    if (reservationDate.getDay() == 2) {
      errors.push({
        message: `Periodic Tables is closed on Tuesdays. Sorry!`,
      });
    }

    setFormErrors(errors);

    createReservation(formData, abortController.signal)
      .then((_) => {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      })
      .catch((e) => console.log(e));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => <ErrorAlert error={error} />);

  return (
    <>
      {formErrors.length ? displayErrors : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="first_name">
            First Name:
          </label>
          <input
            required
            type="text"
            onChange={handleChange}
            value={formData.first_name}
            className="form-control"
            name="first_name"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="last_name">
            Last Name:
          </label>
          <input
            required
            type="text"
            onChange={handleChange}
            value={formData.last_name}
            className="form-control"
            name="last_name"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="mobile_number">
            Mobile Number:
          </label>
          <input
            required
            type="tel"
            onChange={handleChange}
            value={formData.mobile_number}
            className="form-control"
            name="mobile_number"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="reservation_date">
            Reservation Date:
          </label>
          <input
            required
            type="date"
            onChange={handleChange}
            value={formData.reservation_date}
            className="form-control"
            name="reservation_date"
          ></input>
        </div>{" "}
        <div className="mb-3">
          <label className="form-label" htmlFor="reservation_time">
            Reservation Time:
          </label>
          <input
            required
            type="time"
            onChange={handleChange}
            value={formData.reservation_time}
            className="form-control"
            name="reservation_time"
          ></input>
        </div>{" "}
        <div className="mb-3">
          <label className="form-label" htmlFor="people">
            Number of People:
          </label>
          <input
            required
            type="text"
            onChange={handleChange}
            value={formData.people}
            className="form-control"
            name="people"
          ></input>
        </div>
        <button className="btn btn-primary mx-2" type="submit">
          Submit
        </button>
        <button onClick={history.goBack} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </>
  );
}
