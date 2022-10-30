import React from "react"

// Defines table options for SeatReservations component.

export default function TableOptions({ table }) {
    return (
        <option value={table.table_id}>
            {table.table_name} - {table.capacity}
        </option>
    )
}