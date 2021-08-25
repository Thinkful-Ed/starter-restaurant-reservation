import React, { useEffect, useState } from 'react';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
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

  const content = reservations.map((res, i) => (
    <div key={i} className="d-flex">
      <div className="col-2">
        <p>{res.first_name}</p>
      </div>
      <div className="col-2">
        <p>{res.last_name}</p>
      </div>
      <div className="col-2">
        <p>{res.mobile_number}</p>
      </div>
      <div className="col-2">
        <p>{res.reservation_time}</p>
      </div>
      <div className="col-2">
        <p>{res.people}</p>
      </div>
    </div>
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <div className="mb-3">
        <button className="btn btn-secondary mr-2">previous</button>
        <button className="btn btn-secondary mr-2">next</button>
        <button className="btn btn-secondary">today</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="d-flex">
        <div className="col-2">
          <h5>First Name</h5>
        </div>
        <div className="col-2">
          <h5>Last Name</h5>
        </div>
        <div className="col-2">
          <h5>Mobile number</h5>
        </div>
        <div className="col-2">
          <h5>Reservation Time</h5>
        </div>
        <div className="col-2">
          <h5>Party Size</h5>
        </div>
      </div>
      <div>{content}</div>
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
