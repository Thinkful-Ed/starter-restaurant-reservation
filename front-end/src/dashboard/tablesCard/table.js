import React from "react";

function Table({ table }) {
    const { table_id, table_name, capacity, available, reservation_id } = table;
    console.log(table_name, reservation_id);
    return (
        <tr>
            <td>{ table_name }</td>
            <td>{ capacity }</td>
            <td data-table-id-status={table_id} >{ available ? "Free" : "Occupied" }</td>
            <td>{reservation_id ? reservation_id : null}</td>
        </tr>
    );
}

export default Table;
