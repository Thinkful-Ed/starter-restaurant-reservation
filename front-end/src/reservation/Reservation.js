import React from "react";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import NewReservation from "./NewReservation";
import Seat from "./Seat";
import NotFound from "../layout/NotFound";

function Reservation() {
    const { path, url } = useRouteMatch()

    return (
        <Switch>
            <Route path={`${path}/new`} exact>
                <h3>Create a New Reservation</h3>
                <NewReservation />
            </Route>
            <Route path={`${path}/:reservation_id/seat`} exact>
                <Seat />
            </Route>
            <Route path={path}>
                <Redirect to={`${path}/new`}/>
            </Route>
        </Switch>
      );
}

export default Reservation