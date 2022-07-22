import React from "react";

export default function TableDisplay(table){
    const {
        table_name,
        capacity
      } = table.table


    return (
        <table>
            <tr>
                <th>Table Name</th>
                <th>Capacity</th>
                <th>Status</th>
               
            </tr>
            <tr>
                <td>{table_name}</td>
                <td>{capacity}</td>

                <td>
                   
                </td>
            </tr>
        </table>
    )
    

}
