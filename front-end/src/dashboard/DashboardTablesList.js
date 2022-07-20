import React from "react"

export default function DashboardTablesList({tables}){
    
    const tablesList = tables.map((table, index) => {
		return (
			<tr key={index}>
				<td>{table.table_name}</td>
				<td>{table.capacity}</td>
				<td data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied":"Free"}</td>
				<td>{table.reservation_id}</td>
			</tr>
		);
	})
    
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Table</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Reservation ID</th>
                    </tr>
                </thead>
                <tbody>
                    {tablesList}
                </tbody>
            </table>
        </div>
        )
}