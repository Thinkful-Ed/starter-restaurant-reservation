import React, {useState} from "react";
import { deleteTableReservation, updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function TablesTable({ tables, loadDashboard }) {

const [error, setError] = useState(null);


    const tablesTableRow = tables.map((table) => {
    
        return (
            <tr key={table.table_id}>
            <td>{table.table_id}</td>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>{table.table_status}</td>
            <td>{table.reservation_id}</td>
            <td>{table.reservation_id ? <button className="btn btn-secondary" onClick={(event) => handleClear(event, table)} data-table-id-finish={table.table_id}>Finish</button> : <></>}</td>
            </tr>
        );
      });

      async function handleClear(event, table) {
        const ac = new AbortController();
        event.preventDefault();
        setError(null);
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            await deleteTableReservation(table.table_id, ac.signal);
            await updateReservationStatus({status: "finished"}, table.reservation_id, ac.signal);
            loadDashboard();
            return;
        } else {
            return;
        }
    }

    return (
        <div> 
            <ErrorAlert error={error} />
            <h4>Tables</h4>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TABLE NAME</th>
                        <th>CAPACITY</th>
                        <th>FREE?</th>
                        <th>RES ID</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tablesTableRow}</tbody>
            </table>
        </div>
    );
}