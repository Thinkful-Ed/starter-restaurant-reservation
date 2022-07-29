import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import AddReservation from "./AddReservation";
import useQuery from "../utils/useQuery"
import AddTable from "./AddTable";
import ReservationIdSeat from "./ReservationIdSeat";
import Search from "./Search/SearchDisplay";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery() //initialize the useQuery hook
  // console.log(query)
  const date = query.get("date")
  // console.log("date: ", date)
  // const limit = query.get("limit")
  // console.log("limit: ", limit)

  // const myDate = new Date("2022-07-14")
  // console.log("my date: ", myDate.getDay() + 1)
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/search">
        <Search />
      </Route>

      <Route path="/reservations/:reservation_id/seat">
        <ReservationIdSeat />
      </Route>

      <Route path="/reservations/new">
        <AddReservation />
      </Route>
      
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/tables/new">
        <AddTable />
      </Route>
      
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>



      <Route path="/dashboard">
        {/* <Dashboard date={date} /> */}
        <Dashboard date={date ? date : today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
