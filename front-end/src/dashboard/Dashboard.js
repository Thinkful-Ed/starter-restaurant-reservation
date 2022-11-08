import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";
import TablesInfo from "../tables/TablesInfo";
import "./dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ todaysDate }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const history = useHistory();
  useEffect(()=>{
    history.push(`/dashboard?date=${todaysDate}`)
    loadDashboard()
  }, [todaysDate]);

  const { search } = useLocation();

  if (search) {
    todaysDate = search.replace("?date=", "");
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    async function loadReservations() {
      try {
        setReservations(
          await listReservations({ date: todaysDate }, abortController.signal)
        );
        setError(null);
      } catch (error) {
        setError(error);
      }
    }

    async function loadTables() {
      try {
        setTables(await listTables(abortController.signal));
        setError(null);
      } catch (error) {
        setError(error);
      }
    }
    loadReservations();
    loadTables();
    return () => abortController.abort();
  }

  const previousHandler = () => {
    history.push(`/dashboard?date=${previous(todaysDate)}`);
    loadDashboard();
  };

  const todayHandler = () => {
    history.push(`/dashboard?date=${today()}`);
    loadDashboard();
  };

  const nextHandler = () => {
    history.push(`/dashboard?date=${next(todaysDate)}`);
    loadDashboard();
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="buttons-container">
        <button className="btn-el" onClick={previousHandler}>Previous</button>
        <button className="btn-el" onClick={todayHandler}>Today</button>
        <button className="btn-el" onClick={nextHandler}>Next</button>
      </div>
      <div className="reservations-container">
        <h4>Reservations List:</h4>
        <ErrorAlert error={error} />

        {reservations.map((reservation) => {
          if (
            reservation.status !== "finished" &&
            reservation.status !== "cancelled"
          ) {
            return (
              <ReservationCard
                key={reservation.reservation_id}
                setError={setError}
                reservation={reservation}
                loadReservations={loadDashboard}
                index={reservation.reservation_id}
              />
            );
          }
        })}
      </div>

      <div className="tables-container">
        <h4>Tables List:</h4>
        <ErrorAlert error={error} />
        {tables.map((table) => (
          <TablesInfo
            key={table.table_id}
            table={table}
            setError={setError}
            loadDashboard={loadDashboard}
            setReservations={setReservations}
            index={table.table_id}
          />
        ))}
      </div>
    </main>
  );
}

export default Dashboard;
