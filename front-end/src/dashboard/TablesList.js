import React from "react";
import { useHistory } from "react-router-dom";

function TablesList({ tables }) {
    console.log("component tables:", tables);

    let mappedTables;

    if (Array.isArray(tables)) mappedTables = tables.map(table => {
        return (<tr key={table.table_id}>
            <td>{table.table_id}</td>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.free === true && "available"}</td>
        </tr>)
    });
    return (
        <div className="column col-md-6">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TABLE NAME</th>
                        <th>CAPACITY</th>
                        <th>FREE?</th>
                    </tr>
                </thead>
                <tbody>
                    {mappedTables}
                </tbody>
            </table>
        </div>
    )
}

export default TablesList;