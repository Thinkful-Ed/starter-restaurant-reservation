/** @format */

import React from "react";

//import components
import TableFinish from "./TableFinish";

const TablesList = ({ tables, clickHandler, error }) => {
	const tableRows = tables.map((table) => (
		<tr key={table.table_id}>
			<th scope="row">{table.table_name}</th>
			<td>{table.capacity}</td>
			<td data-table-id-status={table.table_id}>
				{table.reservation_id === null ? "Free" : "Occupied"}
			</td>
			<td data-table-id-finish={table.table_id}>
				<TableFinish
					table={table}
					clickHandler={clickHandler}
					error={error}
				/>
			</td>
		</tr>
	));

	return (
		<>
			<h4>Tables</h4>
			<div className="table table-striped table-responsive table-sm">
				<table className="table table-hover">
					<thead>
						<tr>
							<th scope="col">Table name</th>
							<th scope="col">Capacity</th>
							<th scope="col">Table status</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>{tableRows}</tbody>
				</table>
			</div>
		</>
	);
};

export default TablesList;
