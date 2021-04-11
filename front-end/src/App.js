import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
// import 'bootstrap/dist/css/bootstrap.min.css';

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
    </Switch>
  );
}

export default App;
