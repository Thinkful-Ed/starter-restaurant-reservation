import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";


// import ReservationsList from "../reservations/ReservationsList";
import Search from "../search/Search";
import Tables from "../tables/Tables";
import CreateReservation from "../reservations/CreateReservation";
import UpdateReservation from "../reservations/UpdateReservation";


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
        {/* <ReservationsList /> */}
      </Route>
      <Route exact={true} path="/reservations/:reservationId/edit">
        <UpdateReservation />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />

      </Route>
      <Route path="/dashboard">
        {/* <Dashboard date={today()} /> */}
        <Dashboard />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/tables">
        <Tables />
      </Route>
      <Route path="/tables/new">
        <Tables />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
