import React from "react";

function Table({table}){
    return(
     <>
        <tr key={table.table_id}>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>"Free/Occupied"</td>   
        </tr>
    </>
    )
}
export default Table;