import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery"
import { today, previous, next } from "../utils/date-time";
import { Link } from "react-router-dom";
import ReservationList from "../reservations/ReservationList"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({error, setError}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  let date = useQuery().get("date");

  if (!date) {
    date = today();
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

  console.log(reservations)

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for: {date} </h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row justify-content-center">
        <div className="col">
          <div className="d-flex justify-content-center"> {/* Container for buttons */}
            <Link to={`dashboard?date=${previous(date)}`} className='btn btn-primary mr-2'>
              Previous Day
            </Link>
            <Link to={`dashboard`} className='btn btn-primary mr-2'>
              Today
            </Link>
            <Link to={`dashboard?date=${next(date)}`} className='btn btn-primary mr-2'>
              Next Day
            </Link>
          </div>
        </div>
      </div>
      <div>
      </div>
      <div className="mt-3">
        <ReservationList reservations={reservations} loadDashboard={loadDashboard} setError={setError}/>
      </div>
    </main>
  );
}

export default Dashboard;
