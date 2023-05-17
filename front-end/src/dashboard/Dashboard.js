import React, { useEffect, useState } from "react";
import { useParams, Switch, Route, useRouteMatch } from "react-router";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardReservationList from "./DashboardReservationList";
import DashboardTableList from "./DashboardTableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const { path, url } = useRouteMatch()

  return (
    <main>
      <h1>Dashboard</h1>
        <Switch>
          <Route path={`${path}`}>
            <DashboardReservationList date={date}/>
            <DashboardTableList />
          </Route>
        </Switch>
    </main>
  );
}

export default Dashboard;
