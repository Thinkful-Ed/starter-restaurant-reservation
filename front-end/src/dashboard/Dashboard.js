import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { next, previous } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDisplay from "../layout/ReservationDisplay";
import TableDisplay from "../layout/TableDisplay";
import {useHistory} from "react-router-dom";

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
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  function getPrevious(){
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function getToday(){
    history.push("/dashboard");
  }

  function getNext(){
    history.push(`dashboard?date=${next(date)}`);
  }

  

  return (
    <main>
      <h1>Dashboard</h1>

      <div className="btn-group btn-group-toggle mb-3" data-toggle="buttons">
        <label className="btn btn-info">
          <input type="radio" name="options" id="option1" onClick={getPrevious}/> Previous
        </label>
        <label className="btn btn-info active">
          <input type="radio" name="options" id="option2" onClick={getToday} /> Today
        </label>
        <label className="btn btn-info">
          <input type="radio" name="options" id="option3" onClick={getNext} /> Next
        </label>
      </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      
        <div className="row">
      <div className="col">
      <table className="table table-striped table-dark ">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">Guests</th>
            <th scope="col">Status</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            return <ReservationDisplay reservation={reservation} key={reservation.reservation_id} />;
          })}
        </tbody>
      </table>
      </div>
      <div className="col">
      <table className="table table-striped table-dark">
        <thead>
          <tr>
          <th scope="col">Table Id</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Free?</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>
        <tbody>
        {tables.map((table) => {
            return <TableDisplay table={table} key={table.table_id} loadDashboard={loadDashboard} />;
          })}
        </tbody>
      </table>
      </div>
      </div>

    </main>
  );
}

export default Dashboard;
