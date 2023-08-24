import React, { useState } from "react";
import ReserveTable from "../reservations/ReserveTable";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import EditReservation from "../reservations/EditReservation";
import TablesCreate from "../tables/TablesCreate";
import SeatReservation from "../reservations/SeatReservation";

function Routes() {
  const [error, setError] = useState(null);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/reservations">
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard">
        <Dashboard error={error} setError={setError} />
      </Route>
      <Route exact path="/reservations/new">
        <ReserveTable />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
        <EditReservation error={error} setError={setError} />
      </Route>
      <Route path="/tables/new">
				<TablesCreate />
			</Route>
      <Route path="/reservations/:reservation_id/seat">
				<SeatReservation />
			</Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
