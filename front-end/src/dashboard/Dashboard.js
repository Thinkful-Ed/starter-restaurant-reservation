import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [searchDate, setSearchDate] = useState(date);

  const queryParams = new URLSearchParams(window.location.search);
  const paramDate = queryParams.get("date");
  console.log("paramDate", paramDate);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(paramDate ? { paramDate } : { date }, abortController.signal)
      .then((data) => {
        setReservations(data);
        setSearchDate(date);
      })
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadDashboardWithNewDate(direction) {
    const abortController = new AbortController();
    setReservationsError(null);

    if (direction === "previous") {
      const previousDate = previous(searchDate);
      console.log(previousDate);
      listReservations({ previousDate }, abortController.signal)
        .then((data) => {
          setReservations(data);
          setSearchDate(previousDate);
        })
        .catch(setReservationsError);
      return () => abortController.abort();
    } else if (direction === "next") {
      const nextDate = next(searchDate);
      console.log(nextDate);
      listReservations({ nextDate }, abortController.signal)
        .then((data) => {
          setReservations(data);
          setSearchDate(nextDate);
        })
        .catch(setReservationsError);
      return () => abortController.abort();
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <h5>Toggle Date</h5>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => loadDashboardWithNewDate("previous")}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => loadDashboard()}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => loadDashboardWithNewDate("next")}
        >
          Next
        </button>
      </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <h5>{searchDate}</h5>
      <ErrorAlert error={reservationsError} />
      {reservations.map((reservation) => (
        <div style={{ border: "1px solid black" }}>
          <div>{reservation.reservation_id}</div>
          <div>
            {reservation.first_name} {reservation.last_name}
          </div>
          <div>{reservation.mobile_number}</div>
          <div>{reservation.reservation_date}</div>
          <div>{reservation.reservation_time}</div>
          <div>{reservation.people}</div>
        </div>
      ))}
    </main>
  );
}

export default Dashboard;
