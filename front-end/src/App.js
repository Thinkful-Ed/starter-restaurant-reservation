import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import './App.css'
import backgroundImage from './images/chris-liverani-oCsaxvGCehM-unsplash.jpg'


/**
 * Defines the root application component.
 * @returns {JSX.Element}
 */
function App() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  };
  
  return (
    <div className="app" style={backgroundStyle}>
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
