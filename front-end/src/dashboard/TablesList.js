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
            <td data-table-id-status={table.table_id}>{table.free && "free"}</td>
            <td>{!table.free && (<button className="btn btn-light btn-sm btn-outline-secondary">Finish</button>)}</td>
        </tr>)
    });
    return (
        <div className="column col-md-6">
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TABLE NAME</th>
                        <th>CAPACITY</th>
                        <th>FREE?</th>
                        <th></th>
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