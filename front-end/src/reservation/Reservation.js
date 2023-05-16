import React from "react";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import NewReservation from "./NewReservation";
import NotFound from "../layout/NotFound";

function Reservation() {
    const { path, url } = useRouteMatch()

    return (
        <Switch>
            <Route path={`${path}/new`} exact>
                <NewReservation />
            </Route>
            <Route path={path}>
                <div>This is the reservation route</div>
            </Route>
        </Switch>
      );
}

export default Reservation