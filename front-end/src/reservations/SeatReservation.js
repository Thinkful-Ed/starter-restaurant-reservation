import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { listTables, readReservation } from "../utils/api";
import { convertFromMilitary } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

export default function SeatReservation() {
	const initialFormState = { table_name: 0 };
	const history = useHistory();
	const { reservation_id } = useParams();

	const [formData, setFormData] = useState({ ...initialFormState });
	const [seatError, setSeatError] = useState(null);

	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);
	const [reservation, setReservation] = useState([]);
	const [reservationError, setReservationError] = useState(null);

	// LOAD tables and reservation on paint
	useEffect(() => {
		loadTables();
	}, []);
	useEffect(() => {
		setReservationError(null);
		readReservation(reservation_id)
			.then(setReservation)
			.catch(setReservationError);
	}, [reservation_id]);
	const loadTables = () => {
		const abortController = new AbortController();
		setTablesError(null);
		listTables(abortController.signal)
			.then(setTables)
			.catch(setTablesError);
		return () => abortController.abort();
	};

	// HANDLERS
	const handleChange = ({ target }) => {
		setFormData({
			table_name: target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/tables/${formData.table_name}/seat`,
				{ data: { reservation_id } },
			);
			await axios.put(
				`${process.env.REACT_APP_API_BASE_URL}/reservations/${reservation_id}/status`,
				{ data: { status: "seated" } },
			);
			history.push("/dashboard");
		} catch (err) {
			if (err.response) {
				setSeatError(err.response.data);
			}
		}
	};
	const handleCancel = () => {
		history.goBack();
	};

	// Build tables list
	const tablesList = tables.map((table, index) => (
		<option key={index} value={table.table_id}>
			{table.table_name} (Capacity: {table.capacity})
		</option>
	));

	return (
		<div className="component">
			<h1>Seat Reservation</h1>
			<h5>
				{reservation.first_name} {reservation.last_name},{" "}
				{convertFromMilitary(reservation.reservation_time)}
			</h5>
			<em>Party of {reservation.people}</em>
			<hr />
			<div className="form-component m-5">
				<form onSubmit={handleSubmit}>
					<div className="col col-12 col-md-7 form-group">
						<label htmlFor="table_name">Table Number:</label>
						<select
							name="table_name"
							className="form-control"
							aria-label="Select Table Number"
							onChange={handleChange}
							value={formData.table_name}
						>
							<option selected>Select a Table</option>
							{tablesList}
						</select>
					</div>
					<button
						type="submit"
						className="btn btn-outline-secondary m-2"
					>
						Submit
					</button>
				</form>
				<button
					onClick={handleCancel}
					className="btn btn-outline-secondary m-2"
				>
					Cancel
				</button>
				<ErrorAlert error={seatError} />
				<ErrorAlert error={tablesError} />
				<ErrorAlert error={reservationError} />
			</div>
		</div>
	);
}
