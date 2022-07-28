import React from "react";
import Reservation from "./Reservation";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewRes from "../layout/NewRes";
import { useParams } from "react-router-dom";
import NewTable from "../tables/NewTable";
//get api url from environment variables


//routes for the application
//the dashboard is the default route
//the 404 page is the fallback route
//dashboard/new is the route for the create new reservation page
//dashboard/:date is the route for the dashboard page to view reservations for a specific date
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/dashboard/:date">
        <Dashboard date={useParams().date}/>
      </Route>
      <Route path="/reservations/new">
        <NewRes/>
      </Route>
      <Route path="/reservations/:reservation_id">
        <Reservation/>
      </Route>
      <Route path="/tables/new">
        <NewTable/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
