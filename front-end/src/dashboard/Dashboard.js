import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
//import { useSearchParams } from "react-router-dom";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  //const [searchParams, setSearchParams] = useSearchParams();

  //const [dates, setDates] = useState(searchParams.get('date') ? searchParams.get('date') : today());
  const [dates, setDates] = useState(date);

  useEffect(loadDashboard, [dates]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ dates }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleClickPrevious = () => {
    setDates(previous(dates));
  };

  const handleClickNext = () => {
    setDates(next(dates));
  };

  const handleClickToday = () => {
    setDates(today());
  };

  const reservationsFiltered = reservations.filter((reservation)=> reservation.reservation_date === dates);

  const tableRows = reservationsFiltered.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.people}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
    </tr>
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations: {dates}</h4>
      </div>
      <div className="d-md-flex mb-3">
        <button type="button" className="btn btn-dark btn-small" onClick={handleClickPrevious}>Previous</button>
        <button type="button" className="btn btn-light btn-small" onClick={handleClickToday}>Today</button>
        <button type="button" className="btn btn-dark btn-small" onClick={handleClickNext}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Reservation ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Party Size</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
