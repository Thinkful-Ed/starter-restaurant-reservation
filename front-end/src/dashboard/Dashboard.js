import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import Table from "../tables/Table";
import useQuery from "../utils/useQuery"
import { useHistory, Link } from "react-router-dom";

function Dashboard() {
  const query = useQuery();
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const date = query.get("date") || today();

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);
  // keeps url up to date even when using calendar input
  useEffect(() => {
    history.push(`dashboard?date=${date}`);
  }, [date, history]);

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  return (
    <main>
      <div className="dashboard-header">
        <h1 className="text-center">Dashboard</h1>
        <div className="mb-5">
          <h4 className="mb-0 text-center">
            Reservations for date: {date}
          </h4>

          {/* DATE BUTTONS */}
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Link className="btn btn-primary" to={`/dashboard?date=${previous(date)}`}>
              Previous Day
            </Link>
            <Link className="btn btn-primary" to={`/dashboard?date=${today()}`}>
              Today
            </Link>
            <Link className="btn btn-primary" to={`/dashboard?date=${next(date)}`}>
              Next Day
            </Link>
          </div>
        </div>
      </div>
      <ErrorAlert error={error} />
      <ReservationsList reservations={reservations} />

      {/* TABLES */}
      <h2 className="text-center dashboard-section-header">Tables</h2>
      {tables && (
        <div style={{display: 'flex'}}>
          {tables.map((table) => (
            <Table
              key={table.table_id}
              table={table}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Dashboard;