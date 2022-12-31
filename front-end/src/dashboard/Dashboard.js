import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import TablesSection from "./TablesSection";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function handleTodayButtonClick() {
    history.push(`/dashboard?date=${today()}`);
  }

  function handlePreviousButtonClick() {
    history.push(`/dashboard?date=${previous(date)}`);
  }

  function handleNextButtonClick() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  // function handleResStatNull() {
  //   setStatus("booked");
  //   return <div></div>;
  // }

  // function handleChangeStatus(event, reservationStatus) {
  //   event.preventDefault();
  //   setStatus(reservationStatus);
  //   return
  // }

  return (
    <main>
      <h1>Dashboard</h1>
      <div>{date}</div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <button onClick={handlePreviousButtonClick}>Previous Date</button>
      <button onClick={handleTodayButtonClick}>Today</button>
      <button onClick={handleNextButtonClick}>Next Date</button>
      <ErrorAlert error={reservationsError} />
      <div>
        {reservations.map((reservation) => {
          return (
            <div key={reservation.reservation_id}>
              <span> {reservation.first_name} </span>
              <span> {reservation.last_name} </span>
              <span> {reservation.mobile_number} </span>
              <span> {reservation.reservation_date} </span>
              <span> {reservation.reservation_time} </span>
              <span> {reservation.people} </span>
              <div data-reservation-id-status={reservation.reservation_id}>
                RESERVATION STATUS {reservation.status || "booked"}
              </div>
              <div>
                {reservation.status === null && (
                  <a href={`/reservations/${reservation.reservation_id}/seat`}>
                    <button>Seat</button>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TablesSection />
    </main>
  );
}

export default Dashboard;
