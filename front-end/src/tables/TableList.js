/** @format */

import React from "react";
import TableFinish from "./TableFinish";

//user stories 4, 6: list tables and their details(name, capacity, status)
//add action to finish a reservation at a specific table
function TableList({ tables, handleClick, error }) {
	//map the tables array to create table rows
	//Render TableFinish component within table data cell
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
					clickHandler={handleClick}
					error={error}
				/>
			</td>
		</tr>
	));
	//layout and structure of the component:table with header row that displays table name, capacity, status, and action
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
}

export default TableList;
