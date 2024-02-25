import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservationForm from "../components/NewReservationForm";
import NewTableForm from "../components/NewTableForm"; 
import SeatReservation from "../components/SeatReservation"; 
import { today } from "../utils/date-time";
import SearchReservations from '../components/SearchReservations';

 

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/reservations/new">
        <NewReservationForm />
      </Route>
      <Route path="/tables/new">
        <NewTableForm /> 
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation /> 
      </Route>
      <Route path="/search">
    <SearchReservations />
</Route>
<Route path="/reservations/:reservation_id/edit">
        <NewReservationForm /> 
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;