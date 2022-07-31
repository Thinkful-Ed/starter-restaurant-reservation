import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";

import NotFound from "./NotFound";

import Dashboard from "../dashboard/Dashboard";
import NewRes from "../reservations/NewRes";
import NewTable from "../tables/NewTable";
import Tables from "../tables/Tables";
import Seat from "../reservations/Seat";

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

      <Route path="/dashboard">
        <div className="container-flex">
          <div className="row col-md">
            <div className="col">
              <Dashboard date={date || today()} />
            </div>
            <div className="col">
              <Tables />
            </div>
          </div>
        </div>
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path={"/reservations/new"}>
        <NewRes today={today()} />
      </Route>

      <Route path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>

      <Route path={"/tables/new"}>
        <NewTable />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
