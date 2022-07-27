import React from "react";

export default function TableDisplay(table){
    // console.log(table.table)
    const {table_name, capacity, reservation_id, table_status } = table.table

    




    return (
        <table>
            <thead>
                <tr>
                    <th>Reservation ID</th>
                    
                    <th>Table Name</th>
                    <th>Capacity</th>
                    <th>Status</th>
                
                </tr>
                <tr>
                    <td>{reservation_id }</td>
                    <td>{table_name}</td>
                    <td>{capacity}</td>
                    <td>{reservation_id ? "Occupied" : "Free"}</td>

                    <td>
                    {/* display free or occupied depending on whether a reservation is seated at the table,
                    must have attribute of: data-table-id-status=${table.table_id} */}
                    </td>
                </tr>
            </thead>
            
        </table>
    )
    

}
