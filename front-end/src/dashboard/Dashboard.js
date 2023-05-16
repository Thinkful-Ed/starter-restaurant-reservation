import React, { useEffect, useState } from "react";
import { useParams, Switch, Route, useRouteMatch } from "react-router";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardList from "./DashboardList";

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
          <Route path={`${path}/:reservationDate`}>
            <DashboardList date={date}/>
          </Route>
          <Route path={`${path}`}>
            <DashboardList date={date}/>
          </Route>
        </Switch>
    </main>
  );
}

export default Dashboard;
