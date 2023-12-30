import React from "react"

import { Redirect, Route, Switch } from "react-router-dom"

import Dashboard from "../dashboard/Dashboard"
import NewReservation from "../reservations/NewReservation"
import SeatReservation from "../reservations/SeatReservation"
import NewTable from "../tables/NewTable"
import Search from "../search/Search"
import NotFound from "./NotFound"

import { today } from "../utils/date-time"
import useQuery from "../utils/useQuery"

/**
 * Defines all the routes for the application.
 *
 * @returns {JSX.Element}
 */

export default function Routes() {
  const query = useQuery()
  const queryResult = query.get("date") || today()

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={queryResult} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <NewReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
