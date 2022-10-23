import React from "react"

export default function TableCard({ table }) {
    return (
        <tr>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{table.status}</td>
        </tr>
    )
}