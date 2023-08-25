import React, { useEffect, useState } from 'react';
import { listReservations, listTables } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';
import { previous, next, today } from '../utils/date-time';
import { useHistory } from 'react-router-dom';
import ReservationsList from './ReservationsList';
import TablesList from './TablesList';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
	const history = useHistory();
	const query = useQuery();
	const queryDate = query.get('date');
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);
	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);

	useEffect(loadDashboard, [queryDate]);

	function loadDashboard() {
		const abortControllerR = new AbortController();
		const abortControllerT = new AbortController();

		setReservationsError(null);
		setTablesError(null);

		Promise.all([
			listReservations({ date: queryDate || today() }, abortControllerR.signal)
				.then(setReservations)
				.catch(setReservationsError),
			listTables(abortControllerT.signal).then(setTables).catch(setTablesError),
		]);

		return () => {
			abortControllerR.abort();
			abortControllerT.abort();
		};
	}

	const handlePrevious = (event) => {
		event.preventDefault();
		const formattedPreviousDate = previous(date); // Use the `previous` function
		history.push(`/dashboard?date=${formattedPreviousDate}`);
	};

	const handleNext = (event) => {
		event.preventDefault();
		const formattedNextDate = next(date); // Use the `next` function
		history.push(`/dashboard?date=${formattedNextDate}`);
	};

	const handleToday = (event) => {
		event.preventDefault();

		history.push(`/dashboard?date=${today()}`);
	};

	return (
		<main>
			<div className="text-center">
				<h1>Dashboard</h1>
				<div className="card d-md-flex mb-3">
					<div className=" card-header mb-0">
						<h4>Reservations for {queryDate || today()}</h4>
						<button className="" onClick={handlePrevious}>
							Previous
						</button>
						<button className="" onClick={handleToday}>
							Today
						</button>
						<button className="" onClick={handleNext}>
							Next
						</button>
					</div>
					<ReservationsList
						reservations={reservations}
						date={queryDate || today()}
					/>
					<TablesList tables={tables} />
				</div>
				<ErrorAlert error={reservationsError} />
				<ErrorAlert error={tablesError} />
			</div>
		</main>
	);
}

export default Dashboard;
