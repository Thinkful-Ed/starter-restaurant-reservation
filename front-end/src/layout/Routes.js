/** @format */

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import TableCreate from "../tables/TableCreate";
import ReservationCreate from "../reservations/ReservationCreate";
import ReservationEdit from "../reservations/ReservationEdit";
import ReservationSeat from "../reservations/ReservationSeat";
import ReservationSearch from "../reservations/ReservationSearch";

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
