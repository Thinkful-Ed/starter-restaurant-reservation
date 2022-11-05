import React from "react";
import TableClear from "./TableClear";

export default function TableList({ tables, loadDash }){
    if(!tables){
        return null;
    }

    const format = tables.map((table)=> {
        return (
            <TableClear 
                key={table.table_id} 
                table={table} 
                loadDash={loadDash} 
               />
        );
    });

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Table</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Clear</th>
                    </tr>
                </thead>
                <tbody>{format}</tbody>
            </table>
        </div>
    );
}