import React from "react"

import { Redirect, Route, Switch, useLocation } from "react-router-dom"
import Dashboard from "../dashboard/Dashboard"
import NewReservation from "../reservations/NewReservation"
import NotFound from "./NotFound"
import { today } from "../utils/date-time"

/**
 * Defines all the routes for the application.
 *
 * @returns {JSX.Element}
 */

// Custom hook to retrieve the route query as a string
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Routes() {
  const query = useQuery()
  const queryResult = query.get("date") || today()
  // console.log("Query: ", queryResult)

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={queryResult} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
