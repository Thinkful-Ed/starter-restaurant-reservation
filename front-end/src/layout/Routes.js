import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationCreate from "../reservations/ReservationCreate";
import useQuery from "../utils/useQuery";
import TableCreate from "../tables/TableCreate";
import TableUpdate from "../tables/TableUpdate";
import SeatReservationForm from "../forms/SeatReservationForm";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query =useQuery();
  const date = query.get("date") || today();

  return (
    <Switch>
     
      <Route exact={true} path="/">
        <Redirect to={`/dashboard?date=${today()}`} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={`/dashboard?date=${today()}`} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationCreate />
      </Route>

      <Route path="/reservations/:reservation_id/seat">
         <SeatReservationForm />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route exact={true} path="/tables/new">
        <TableCreate />
      </Route>
      <Route path="/tables/:table_id/new">
        <TableUpdate />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;