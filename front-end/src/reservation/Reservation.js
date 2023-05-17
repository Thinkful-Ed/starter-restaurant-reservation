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
            <Route path={`${path}/:reservation_id/seat`} exact>
                <div>this is the reservation seat page</div>
            </Route>
            <Route path={path}>
                <Redirect to={`${path}/new`}/>
            </Route>
        </Switch>
      );
}

export default Reservation