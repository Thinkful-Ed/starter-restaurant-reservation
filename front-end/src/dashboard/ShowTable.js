import React from "react";

function ShowTable({ table, index }){
    const isOccupied = table.reservation_id > 0;
    const status = isOccupied ? "Occupied" : "Free";
    const cnr = isOccupied ? " bg-secondary" : ""; //className row
    const cns = isOccupied ? " bg-danger text-light" : "bg-success text-light"

    return(
    // <tr className={ index%2===0 ? "bg-light" : "bg-primary text-white"}>
    <tr className={cnr}>
        <td>{table.table_id}</td>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.reservation_id}</td>
        <td data-table-id-status={table.table_id} ><span className={" p-2 rounded "+cns}>{status}</span></td>
    </tr>
    );
}

export default ShowTable;