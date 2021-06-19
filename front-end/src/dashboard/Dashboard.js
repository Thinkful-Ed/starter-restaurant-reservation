import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { today, previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { useHistory } from "react-router";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const query = useQuery().get("date");
  if (query) date = query;
  const history = useHistory();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleTodaysDate = () => {
    history.push(`dashboard?date=${today()}`);
  };
  const handlePreviousDate = () => {
    history.push(`dashboard?date=${previous(date)}`);
  };
  const handleNextDate = () => {
    history.push(`dashboard?date=${next(date)}`);
  };

  const controlButtons = () => {
    return (
      <div
        className="btn-group btn-group-lg btn-block"
        aria-label="Today next and previous day buttons"
      >
        <button
          type="submit"
          className="btn btn-info"
          onClick={handleTodaysDate}
        >
          Today
        </button>
        <button type="submit" className="btn btn-info" onClick={handleNextDate}>
          Next
        </button>
        <button
          type="submit"
          className="btn btn-info"
          onClick={handlePreviousDate}
        >
          Previous
        </button>
      </div>
    );
  };
  const reservationCards = reservations
    .filter(({ reservation_date }) => reservation_date === date)
    .map(
      ({
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
      }) => {
        return (
          <div
            className="card border-success mb-3"
            style={{ maxWidth: "40rem" }}
            key={reservation_id}
          >
            <div className="card-header bg-transparent border-success">
              {reservation_date}
            </div>
            <div className="card-body text-success">
              <h5 className="card-title">{reservation_time}</h5>
              <p className="card-text">
                {first_name} {last_name}
              </p>
              <p className="card-text">Number of people: {people}</p>
            </div>
            <div className="card-footer bg-transparent border-success">
              {mobile_number}
            </div>
          </div>
        );
      }
    );

  return (
    reservations.length && (
      <main>
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <div className="mb-3"> {controlButtons()}</div>
        <ErrorAlert error={reservationsError} />
        <div className="card-columns">{reservationCards}</div>
      </main>
    )
  );
}

export default Dashboard;
