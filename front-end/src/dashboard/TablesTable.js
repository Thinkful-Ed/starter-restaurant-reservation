import React from "react";

export default function TablesTable({ tables }) {
    const tablesTableRow = tables.map((table) => {
        return (
            <tr key={table.table_id}>
            <td>{table.table_id}</td>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.table_status}</td>
            <td>{table.reservation_id}</td>
            </tr>
        );
      });

    return (
        <div> 
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TABLE NAME</th>
                        <th>CAPACITY</th>
                        <th>FREE?</th>
                        <th>RES ID</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tablesTableRow}</tbody>
            </table>
        </div>
    );
} 