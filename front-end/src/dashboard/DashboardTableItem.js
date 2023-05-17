import React from "react";

function DashboardTableItem({table}) {
    const {
        table_name,
        capacity,
        status,
    } = table
    return <div>
        <div>
            <p>Table Name: {table_name}</p>
            <p>Capacity: {capacity}</p>
            <p data-table-id-status={`${table.table_id}`}>Status: {status}</p>
        </div>
    </div>
}

export default DashboardTableItem