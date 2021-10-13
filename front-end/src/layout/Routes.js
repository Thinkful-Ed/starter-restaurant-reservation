import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../reservations/NewReservation";
import Reservations from "../reservations/Reservations";
import Tables from "../tables/Tables";
import SeatReservation from "../reservations/SeatReservation";
import NewTable from "../tables/NewTable";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>

      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
    
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/reservations">
        <Reservations />
      </Route>

      <Route path="/tables/new">
        <NewTable />
      </Route>

      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}

export default Routes;
