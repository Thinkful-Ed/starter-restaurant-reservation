import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import ErrorAlert from "../layout/ErrorAlert";

import {
  createReservation,
  editReservation,
  listReservations,
} from "../utils/api";

export default function NewReservation({ loadDashboard, edit }) {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [reservationsError, setReservationsError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  useEffect(() => {
    if (edit) {
      if (!reservation_id) return null;

      loadReservations()
        .then((response) =>
          response.find(
            (reservation) =>
              reservation.reservation_id === Number(reservation_id)
          )
        )
        .then(fillFields);
    }

    function fillFields(foundReservation) {
      if (!foundReservation || foundReservation.status !== "booked") {
        return <p>Only booked reservations can be edited.</p>;
      }

      const date = new Date(foundReservation.reservation_date);
      const dateString = `${date.getFullYear()}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

      setFormData({
        first_name: foundReservation.first_name,
        last_name: foundReservation.last_name,
        mobile_number: foundReservation.mobile_number,
        reservation_date: dateString,
        reservation_time: foundReservation.reservation_time,
        people: foundReservation.people,
      });
    }

    async function loadReservations() {
      const abortController = new AbortController();
      return await listReservations(null, abortController.signal).catch(
        setReservationsError
      );
    }
  }, [edit, reservation_id]);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "people" ? Number(target.value) : target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    const foundErrors = [];
    console.log(edit);
    if (validateFields(foundErrors) && validateDate(foundErrors)) {
      if (edit) {
        editReservation(reservation_id, formData, abortController.signal)
          .then(loadDashboard)
          .then(() =>
            history.push(`/dashboard?date=${formData.reservation_date}`)
          )
          .catch(setApiError);
      } else {
        createReservation(formData, abortController.signal)
          .then(loadDashboard)
          .then(() =>
            history.push(`/dashboard?date=${formData.reservation_date}`)
          )
          .catch(setApiError);
      }
    }

    setErrors(foundErrors);

    return () => abortController.abort();
  }

  function validateFields(foundErrors) {
    for (const field in formData) {
      if (formData[field] === "") {
        foundErrors.push({
          message: `${field.split("_").join(" ")} cannot be left blank.`,
        });
      }
    }

    return foundErrors.length === 0;
  }

  function validateDate(foundErrors) {
    const reserveDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00.000`
    );
    const todaysDate = new Date();

    if (reserveDate.getDay() === 2) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed on Tuesdays.",
      });
    }

    if (reserveDate < todaysDate) {
      foundErrors.push({
        message: "Reservation cannot be made: Date is in the past.",
      });
    }

    if (
      reserveDate.getHours() < 10 ||
      (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is not open until 10:30AM.",
      });
    } else if (
      reserveDate.getHours() > 22 ||
      (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed after 10:30PM.",
      });
    } else if (
      reserveDate.getHours() > 21 ||
      (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM).",
      });
    }

    return foundErrors.length === 0;
  }

  const errorsJSX = () => {
    return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
  };

  return (
    <form>
      {errorsJSX()}
      <ErrorAlert error={apiError} />
      <ErrorAlert error={reservationsError} />

      <label className="form-label" htmlFor="first_name">
        First Name:&nbsp;
      </label>
      <input
        className="form-control"
        name="first_name"
        id="first_name"
        type="text"
        onChange={handleChange}
        value={formData.first_name}
        required
      />

      <label className="form-label" htmlFor="last_name">
        Last Name:&nbsp;
      </label>
      <input
        className="form-control"
        name="last_name"
        id="last_name"
        type="text"
        onChange={handleChange}
        value={formData.last_name}
        required
      />

      <label className="form-label" htmlFor="mobile_number">
        Mobile Number:&nbsp;
      </label>
      <input
        className="form-control"
        name="mobile_number"
        id="mobile_number"
        type="text"
        onChange={handleChange}
        value={formData.mobile_number}
        required
      />

      <label className="form-label" htmlFor="reservation_date">
        Reservation Date:&nbsp;
      </label>
      <input
        className="form-control"
        name="reservation_date"
        id="reservation_date"
        type="date"
        onChange={handleChange}
        value={formData.reservation_date}
        required
      />

      <label className="form-label" htmlFor="reservation_time">
        Reservation Time:&nbsp;
      </label>
      <input
        className="form-control"
        name="reservation_time"
        id="reservation_time"
        type="time"
        onChange={handleChange}
        value={formData.reservation_time}
        required
      />

      <label className="form-label" htmlFor="people">
        Party Size:&nbsp;
      </label>
      <input
        className="form-control"
        name="people"
        id="people"
        type="number"
        min="1"
        onChange={handleChange}
        value={formData.people}
        required
      />

      <button
        className="btn btn-primary m-1"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        className="btn btn-danger m-1"
        type="button"
        onClick={history.goBack}
      >
        Cancel
      </button>
    </form>
  );
}
