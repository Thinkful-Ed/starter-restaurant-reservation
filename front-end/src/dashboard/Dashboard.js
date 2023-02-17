import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link, useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import { cancelReservation } from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";

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
    history.push(`/dashboard?date=${nextDay}`);
  }

  function finishable(table){
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
    event.preventDefault();
    if(window.confirm('Is this table ready to seat new guests? \n \nThis cannot be undone.')) {
      try{
        await finishTable(event.target.value);
        loadTables();
        loadDashboard();
      }
      catch(error){
        console.log(error);
        throw error;
      }
    }
  }


  const mappedTables = tables.map((table, index) => (
      <>
      <tr key={index}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>{table.reservation_id ? 'occupied' : 'free'}</td>
        <td>{finishable(table)}</td>
        </tr>
      </>
    ))
  

    const handleCancel = async (event) => {
      event.preventDefault();
      if(window.confirm(`Do you want to cancel this reservation? \n \nThis cannot be undone.`)) {
        try{
          await cancelReservation(event.target.value);
          loadTables();
          loadDashboard();
        }
        catch(error) {
          console.log(error)
          throw error
        }
      }
    }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>

      <ReservationsList
        reservations={reservations}
        reservationsError={reservationsError}
        handleCancel={handleCancel}
        />
      {/* <ErrorAlert error={reservationsError} />
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
              <th>Seat</th>
              <th>Edit</th>
              <th>Cancel</th>
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
                <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                <td>{reservation.status === 'seated' ? '' : 
                <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                  <button type="button">Seat</button>
                </Link>}
                </td>

                <td>{reservation.status === 'booked' ?
                  <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                  <button type="button">Edit</button>
                  </Link> : ''}
                </td>

                <td>
                  <button 
                    type="button" 
                    value={reservation.reservation_id}
                    data-reservation-id-cancel={reservation.reservation_id}
                    onClick={handleCancel}
                    >Cancel</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found for this date.</p>
      )} */}
      <button type="button" onClick={clickPrevious}>Previous</button>

      <Link to="/dashboard">
      <button type="button" Link to="/dashboard">Today</button>
      </Link>

      <button type="button" onClick={clickNext}>Next</button>
      {/* TODO remove extra code */}
      {/* <p>{date}</p> */}
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
