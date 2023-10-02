import React, {useState, useEffect} from "react";

import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import {today} from "../utils/date-time";
import NewReservation from "../reservation/NewReservation";
import NewTable from "../table/NewTable";
import Seat from "../reservation/Seat";
import Search from "../search/Search";
import Edit from "../reservation/Edit";
import {listReservations, listTables} from "../utils/api";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");
  const [tables, setTables] = useState([]);

  const [loadTrigger, setLoadTrigger] = useState(0);

  //if there is no date query, todya will be default value of date.
  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tablesError, setTablesError] = useState(null);

  // useEffect(() => {
  //   console.log("loadTrigger changed: ", loadTrigger)
  //   async function loadDashboard() {
  //    // const abortController = new AbortController();
  //     setReservationsError(null);
  //     await listReservations({date}, abortController.signal)
  //       .then(setReservations)
  //       .catch(setReservationsError);
  //     await listTables(abortController.signal)
  //       .then(setTables)
  //       .catch(setTablesError);
  //     //return () => abortController.abort();
  //   }
  //   loadDashboard();

  // }, [loadTrigger, date]);
  useEffect(() => {
    async function loadDashboard() {
      const abortController = new AbortController();

      try {
        setReservationsError(null);

        const reservations = await listReservations(
          {date},
          abortController.signal
        );
        setReservations(reservations);

        const tables = await listTables(abortController.signal);
        setTables(tables);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setReservationsError(error);
          setTablesError(error);
        }
      }

      return () => abortController.abort();
    }

    loadDashboard();
  }, [loadTrigger, date]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={date}
          setDate={setDate}
          setTables={setTables}
          tables={tables}
          reservations={reservations}
          reservationsError={reservationsError}
          tablesError={tablesError}
          setLoadTrigger={setLoadTrigger}
        />
      </Route>
      <Route path="/reservations/new">
        <NewReservation
          setDate={setDate}
          setLoadTrigger={setLoadTrigger}
          date={date}
        />
      </Route>
      <Route path="/tables/new">
        <NewTable setLoadTrigger={setLoadTrigger} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <Seat
          setTables={setTables}
          tables={tables}
          date={date}
          setLoadTrigger={setLoadTrigger}
        />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <Edit setLoadTrigger={setLoadTrigger} setDate={setDate} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
