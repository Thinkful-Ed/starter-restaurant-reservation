import React from "react";

function Table({table, finishTable}){
 
    return(
     <>
        <tr key={table.table_id}>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={`${table.table_id}`}>{table.status}</td>   
            <td>{table.status === "Occupied" ? <button onClick={() => finishTable(table.table_id)}className="btn btn-primary" data-table-id-finish={`${table.table_id}`}>Finish</button> : ""}</td>
        </tr>
    </>
    )
}
export default Table;