import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router-dom"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  /**
   * The following code gets the query from the URL and if a date is provided,
   * sets the date fetched from the API.
   */
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]).get('date')
  if (query) {
    date = query
  }

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const content = reservations.map((res, index) => (
    <tbody>
      <tr key={index}>
        <td>{res.first_name}</td>
        <td>{res.last_name}</td>
        <td>{res.people}</td>
        <td>{res.mobile_number}</td>
        <td>{res.reservation_date}</td>
        <td>{res.reservation_time}</td>
      </tr>
    </tbody>
  ))

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>People</th>
            <th>Mobile Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
          </tr>
        </thead>
        {content}
      </table>
    </main>
  );
}

export default Dashboard;
