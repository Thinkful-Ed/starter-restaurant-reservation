import React from "react";

function Table({ table }) {
    const { table_id, table_name, capacity, available } = table;

    return (
        <tr>
            <td>{ table_name }</td>
            <td>{ capacity }</td>
            <td data-table-id-status={table_id} >{ available ? "Free" : "Occupied" }</td>
        </tr>
    );
}

export default Table;
