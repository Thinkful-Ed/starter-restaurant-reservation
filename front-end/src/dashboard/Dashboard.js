import React, { useEffect, useState } from "react";
import { listReservations, listTables, freeTableAndDeleteReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
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
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    setTablesError(null);
    listTables({ date }, abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  async function handleFinish(event) {
    const finishMessage = `Is this table ready to seat new guests? This cannot be undone.`
    const {target} = event;
    const abortController = new AbortController();
    console.log("target",event.target.dataset)
    if (window.confirm(finishMessage)) {
        try{
          await freeTableAndDeleteReservation(target.dataset);
          const tablesData = await listTables({date}, abortController.signal);
          setTables(tablesData);

          const reservationsData = await listReservations({date}, abortController.signal);
          setReservations(reservationsData);
        }catch(error){
          setTablesError(error);
        }
    }
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
        <TablesList tables={tables} handleFinish={handleFinish} />
      </div>
    </main>
  );
}

export default Dashboard;
