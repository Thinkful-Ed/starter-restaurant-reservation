import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardButtons from "./DashboardButtons";
import ReservationList from "../reservations/ReservationList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
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

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
        <DashboardButtons date={date} setDate = {setDate}/>
        <ErrorAlert error={reservationsError} />
        <div>
          <div>
            <div>
              <h3>Reservations:</h3>
              <div>
                {reservations.length === 0 && (
                  <h5>
                    There are no reservations for {date}
                  </h5>
                )}
                {reservations.map((reservation) => (
                  <ReservationList
                    key={reservation.reservation_id}
                    reservation={reservation}
                    />
                ))}
              </div>
            </div>
            <div>
              <h3>Tables:</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
