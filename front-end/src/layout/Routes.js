import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationCreate from "../reservations/ReservationCreate";
import useQuery from "../utils/useQuery";
import TableAssign from "../tables/TableAssign";

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
      <Route exact={true} path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route exact={true} path="/tables/new">
        <TableAssign />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;