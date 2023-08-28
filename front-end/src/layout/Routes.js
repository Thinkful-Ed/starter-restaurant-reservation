import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import TableForm from "../Tables/TableForm";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationForm from "../reservations/reservation-form";
import useQuery from "../utils/useQuery";
import SeatReservation from "../Seats/SeatReservation";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const query = useQuery();
  const date = query.get("date") ? query.get("date") : today();

  
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal)
    .then((tables) => 
      tables.sort((tableA, tableB) => tableA.table_id - tableB.table_id)
    )
    .then(setTables)
    .catch(setTablesError)

    return () => abortController.abort();
  }
  
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard 
          date={date}
          reservations={reservations}
          reservationsError={reservationsError}
          loadDashboard={loadDashboard}
          tables={tables}
          />
      </Route>
      <Route path="/reservations/new">
        <ReservationForm />
      </Route>
      <Route path="/reseravtions/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route path="/tables/new">
        <TableForm loadDashboard={loadDashboard} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
