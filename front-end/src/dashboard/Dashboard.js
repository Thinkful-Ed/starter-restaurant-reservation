/** @format */

import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { listReservations, listTables, finishTable } from "../utils/api";
import useQuery from "../utils/useQuery";
import { today, previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";
import TableList from "../tables/TableList";

/**
 * Defines the dashboard page, which shows reservations for a specific date
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
	const query = useQuery();
	const history = useHistory();
	const route = useRouteMatch();

	// to store the reservation data and to handle errors related to reservations
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);

	//to store the tables data and to handle errors related to the tables
	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);

	// to store the current date
	const [currentDate, setCurrentDate] = useState(date);

	useEffect(loadDashboard, [date]);

	// Fetch reservations and tables data for the current date.
	// Utilize utility functions listReservations() and listTables()
	function loadDashboard() {
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date }, abortController.signal)
			.then(setReservations)
			.catch(setReservationsError);
		listTables(abortController.signal).then(setTables).catch(setTablesError);
		return () => abortController.abort();
	}
	//update the date
	useEffect(() => {
		function getDate() {
			const getQueryDate = query.get("date");
			if (getQueryDate) {
				setCurrentDate(getQueryDate);
			} else {
				setCurrentDate(today());
			}
		}
		getDate();
	}, [query, route]);

	// finish button handlers
	const finishButtonHandler = async (event, table_id) => {
		event.preventDefault();
		setTablesError(null);

		const abortController = new AbortController();

		const confirmation = window.confirm(
			"Is this table ready to seat new guests? This cannot be undone.",
		);
		if (confirmation) {
			try {
				await finishTable(table_id, abortController.signal);
				history.push("/");
				loadDashboard();
			} catch (error) {
				setTablesError(error);
			}
		}
		return () => abortController.abort();
	};
	return (
		<main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom  d-md-flex">
				<div>
					<h1 className="h1">Dashboard</h1>
				</div>

				{/* buttons to change the date*/}

				<div className="btn-toolbar mb-2 mb-md-0">
					<div className="btn-group me-2">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => {
								history.push(`/dashboard?date=${previous(currentDate)}`);
								setCurrentDate(previous(currentDate));
							}}>
							Previous day
						</button>
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => {
								history.push(`/dashboard?date=${today(currentDate)}`);
								setCurrentDate(today(currentDate));
							}}>
							Today
						</button>
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => {
								history.push(`/dashboard?date=${next(currentDate)}`);
								setCurrentDate(next(currentDate));
							}}>
							Next day
						</button>
					</div>
				</div>
			</div>

			{/* reservations display*/}

			<div className="row d-md-flex mb-3">
				<h4 className="mb-10 text-center text-nowrap">
					Reservations for {currentDate}
				</h4>
				<ErrorAlert error={reservationsError} />
				{reservations ? (
					<ReservationList
						reservations={reservations}
						date={currentDate}
					/>
				) : (
					"Loading..."
				)}
			</div>

			{/* tables display*/}

			<div className="row d-md-flex mb-3">
				{tables ? (
					<TableList
						tables={tables}
						error={tablesError}
						clickHandler={finishButtonHandler}
					/>
				) : (
					"Loading..."
				)}
			</div>
		</main>
	);
}

export default Dashboard;
