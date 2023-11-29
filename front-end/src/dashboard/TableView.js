import React from "react";

function TableView({table}) {
    return <div>
        <p>Name: {table.table_name}</p>
        <p>Capacity: {table.capacity}</p>
    </div>
}

export default TableView;