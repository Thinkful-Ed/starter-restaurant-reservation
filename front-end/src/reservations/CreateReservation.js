import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: "",
    reservation_date: "",
    reservation_time: "",
  };

  const [newReservation, setNewReservation] = useState(initialFormState);
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "people") {
      value = Number(value);
    }
    setNewReservation({
      ...newReservation,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const formattedReservation = {
        ...newReservation,
        reservation_date: formatAsDate(newReservation.reservation_date),
      };
      await createReservation(formattedReservation);
      history.push(`/dashboard?date=${formattedReservation.reservation_date}`);
    } catch (error) {
      setReservationsError(error);
    }
    return abortController;
  };

  return (
    <div>
      <h1 className="p-4 m-4 text-center">Create a Reservation</h1>
      <form
        className="row g-3 p-4 m-4 flex w-75 mx-auto border border-secondary-subtle bg-light"
        onSubmit={handleSubmit}
      >
        <div className="col-md-6 p-2">
          <input
            name="first_name"
            className="form-control"
            placeholder="First Name "
            id="first_name"
            onChange={handleChange}
            value={newReservation.first_name}
          />
        </div>
        <div className="col-md-6 p-2">
          <input
            name="last_name"
            placeholder="Last Name"
            className="form-control"
            id="last_name"
            onChange={handleChange}
            value={newReservation.last_name}
          />
        </div>
        <div className="col-md-6 p-2">
          <input
            name="mobile_number"
            type="tel"
            placeholder="Phone Number"
            className="form-control"
            id="mobile_number"
            onChange={handleChange}
            value={newReservation.mobile_number}
          />
        </div>
        <div className="col-md-6 p-2">
          <input
            name="people"
            type="number"
            placeholder="Party Size"
            className="form-control"
            id="people"
            onChange={handleChange}
            value={newReservation.people}
          />
        </div>
        <div className="col-md-6 p-2">
          <input
            name="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            className="form-control"
            id="reservation_date"
            onChange={handleChange}
            value={newReservation.reservation_date}
          />
        </div>
        <div className="col-md-6 p-2">
          <input
            name="reservation_time"
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            className="form-control"
            id="reservation_time"
            onChange={handleChange}
            value={newReservation.reservation_time}
          />
        </div>

        <div className="col-6 p-2 d-flex justify-content-start">
          <button type="submit" className="btn btn-primary">
            Confirm Reservation
          </button>
        </div>
        <div className="col-6 p-2 d-flex justify-content-end">
          <button onClick={() => history.goBack()} className="btn btn-danger ">
            Cancel
          </button>
        </div>
      </form>
      <ErrorAlert error={reservationsError} />
    </div>
  );
}

export default CreateReservation;
