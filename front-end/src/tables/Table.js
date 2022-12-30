import React from "react";

function Table({table}){
    return(
     <>
        <tr key={table.table_id}>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={`${table.table_id}`}>{table.status}</td>   
        </tr>
    </>
    )
}
export default Table;