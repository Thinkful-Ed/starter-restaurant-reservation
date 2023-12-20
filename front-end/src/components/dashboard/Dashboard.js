import React, { useEffect, useState, pageDate } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../../utils/api";
import ReservationList from "../../components/reservations/ReservationList";
import ErrorAlert from "../../layout/ErrorAlert";
import useQuery from "../../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery();
  const dateQuery = query.get("date");
  const [pageDate, setPageDate] = useState(dateQuery ? dateQuery : date);

  useEffect(loadDashboard, [date, pageDate]);
  const history = useHistory();

  const todayHandler = () => {
    setPageDate(date);
    history.push(`/dashboard?date=${date}`);
  };

  function loadDashboard() {
    const date = pageDate;
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
        <h4 className="mb-0">Reservations for date {pageDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
          <h2>Reservations</h2>
          <ReservationList reservations={reservations} />
        </div>
    </main>
  );
}

export default Dashboard;
