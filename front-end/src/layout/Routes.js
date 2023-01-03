import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../reservations/NewReservation";
import { useLocation } from "react-router-dom";
import NewTable from "../tables/NewTables";
import CurrentReservation from "../reservations/CurrentReservation";
import Search from "../dashboard/Search";
import EditReservation from "../reservations/EditReservation";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  return (
    <div className="routes-container">
      <Switch>
        <Route exact={true} path="/">
          <Redirect to={"/dashboard"} />
        </Route>
        <Route exact={true} path="/search">
          <Search />
        </Route>
        <Route exact={true} path="/tables/new">
          <NewTable />
        </Route>
        <Route exact={true} path="/reservations/:reservation_id/edit">
          <EditReservation />
        </Route>
        <Route exact={true} path="/reservations/:reservationId/seat">
          <CurrentReservation />
        </Route>
        <Route exact={true} path="/reservations/new">
          <NewReservation />
        </Route>
        <Route exact={true} path="/reservations">
          <Redirect to={"/dashboard"} />
        </Route>
        <Route path="/dashboard">
          <Dashboard date={query.get("date") || today()} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
