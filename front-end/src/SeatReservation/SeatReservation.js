import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
const { listTables, readReservation, updateTable } = require("../utils/api");

export default function SeatReservation() {
	const [tables, setTables] = useState([]);
	const [selectedTable, setSelectedTable] = useState(null);
	const [reservation, setReservation] = useState(null);

	const [tablesError, setTablesError] = useState(null);
	const [reservationError, setReservationError] = useState(null);
	const [seatReservationError, setSeatReservationError] = useState(null);

	const { reservation_id } = useParams();
	const history = useHistory();

	useEffect(() => {
		async function getTables() {
			try {
				const abortController = new AbortController();
				let response = await listTables(abortController.signal);
				setTables(response);
			} catch (error) {
				setTablesError(error);
			}
		}
		async function getReservation() {
			try {
				const abortController = new AbortController();
				let response = await readReservation(
					reservation_id,
					abortController.signal
				);
				//create readReservation function
				setReservation(response);
			} catch (error) {
				setReservationError(error);
			}
		}

		getTables();
		getReservation();
	}, [reservation_id]);

	const cancelHandler = () => {
		history.goBack();
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		const data = { reservation_id };
		try {
			const abortController = new AbortController();
			await updateTable(selectedTable, { data }, abortController.signal);
			history.push("/dashboard");
		} catch (error) {
			setSeatReservationError(error);
		}
	};

	const tableListOptions = tables.map((table, index) => {
		return (
			<option
				key={index}
				value={table.table_id}
				name={table.table_id}
			>{`${table.table_name} - ${table.capacity}`}</option>
		);
	});

	return (
		<div class="container-fluid">
			<h1>Seat Reservation</h1>
			<ErrorAlert error={seatReservationError} />
			<div>
				{reservation ? (
					<div
						className="card"
						style={{
							width: "300px",
							margin: "10px 0",
							padding: "10px",
						}}
					>
						<h3>{`ID: ${reservation.reservation_id}`}</h3>
						<h4>{`Party of: ${reservation.people}`}</h4>
						<h4>
							{`Name: ${reservation.last_name}, ${reservation.first_name}`}
						</h4>
						<h4>
							{`${reservation.reservation_date.split("T")[0]} @ ${
								reservation.reservation_time
							}`}
						</h4>
					</div>
				) : reservationError ? (
					<ErrorAlert error={reservationError} />
				) : (
					<p>Loading...</p>
				)}
			</div>

			<div>
				<ErrorAlert error={tablesError} />
				<form onSubmit={submitHandler} style={{ width: "300px" }}>
					<select
						onChange={(event) =>
							setSelectedTable(event.target.value)
						}
						className="form-select form-select-lg mb-3"
						aria-label=".form-select-lg example"
						name="table_id"
					>
						<option value="">Tables List</option>
						{tableListOptions}
					</select>
					<div>
						<button
							onClick={cancelHandler}
							className="btn btn-danger"
							style={{ margin: "5px" }}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-primary"
							style={{ margin: "5px" }}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
