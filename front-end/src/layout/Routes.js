/** @format */

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

//import components
import Dashboard from "../dashboard/Dashboard";
import ReservationCreate from "../reservations/ReservationCreate";
import ReservationSeat from "../reservations/ReservationSeat";
import ReservationSearch from "../reservations/ReservationSearch";
import ReservationEdit from "../reservations/ReservationEdit";
import TableCreate from "../tables/TableCreate";
import NotFound from "./NotFound";

//import utility functions
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
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
			<Route path="/reservations/new">
				<ReservationCreate />
			</Route>
			<Route path="/reservations/:reservation_id/edit">
				<ReservationEdit />
			</Route>
			<Route path="/reservations/:reservation_id/seat">
				<ReservationSeat />
			</Route>
			<Route path="/tables/new">
				<TableCreate />
			</Route>
			<Route path="/search">
				<ReservationSearch />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default Routes;
