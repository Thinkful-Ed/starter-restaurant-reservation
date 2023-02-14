import React, { useEffect, useState } from "react";
import { listReservations, listTables, deleteTable, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link, useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";


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
  
  let history = useHistory();
  

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables, [])

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }
  

  function clickPrevious() {
    let previousDay = previous(date)
    history.push(`/dashboard?date=${previousDay}`);
  }

  function clickNext() {
    let nextDay = next(date)
    history.push(`/dashboard?date=${nextDay}`)
  }

  function finisable(table){
    if(table.reservation_id){
      return (
        <button 
          onClick={handleFinish} 
          value={table.table_id} 
          data-table-id-finish={table.table_id}>
          Finish
        </button>
      )
    }
  }

  const handleFinish = async (event) => {
    event.preventDefault()
    if(window.confirm('Is this table ready to seat new guests? \n \nThis cannot be undone.')) {
      try{
        await finishTable(event.target.value);
        loadTables();
        loadDashboard();
      }
      catch(error){
        console.log(error);
      }
    }
  }


  const mappedTables = tables.map((table, index) => (
      <>
      <tr key={index}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>{table.reservation_id ? 'occupied' : 'free'}</td>
        <td>{finisable(table)}</td>
        </tr>
      </>
    ))
  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations.length > 0 ? (
        <table className = "table">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Reservation Date</th>
              <th>Reservation Time</th>
              <th>People</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td>{reservation.status}</td>

                <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                  <button type="button" Link to="/reservations/${reservation.reservation_id}/seat">Seat</button>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found for this date.</p>
      )}
      <button type="button" onClick={clickPrevious}>Previous</button>

      <Link to="/dashboard">
      <button type="button" Link to="/dashboard">Today</button>
      </Link>

      <button type="button" onClick={clickNext}>Next</button>
      <p>{date}</p>
      {/* {JSON.stringify(reservations)} */}

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <ErrorAlert error={tablesError} />
      <table className = "table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Finish</th>
          </tr>
        </thead>
        <tbody>
          {mappedTables}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
