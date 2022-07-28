import React, { useEffect, useState } from "react";
import { listReservations, listTables, removeReservation, cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ReservationDisplay from "../layout/ReservationDisplay"
import TableDisplay from "../layout/TableDisplay";
import { Link, useHistory } from "react-router-dom";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  let history = useHistory()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      console.log("reservations: ", reservations)
      
    // listTables({ date }, abortController.signal) //do I need to destructure date here?
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
      console.log("tables: ", tables)
    return () => abortController.abort();
  }

  function getToday(){
    history.push(`/dashboard`)    
  }

  function getYesterday(){
    let yesterday = previous(date)
    history.push(`/dashboard?date=${yesterday}`)    
  }

  function getTomorrow(){
    let tomorrow = next(date)
    history.push(`/dashboard?date=${tomorrow}`)    
  }

  function onFinish(table_id, reservation_id) {
    removeReservation(table_id, reservation_id).then(loadDashboard).catch(setTablesError);
  }

  function onCancel({reservation_id}) {
    const abortController = new AbortController();
    cancelReservation(reservation_id, abortController.signal).then(loadDashboard).catch(setReservationsError)
  };

  return (
    <>
      {/* <h1>Dashboard</h1> */}
      {/* <div className="row"> */}
        {/* <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="d-md-flex mb-3">
            <h4 className="box-title mb-0">Reservations for {date}</h4>
          </div>
          <ErrorAlert error={reservationsError} />
          <div className="btn-group" role="group" aria-label="navigation buttons">
            <button className="btn btn-secondary" onClick={getYesterday}><span className="oi oi-chevron-left" />&nbsp;Yesterday</button>
            <button className="btn btn-success" onClick={getToday}>Today </button>
            <button className="btn btn-primary" onClick={getTomorrow}>Tomorrow&nbsp;<span className="oi oi-chevron-right" /></button>
          </div>
          <ReservationDisplay onCancel={onCancel} reservations={reservations} />
        </div> */}

        {/* <div className="col-md-6 col-lg-6 col-sm-12">
          <ErrorAlert error={tablesError} />
          <TableDisplay tables={tables} onFinish={onFinish} />
        </div> */}
      {/* </div> */}

      <div className="padded col-lg-7 col-md-5 col-sm-12 col-xs-6 align-self-start m-3 card-main">
        <div className="text-center">
          <div>
            <div className="row p-0 justify-content-center">
              <div className="col-auto p-1">
                <h2>Reservations</h2>
              </div>
              <div className="col-auto plus-button p-1">
                <Link className="nav-link " to="/reservations/new">
                  <span className="oi oi-plus" />
                  &nbsp;
                </Link>
              </div>
            </div>

            <h6 className="my-2">
              Date: {date}
            </h6>
            <div className="mb-3">
              <button className="btn btn-secondary" onClick={getYesterday}><span className="oi oi-chevron-left" />&nbsp;Yesterday</button>
              <button className="btn btn-success" onClick={getToday}>Today </button>
              <button className="btn btn-primary" onClick={getTomorrow}>Tomorrow&nbsp;<span className="oi oi-chevron-right" /></button>
            </div>
            <div className="text-left">
              <ReservationDisplay onCancel={onCancel} reservations={reservations} />
              <ErrorAlert error={reservationsError} />
            </div>
          </div>
        </div>
      </div>

      <div className="padded col-lg-3 col-md-5 col-sm-12 col-xs-6 align-self-start m-3 card-main">
        <div className="text-center">
          <div className="row justify-content-center">
            <div className="col-auto p-1">
              <h2>Tables</h2>
            </div>
            <div className="col-auto plus-button p-1">
              <Link className="nav-link" to="/tables/new">
                <span className="oi oi-plus" />
                &nbsp;
              </Link>
            </div>
          </div>
          
          <TableDisplay tables={tables} onFinish={onFinish} />
          <ErrorAlert error={tablesError} />
        </div>
      </div>
    </>
  );
}
export default Dashboard;


{/* <main>
<h1>Dashboard</h1>
<div className="d-md-flex mb-3">
  <h4 className="mb-0">Reservations for {date}</h4>
</div>

<div>
  <button className="btn btn-secondary" onClick={getYesterday}>Yesterday</button>
  <button className="btn btn-success" onClick={getToday}>Today</button>
  <button className="btn btn-primary" onClick={getTomorrow}>Tomorrow</button>
</div>
<ErrorAlert error={reservationsError} />

<div className="p-3 mb-2 bg-light text-dark">
  <ReservationDisplay onCancel={onCancel} reservations={reservations} />
</div>

<div className="p-3 mb-2 bg-light text-dark">
  <TableDisplay tables={tables} onFinish={onFinish} />
</div>
</main> */}