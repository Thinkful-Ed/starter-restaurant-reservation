import React from "react";
import { useHistory } from "react-router-dom";
import { deleteTableRes } from "../../utils/api";

function ClearButton({ status, table, loadDash }){
    const history = useHistory();

    async function handleClick(){
        return window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
          )
            ? await handleClear(table.table_id, table.reservation_id)
            : null;
    }

    async function handleClear(table_id){
        await deleteTableRes(table_id);
        await loadDash();
        history.push("/dashboard");
    }

    return (
        status === "occupied" && (
            <td>
                <button
                    data-table-id-finish={table.table_id}
                    type="button"
                    onClick={handleClick}
                    className="btn btn-primary"
                    >
                        Clear Table
                    </button>
                    </td>
        )
    )
}

export default function TableClear({ table, loadDash }){
    const status = table.reservation_id ? "occupied" : "free";
    return (
        <>
            <tr>
                <th scope="row">{table.table_id}</th>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td data-table-id-status={table.table_id}>{status}</td>
                <ClearButton
                    status={status}
                    table={table}
                    loadDash={loadDash}
                    />
            </tr>
        </>
    )
}