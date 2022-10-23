import React from "react"
import TableCard from "./TableCard"

export default function TablesList({ tables }) {
    const tablesList = tables.map((table) => {
        return <TableCard key={table.table_id} table={table} />
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Table Name</th>
                        <th>Capacity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{tablesList}</tbody>
            </table>
        </div>
    )
}