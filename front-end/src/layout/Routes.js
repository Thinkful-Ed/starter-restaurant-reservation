import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import CreateReservation from "../CreateReservation/CreateReservation";
import EditReservation from "../EditReservation/EditReservation";
import CreateTable from "../CreateTable/CreateTable";
import SeatReservation from "../SeatReservation/SeatReservation";
import NotFound from "./NotFound";
import Search from "../Search/Search";

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
			<Route exact={true} path="/">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route exact={true} path="/reservations">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route exact path="/reservations/new">
				<CreateReservation />
			</Route>
			<Route exact path="/reservations/:reservation_id/seat">
				<SeatReservation />
			</Route>
			<Route exact path="/reservations/:reservation_id/edit">
				<EditReservation />
			</Route>
			<Route exact path="/tables/new">
				<CreateTable />
			</Route>
			<Route path="/dashboard">
				<Dashboard />
			</Route>
			<Route path="/search">
				<Search />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default Routes;
