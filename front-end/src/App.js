import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Layout from "./layout/Layout";

/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
      <Route path="/new">
        <Dashboard />
      </Route>
    </Switch>
  );
}

export default App;
