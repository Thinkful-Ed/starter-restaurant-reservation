/** @format */

import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationCreate from "./ReservationCreate";
import ReservationEdit from "./ReservationEdit";
import ReservationSeat from "./ReservationSeat";
import ReservationSearch from "./ReservationSearch";

/**
 * Defines all the routes for the application.
 *
 * @returns {JSX.Element}
 */
function Routes() {
	return (
		<Switch>
			<Route
				exact={true}
				path="/">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route
				exact={true}
				path="/reservations">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route path="/dashboard">
				<Dashboard date={today()} />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default Routes;
