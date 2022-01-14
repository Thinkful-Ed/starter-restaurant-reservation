import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from 'query-string'
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {formatAsTime, formatAsDate} from "../utils/date-time";
import {useQuery} from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  let hey = useQuery();
  console.log(hey);
  let {search} = useLocation();
  const values = queryString.parse(search);

  if (values.date) {
    date = values.date;
  }
  
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
  
  const displayDate = formatAsDate(date);
  
  const display = reservations.map(reservation => {
    return (
      
      <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{formatAsTime(reservation.reservation_time)}</td>
      <td>{reservation.people}</td>
    </tr>
    )
  })

  // let buildTable = `<table class="table">${display}</table>`

  // `<table class="table">
  
  // </table>`
  
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {displayDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile number</th>
            <th scope="col">Reservation time</th>
            <th scope="col">Party size</th>
          </tr>
        </thead>
      {reservations.length ? display : `No reservations on this date`}

      </table>
    </main>
  );
}

export default Dashboard;
