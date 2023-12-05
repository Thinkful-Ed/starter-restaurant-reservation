import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation, editReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines reservation form for creating a new reservation.
 * @returns {JSX.Element}
 */

function ReservationForm({
  initialFormData,
  isEditing = false,
  reservationsErrors,
  setReservationsErrors,
  reservation_id = false,
}) {
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (initialFormData) {
    }
    setFormData(initialFormData);
  }, [initialFormData]);

  const onChangeHandler = (event) => {
    const property = event.target.name;
    const value =
      property === "people" ? Number(event.target.value) : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    if (isEditing) {
      editReservation(formData, reservation_id, abortController.signal)
        .then()
        .then(() => {
          history.goBack();
        })
        .catch(setReservationsErrors);
    } else {
      createReservation(formData, abortController.signal)
        .then(() => {
          history.push(`/dashboard?date=${formData.reservation_date}`);
        })
        .catch(setReservationsErrors);
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <ErrorAlert error={reservationsErrors} />
      <h1>Reservation Form</h1>
      <form>
        <label htmlFor="first_name">
          First Name
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={onChangeHandler}
            value={formData.first_name ? formData.first_name : ""}
          />
        </label>
        <label htmlFor="last_name">
          Last name
          <input
            type="text"
            id="last_name"
            name="last_name"
            onChange={onChangeHandler}
            value={formData.last_name ? formData.last_name : ""}
          />
        </label>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          onChange={onChangeHandler}
          value={formData.mobile_number ? formData.mobile_number : ""}
        />
        <label htmlFor="reservation_date">Date of Reservation</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          onChange={onChangeHandler}
          value={formData.reservation_date ? formData.reservation_date : ""}
        />
        <label htmlFor="reservation_time">Time of Reservation</label>
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          onChange={onChangeHandler}
          value={formData.reservation_time ? formData.reservation_time : ""}
        />
        <label htmlFor="people">Number of People in the party</label>
        <input
          type="number"
          min="0"
          id="people"
          name="people"
          onChange={onChangeHandler}
          value={formData.people ? String(formData.people) : ""}
        />
        <div>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
