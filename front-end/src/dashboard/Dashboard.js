import React, { useEffect, useState } from 'react';
import { listReservations, listTables, finishTable } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';
import { previous, next, today } from '../utils/date-time';
import { useHistory } from 'react-router-dom';
import ReservationsList from './ReservationsList';
import TablesList from './TablesList';
import { updateReservationStatus } from '../utils/api';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Dashboard({ date }) {
	const history = useHistory();
	const query = useQuery();
	const queryDate = query.get('date');
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);
	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);
	const [finishError, setFinishError] = useState(null);
  const [cancelError, setCancelError] = useState(null);
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

	async function handleCancel(reservationId) {
	
		if (
			window.confirm(
				'Do you want to cancel this reservation? This cannot be undone.'
			)
		) {
			const abortController = new AbortController();
			const cancelled = 'cancelled';
			try {
				await updateReservationStatus(
					reservationId,
					cancelled,
					abortController.signal
				);
				loadDashboard(
					{ date: queryDate || today() },
					abortController.signal
				);
			} catch (error) {
				setCancelError(error);
			}
		}
	}

	async function handleFinish(event) {
		event.preventDefault();
		const abortController = new AbortController();
		const tableId = event.target.getAttribute('data-table-id-finish');
		
		if (
			window.confirm(
				'Is this table ready to seat new guests? This cannot be undone.'
			)
		) {
			try {
				await finishTable(tableId, abortController.signal);
				loadDashboard(
					{ date: queryDate || today() },
					abortController.signal
				);
			} catch (error) {
				setFinishError(error);
			}
		}
	}

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
						mobile_number={query.get('mobile_number')}
						handleCancel={handleCancel}
					/>
					<TablesList tables={tables} handleFinish={handleFinish} />
				</div>
				<ErrorAlert error={reservationsError} />
				<ErrorAlert error={tablesError} />
				<ErrorAlert error={finishError} />
				<ErrorAlert error={cancelError} />
			</div>
		</main>
	);
}



