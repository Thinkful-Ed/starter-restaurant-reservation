/** @format */

import React, { Fragment, useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import ReservationForm from "../reservations/ReservationForm";
import SeatForm from "../seat/SeatForm";
import Search from "../search/Search";
import TableForm from "../tables/TableForm";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import Menu from "./Menu";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
	const query = useQuery();
	const [date, setDate] = useState(query.get("date") || today());

	return (
		<Fragment>
			<Menu />
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
					<Dashboard
						date={date}
						setDate={setDate}
					/>
				</Route>

				<Route
					exact={true}
					path="/reservations/:reservation_id/seat">
					<SeatForm />
				</Route>

				<Route
					exact={true}
					path={["/reservations/new", "/reservations/:reservation_id/edit"]}>
					<ReservationForm setDate={setDate} />
				</Route>

				<Route path="/tables/new">
					<TableForm />
				</Route>

				<Route path="/search">
					<Search />
				</Route>

				<Route>
					<NotFound />
				</Route>
			</Switch>
		</Fragment>
	);
}

export default Routes;
