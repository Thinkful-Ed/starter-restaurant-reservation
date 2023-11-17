import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currDate, setCurrDate] = useState(date);
  const location = useLocation();
  const history = useHistory();
  const dateParam = new URLSearchParams(location.search).get("date");

  useEffect(() => {
    console.log(dateParam);
    if (dateParam) {
      setCurrDate(dateParam);
    }
  }, []);
  useEffect(loadDashboard, [currDate]);

  function loadDashboard() {
    history.push(`/dashboard/?date=${currDate}`);
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function buttonHandler(event) {
    switch (event.target.name) {
      case "previous":
        setCurrDate(previous(currDate));
        break;
      case "next":
        setCurrDate(next(currDate));
        break;
      default:
        setCurrDate(today());
        break;
    }
  }

  const tableRows = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
      </tr>
    );
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {currDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
            <th>Party Size</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <div>
        <button onClick={buttonHandler} name="previous">
          Previous
        </button>
        <button onClick={buttonHandler} name="today">
          Today
        </button>
        <button onClick={buttonHandler} name="next">
          Next
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
