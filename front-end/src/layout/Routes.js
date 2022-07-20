import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import AddReservation from "./AddReservation";
import useQuery from "../utils/useQuery"

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

      <Route path="/reservations/new">
        <AddReservation />
      </Route>
      
      <Route exact={true} path="/reservations">
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
