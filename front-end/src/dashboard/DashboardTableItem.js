import React from "react";
import { useHistory } from "react-router";
import { deleteReservation } from "../utils/api";

function DashboardTableItem({table, setTablesError}) {
    const history = useHistory()

    async function clickHandler(event) {
        event.preventDefault()
        try {
            await deleteReservation(table.table_id)
            console.log("hello")
            history.go(0)
        } catch(error) {
            setTablesError(error.message)
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
        <td data-table-id-status={`${table.table_id}`}>{status}</td>
        <td><button className="btn btn-primary" onClick={clickHandler} data-table-id-finish={`${table.table_id}`}>Finish</button></td>
    </tr>
}

export default DashboardTableItem