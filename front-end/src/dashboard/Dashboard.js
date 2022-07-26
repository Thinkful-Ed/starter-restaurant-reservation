import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import DashboardTablesList from "./DashboardTablesList";
import DashboardDateNav from "./DashboardDateNav";
import ReservationsList from "../ReservationsList/ReservationsList";
import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
	const [reservations, setReservations] = useState([]);
	const [tables, setTables] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);
	const [tablesError, setTablesError] = useState(null);
	const [date, setDate] = useState(today());

	const query = useQuery();

	useEffect(() => {
		const queryDateCheck = query.get("date");
		if (queryDateCheck) {
			setDate(queryDateCheck);
		} else {
			setDate(today());
		}
	}, [query]);

	useEffect(() => {
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date }, abortController.signal)
			.then((data) => {
				setReservations(data);
			})
			.catch(setReservationsError);
		return () => abortController.abort();
	}, [date]);

	useEffect(() => {
		const fetchTablesData = async () => {
			try {
				const abortController = new AbortController();
				let response = await listTables(abortController.signal);
				setTables(response);
			} catch (error) {
				setTablesError(error);
			}
		};
		fetchTablesData();
	}, []);

	return (
		<main className="container-fluid">
			<h1>Dashboard</h1>
			<div className="d-md-flex mb-3">
				<h4 className="mb-0">{`Reservation Date: ${date}`}</h4>
			</div>
			<DashboardDateNav date={date} />
			<ErrorAlert error={reservationsError} />
			<ErrorAlert error={tablesError} />
			<div className="card tables">
				<h3>Reservations</h3>
				<ReservationsList reservations={reservations} />
			</div>

			<div className="card tables">
				<h3>Table List</h3>
				<DashboardTablesList tables={tables} />
			</div>
		</main>
	);
}

export default Dashboard;
