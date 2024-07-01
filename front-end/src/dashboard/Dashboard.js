import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import DateButtons from "./DateButtons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {

const [reservations, setReservations] = useState([]);
const [reservationsError, setReservationsError] = useState([]);
const [tables, setTables] = useState([]);
const [tablesError, setTablesError] = useState([]);

function loadReservationsToDashboard() {
  const abortController = new AbortController();
  setReservationsError([]);
  listReservations({ date }, abortController.signal)
    .then(setReservations)
    .catch((error) => {
      const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred.";
      setReservationsError([errorMessage]);
    });
    
  return () => abortController.abort();
}
  
function loadTablesToDashboard() {
  const abortController = new AbortController();
  setTablesError([]);
  listTables( abortController.signal)
    .then(setTables)
    .catch((error) => {
      console.log("Dashboard - talbesError: ", error);
      setTablesError([error.message]);
    });
  return () => abortController.abort();
}
  useEffect(loadReservationsToDashboard, [date]);
  useEffect(loadTablesToDashboard,[]);

  const tableRowsForReservations = reservations.length ? (
    reservations.map((reservation) => {
      const reservation_id = reservation.reservation_id;
      return(
      <tr key={reservation_id}>
        <th scope="row">{reservation_id}</th>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td><a href={`/reservations/${reservation_id}/seat`} className="seat-button">
        Seat
      </a></td>
      </tr>
    )})

  ) : (
    <tr>
      <td colSpan="7" className="text-center">
        No reservations for this date.
      </td>
    </tr>
  );


  const rowsForTables =  tables.map((table) => (
      <tr key={table.table_id}>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.reservation_id ? "Occupied" : "Free"}</td>
      </tr>
    ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <DateButtons
            previous={`/dashboard?date=${previous(date)}`}
            today={`/dashboard?date=${today()}`}
            next={`/dashboard?date=${next(date)}`} 
      />
      <ErrorAlert errors={reservationsError} />
      <h2>Reservations</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">People</th>
            <th scope="col">Seat</th>
          </tr>          
        </thead>
        <tbody>
           {tableRowsForReservations}
        </tbody>
      </table>
      <ErrorAlert  errors={tablesError} />
      <h2>Tables</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
          </tr>    
        </thead>
        <tbody>
            {rowsForTables}
        </tbody>
      </table>
      
    </main>
  );
}

export default Dashboard;