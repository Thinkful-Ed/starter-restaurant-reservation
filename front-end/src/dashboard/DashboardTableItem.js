import React from "react";

function DashboardTableItem({table}) {
    const {
        table_name,
        capacity,
        status,
    } = table
    return <tr>
        <td>{table_name}</td>
        <td>{capacity}</td>
        <td data-table-id-status={`${table.table_id}`}>{status}</td>
    </tr>
}

export default DashboardTableItem