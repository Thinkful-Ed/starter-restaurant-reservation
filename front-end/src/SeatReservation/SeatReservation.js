import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
const { listTables } = require("../utils/api");

export default function SeatReservation() {
	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);

    const {reservation_id} = useParams()

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

		getTables();
	}, []);

	const tableListOptions = tables.map((table, index) => {
		return (
			<option
				key={index}
				value={table.table_id}
				name={table.table_id}
			>{`${table.table_name} - ${table.capacity}`}</option>
		);
	});
    console.log(reservation_id)
	return (
		<div>
			<h1>{`Seat Reservation: ${reservation_id}`}</h1>
			<ErrorAlert error={tablesError} />
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
