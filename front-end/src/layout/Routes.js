import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import TableCreate from "../table/TableCreate";
import ReservationCreate from "../reservations/ReservationCreate";
// import SeatReservation from "../reservations/SeatReservation";
// import ReservationEdit from "../reservations/ReservationEdit";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";

// import Search from "../search/Search";

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

      {/* <Route exact={true} path="/reservations/:reservation_id/seat">
         <SeatReservation />
      </Route>

      <Route exact={true} path="/reservations/:reservation_id/edit">
         <ReservationEdit />
      </Route> */}

      <Route exact={true} path="/dashboard">
        <Dashboard date={date} />
      </Route>

      <Route exact={true} path='/tables/new'>
        <TableCreate />
      </Route>

      {/* <Route exact={true} path="/search">
        <Search />
      </Route> */}

            <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}

export default Routes;