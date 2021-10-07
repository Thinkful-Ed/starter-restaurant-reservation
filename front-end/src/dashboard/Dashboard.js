import React, { useEffect, useState } from "react";
//import {useHistory} from "react-router-dom"
import { listReservations } from "../utils/api";
import formatReadableDate from "../utils/format-readable-date";
import useQuery from "../utils/useQuery"
import ErrorAlert from "../layout/ErrorAlert";
import DashboardDateNavigation from "./DashboardDateNavigation"
import ReservationsList from "./ReservationsList"
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [dashboardError, setDashboardError] = useState([])
  //const history = useHistory();
  const query = useQuery();

  const dateInUrl = query.get("date");
  if(dateInUrl){
    date = dateInUrl;
  }

  //  useEffect(()=> {
  //    if(!dateInUrl){
  //      history.push(`/dashboard?date=${date}`)
  //    }
  //  }, [query, history, dateInUrl, date])

  

  const reservationDate = formatReadableDate(date)
  console.log(reservationDate)
 

  //const readableDate = dateObject.toDateString();
  //useEffect(loadDashboard, [date])
  
  useEffect(()=> {
    const abortController = new AbortController();
    async function loadDashboard(){
      try{
        setDashboardError([])
        const response = await listReservations({date}, abortController.signal)
        setReservations(response)
      }
      catch(error){
        setReservations([])
        setDashboardError(error.message)
      }
    }
    loadDashboard();
    return ()=> abortController.abort();
  }, [date])
  
  
  
  // function loadDashboard() {
  //   if(dateInUrl !== date){
  //     history.push(`/dashboard?date=${date}`)
  //   }
  //   const abortController = new AbortController();
  //   setReservationsError(null);
  //   listReservations({ date }, abortController.signal)
  //     .then(setReservations)
  //     .catch(setReservationsError);
  //   return () => abortController.abort();
  // }
  
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {reservationDate}</h4>
          <DashboardDateNavigation date = {date}/>
          <ReservationsList reservations = {reservations}/>
      </div>
      <ErrorAlert error={dashboardError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
