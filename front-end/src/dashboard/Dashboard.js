import React, { useEffect, useState } from 'react';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import useQuery from '../utils/useQuery';
import { previous, next, today } from '../utils/date-time';
import { useHistory } from 'react-router-dom';
import ReservationsList from './ReservationsList';

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

	useEffect(loadDashboard, [queryDate]);

	function loadDashboard() {
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date: queryDate || today() }, abortController.signal)
			.then(setReservations)
			.catch(setReservationsError);
		return () => abortController.abort();
	}

	const handlePrevious = (event) => {
		event.preventDefault();
		history.push(`/dashboard?date=${previous(date)}`);
	};

	const handleNext = (event) => {
		event.preventDefault();
		history.push(`/dashboard?date=${next(date)}`);
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
					<h4>
						Reservations for {queryDate || today()}
					</h4>
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
					<ReservationsList reservations={reservations} date={queryDate || today()} />
				</div>
				<ErrorAlert error={reservationsError} />
			</div>
		</main>
	);
}

export default Dashboard;
