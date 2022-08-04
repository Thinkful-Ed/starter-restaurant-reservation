import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./../Dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import CreateNewReservation from "../Reservations/CreateNewReservation";
import Table from "../Table/Table";
import TableSeat from "../Table/TableSeat";
import SearchBox from "../Search/SearchBox";
import EditReservation from "../Reservations/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <CreateNewReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date ? date : today()} />
      </Route>
      <Route path="/tables/new">
        <Table />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <TableSeat />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/search">
        <SearchBox />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
