import React from "react";
import Table from "./table";

function TablesTable({ tables }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Table Name</th>
                    <th>Capacity</th>
                    <th>Available</th>
                </tr>
            </thead>
            <tbody>
                {tables.map((table) => <Table key={`table-${table.table_id}`} table={table} />)}
            </tbody>
        </table>
    );
}

export default TablesTable;
