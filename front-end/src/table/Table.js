import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router";
import NewTable from "./NewTable";

function Table() {
    const { path } = useRouteMatch()

    return <div>
        <Switch>
            <Route path={`${path}/new`} exact>
                <NewTable />
            </Route>
            <Route path={path}>
                <Redirect to={`${path}/new`}/>
            </Route>
        </Switch>
    </div>
}

export default Table