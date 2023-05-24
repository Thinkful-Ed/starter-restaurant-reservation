import React from "react";
import { deleteReservation, listTables, updateReservation } from "../utils/api";

function DashboardTableItem({loadDashboard, table, setTablesError, setTables, setReservations, setReservationsError}) {

    async function clickHandler(event) {
        event.preventDefault()
        if (window.confirm("Is this table ready to seat new guests?\n\nThis cannot be undone.")) {
            try {
                await updateReservation("finished", table.reservation_id)
                await deleteReservation(table.table_id)
                const abortController = new AbortController();
                await listTables(abortController.signal)
                    .then(setTables)
                    .catch(setTablesError);
                await loadDashboard()
                return () => abortController.abort();
            } catch(error) {
                setTablesError(error)
            }
          }
    }

    const {
        table_name,
        capacity,
    } = table
    return <tr>
        <td>{table_name}</td>
        <td>{capacity}</td>
        <td data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied" : "Free"}</td>
        {table.reservation_id && <td><button className="btn btn-primary" onClick={clickHandler} data-table-id-finish={table.table_id}>Finish</button></td>}
    </tr>
}

export default DashboardTableItem