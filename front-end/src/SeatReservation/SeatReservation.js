import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
const { listTables, readReservation } = require("../utils/api");

export default function SeatReservation() {
	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);
	const [reservation, setReservation] = useState({});
	const [reservationError, setReservationError] = useState(null);

	const { reservation_id } = useParams();

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
		<div>
			<h1>Seat Reservation</h1>
			<h3>
				{`ID: ${
					reservation.reservation_id
				} -- Party of: ${`${reservation.people}`}`}
			</h3>
			<h4>
				{`Name: ${reservation.last_name}, ${reservation.first_name}`}
			</h4>
			<h4>
				{`${reservation.reservation_date.split("T")[0]} @ ${
					reservation.reservation_time
				}`}
			</h4>
			<ErrorAlert error={tablesError} />
			<ErrorAlert error={reservationError} />
			<div>
				<form>
					<select
						className="form-select form-select-lg mb-3"
						aria-label=".form-select-lg example"
						name="table_id"
					>
						<option selected>Select A Table</option>
						{tableListOptions}
					</select>
					<div>
						<button className="btn btn-danger">Cancel</button>
						<button className="btn btn-primary">Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}
