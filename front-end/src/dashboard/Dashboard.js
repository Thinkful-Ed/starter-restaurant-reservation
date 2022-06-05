import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable } from "../utils/api";
// import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";
import TablesList from "./TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  // const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  function onFinish(table_id, reservation_id) {
    finishTable(table_id, reservation_id)
      .then(loadDashboard);
  }

  function onCancel(reservation_id){
    
  }

  console.log(reservations);

  return (
    <main>
      <div className="row">
        <div className="col">
          <h1>Dashboard</h1>
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ErrorAlert error={reservationsError} />
          <ErrorAlert error={tablesError} />
        </div>
      </div>
      <div className="row">
        {/* {JSON.stringify(reservations)} */}
        <ReservationList reservations={reservations} date={date} />
        <TablesList tables={tables} onFinish={onFinish}/>
      </div>
    </main>
  );
}

export default Dashboard;
