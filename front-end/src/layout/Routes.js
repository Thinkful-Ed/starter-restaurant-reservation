import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ReservationNew from "../reservations/ReservationNew";
import ReservationEdit from "../reservations/ReservationEdit";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import NotFound from "./NotFound";
import Search from "../search/search";
import TableForm from "../tables/TableForm";
import Seat from "../seat/seat";

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
        <ReservationNew />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
        <ReservationEdit />
      </Route>
      <Route exact path="/tables/new">
        <TableForm />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
