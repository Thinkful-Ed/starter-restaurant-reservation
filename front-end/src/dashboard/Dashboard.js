import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import {next, previous, today} from "../utils/date-time";
import useQuery from "../utils/useQuery";
import { Link, useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
// import LoadTables from "../Comps/LoadTables";
// import { Col, Row, Container, Button } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
// import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

const history = useHistory();
const [tables, setTables] = useState([]);

const newDate = useQuery().get("date") ?? date;

// async function cancelRes(reservationId) {
//   if (window.confirm("Do you want to cancel this reservation?")) {
//   try {
//   await cancelReservation(reservationId);
//   history.go();
//   } catch (error) {
//   setReservationsError(error);
//   }
//   }
//   }
  useEffect(()=>{
   async function loadDashboard() {
      const abortController = new AbortController();
      try{
        const reservationsFromAPI = await listReservations({ date: newDate }, abortController.signal);
        setReservations(reservationsFromAPI);
      } catch(error){
        if (error){
          setReservationsError(error)
        }
      }
      return () => abortController.abort();
      }

loadDashboard();
  }, [newDate]);

  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-3">Reservations for date : {newDate}</h4>
      </div>
       <div className="d-md-flex mb-3"> <Link to={`/dashboard?date=${previous(newDate)}`}><button className="btn btn-primary mr-2">
          Previous Day
        </button></Link>
        <Link to={`/dashboard?date=${today(date)}`}><button className="btn btn-success mr-2">
          Today
        </button></Link>
        <Link to={`/dashboard?date=${next(newDate)}`}>
        <button className="btn btn-secondary mr-2">
          Next Day
        </button></Link>
        </div>
      
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      <ReservationsList reservations={reservations} />
    </main>
  );
}

export default Dashboard;
