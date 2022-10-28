import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ReservationList from "../reservations/ReservationList";
import ReservationEdit from "../reservations/ReservationEdit";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import NotFound from "./NotFound";
import Search from "../search/search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date") || today();

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationList />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
      <ReservationEdit />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
