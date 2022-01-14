import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import ReservationForm from "../reservations/ReservationForm";
import CreateTable from "../tables/CreateTable";
import SeatReservation from "../reservations/SeatReservation";
import Search from "../search/Search";

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationForm />
      </Route>
      <Route exact={true} path="/reservations/:reservationId/edit">
        <ReservationForm />
      </Route>
      <Route exact={true} path="/reservations/:reservationId/seat">
        <SeatReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/tables/new">
        <CreateTable />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;