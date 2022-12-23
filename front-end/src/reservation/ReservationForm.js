import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { getDateInt, getTimeInt } from "../utils/timeInt";

function ReservationForm() {
  const history = useHistory();
  //   const { reservation_id } = useParams();

  const initalFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [reservation, setReservation] = useState({
    ...initalFormState,
  });
  const [error, setError] = useState(null);

  function getDateErrors() {
    const errorsArr = [];
    const today = new Date();
    const reservationDate = new Date(
      `${reservation.reservation_date} ${reservation.reservation_time}`
    );
    const timeNowInt = getTimeInt(today);
    const resTimeInt = getTimeInt(reservationDate);
    const dateNowInt = getDateInt(today);
    const resDateInt = getDateInt(reservationDate);

    if (reservationDate.getDay() === 2) {
      errorsArr.push(
        "The restaurant is closed on Tuesdays, select a different day of the week"
      );
    }
    if (resDateInt < dateNowInt) {
      errorsArr.push("Date must be in the future");
    }
    if (resTimeInt < 1030 || resTimeInt > 2130) {
      errorsArr.push("Time must be within business hours (10:30 - 21:30)");
    }
    if (dateNowInt === resDateInt && timeNowInt > resTimeInt) {
      errorsArr.push("Time of reservation has already passed today");
    }
    return errorsArr;
  }

  //   useEffect(() => {
  //     if (reservation_id) {
  //       setError(null);
  //       readReservation(reservation_id).then(setReservation).catch(setError);
  //     }
  //   }, [reservation_id]);

  const handleChange = ({ target }) => {
    let { value, name } = target;
    if (name === "people") {
      setReservation({
        ...reservation,
        [name]: Number(value),
      });
      return;
    }

    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const errorsArr = getDateErrors();
    const abortController = new AbortController();
    setError(null);
    if (!errorsArr.length) {
      createReservation(reservation, abortController.signal)
        .then(() =>
          history.push(`/dashboard?date=${reservation.reservation_date}`)
        )
        .catch((error) => {
          setError(error);
        });

      return () => abortController.abort();
    } else {
      const errorMessage = { message: `${errorsArr.join(", ").trim()}` };
      setError(errorMessage);
    }
  }

  return (
    <main>
      <ErrorAlert error={error} />
      <form name="reservation-form" onSubmit={handleSubmit}>
        <div className="form-group d-md-flex mb-3">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            name="first_name"
            type="text"
            onChange={handleChange}
            value={reservation.first_name}
            required
          />
        </div>
        <div className="form-group d-md-flex mb-3">
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            name="last_name"
            type="text"
            onChange={handleChange}
            value={reservation.last_name}
            required
          />
        </div>
        <div className="form-group d-md-flex mb-3">
          <label htmlFor="mobile-number">Mobile Number</label>
          <input
            id="mobile-number"
            name="mobile_number"
            type="text"
            onChange={handleChange}
            value={reservation.mobile_number}
            required
          />
        </div>
        <div className="form-group d-md-flex mb-3">
          <label htmlFor="reservation-date">Date</label>
          <input
            id="reservation-date"
            name="reservation_date"
            type="date"
            onChange={handleChange}
            value={reservation.reservation_date}
            required
          />
        </div>
        <div className="form-group d-md-flex mb-3">
          <label htmlFor="reservation-time">Time</label>
          <input
            id="reservation-time"
            name="reservation_time"
            type="time"
            onChange={handleChange}
            value={reservation.reservation_time}
            required
          />
        </div>
        <div className="form-group d-md-flex mb-3">
          <label htmlFor="people">People</label>
          <input
            id="people"
            name="people"
            type="number"
            min="1"
            onChange={handleChange}
            value={reservation.people}
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </main>
  );
}

export default ReservationForm;
