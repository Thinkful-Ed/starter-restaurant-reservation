import React from "react";
import { useHistory } from "react-router";
import { deleteReservation, listReservations, listTables, updateReservation } from "../utils/api";

function DashboardTableItem({table, setTablesError, setTables, setReservations, setReservationsError}) {
    const history = useHistory()

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
                await listReservations(abortController.signal)
                    .then(setReservations)
                    .catch(setReservationsError);
                return () => abortController.abort();
            } catch(error) {
                setTablesError(error)
            }
          }
    }

    const {
        table_name,
        capacity,
        status,
    } = table
    return <tr>
        <td>{table_name}</td>
        <td>{capacity}</td>
        <td data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied" : "Free"}</td>
        <td>{/* <p data-table-id-status={table.table_id}>{status}</p> */}</td>
        <td><button className="btn btn-primary" onClick={clickHandler} data-table-id-finish={table.table_id}>Finish</button></td>
    </tr>
}

export default DashboardTableItem