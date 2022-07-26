import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { deleteTableReservation } from "../utils/api";

export default function DashboardTablesList({ tables }) {
	const [deletionError, setDeletionError] = useState(null);
	const history = useHistory();

	const finishClickHandler = async (event) => {
		const confirm = window.confirm(
			"Is this table ready to seat new guests?"
		);
		if (confirm) {
			try {
				const tableId = event.target.dataset.tableIdFinish;
				const abortController = new AbortController();
				await deleteTableReservation(tableId, abortController.signal);
				history.go(0);
			} catch (error) {
				setDeletionError(error);
			}
		}
	};

	const tablesList = tables.map((table, index) => {
		return (
			<tr key={index}>
				<td>{table.table_name}</td>
				<td>{table.capacity}</td>
				<td data-table-id-status={table.table_id}>
					{table.reservation_id ? "Occupied" : "Free"}
				</td>
				<td>{table.reservation_id}</td>
				{table.reservation_id ? (
					<td>
						<button
							data-table-id-finish={table.table_id}
							data-reservation-id-finish={table.reservation_id}
							onClick={finishClickHandler}
							className="btn btn-primary"
						>
							Finish
						</button>
					</td>
				) : (
					<td></td>
				)}
			</tr>
		);
	});

	return (
		<div>
			<ErrorAlert error={deletionError} />
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Table</th>
						<th scope="col">Capacity</th>
						<th scope="col">Status</th>
						<th scope="col">Reservation ID</th>
					</tr>
				</thead>
				<tbody>{tablesList}</tbody>
			</table>
		</div>
	);
}
