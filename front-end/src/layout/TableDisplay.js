import React from "react";
import { useHistory } from "react-router-dom";
import { removeReservation } from "../utils/api";

export default function TableDisplay({ tables = [], onFinish }){
    const history = useHistory();
    const handleFinish = ({
        target: {dataset: {tableIdFinish, reservationIdFinish}} = {},
    }) => {
       if (
            tableIdFinish && 
            reservationIdFinish && 
            window.confirm(
                "Is this table ready to seat new guests?\n\nThis cannot be undone."
            )
        ) {
            console.log({
                "tableIdFinish line 20": tableIdFinish,
                "reservationIdFinish line 21": reservationIdFinish
            });
            onFinish(tableIdFinish, reservationIdFinish)
        }
    }

    const rows = tables.map((table) => {
        return (
            <tr key={table.table_id}>
                <td>{table.table_id}</td>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td data-table-id-status={table.table_id}>
                {table.reservation_id ? "Occupied" : "Free"}
                </td>
                <td>
                    {table.reservation_id ? (
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            data-table-id-finish={table.table_id}
                            data-reservation-id-finish={table.reservation_id}
                            onClick={handleFinish}
                        >
                        Finish
                        </button>
                    ) : ( "" )}
                </td>
            </tr>
        );
    });

    return (
        <div className="table-responsive">
            <table className="table no-wrap">
                <thead>
                <tr>
                    <th className="border-top-0">#</th>
                    <th className="border-top-0">TABLE NAME</th>
                    <th className="border-top-0">CAPACITY</th>
                    <th className="border-top-0">Free?</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    )
}


// export default function TableDisplay({table, loadDashboard}){
//     // console.log(table.table)
//     // const {table_name, capacity, reservation_id, table_id } = table
//     const history = useHistory()
//     console.log("tableId", table.table_id) 
//     // console.log("tablestatus", table)

    

//     const handleFinish = async (event) =>{
//         const result = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
//         event.preventDefault()
//         if (result){
//             const ac = new AbortController()
         
//                 console.log("hello1")
//                 await removeReservation(table.table_id, ac.signal)
//                 console.log("hello")
//                 // history.push("/")
//                 // loadDashboard()

//         }else{
//             return
//         }
//     }


//     // console.log(table)


//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>Reservation ID</th>                    
//                     <th>Table Name</th>
//                     <th>Capacity</th>
//                     <th>Status</th>
                
//                 </tr>
//                 <tr>
//                     <td>{table.reservation_id }</td>
//                     <td>{table.table_name}</td>
//                     <td>{table.capacity}</td>
//                     <td>{table.reservation_id ? "Occupied" : "Free"}</td>

//                     <td>
//                     {/* display free or occupied depending on whether a reservation is seated at the table,
//                     must have attribute of: data-table-id-status=${table.table_id} */}
//                     </td>
//                     <td data-table-id-status={table.table_id}>{table.table_status}</td>
//                     <td>
//                         {table.reservation_id ? 
//                         <button
//                         type="button"
//                         onClick={(event)=>handleFinish(event, table)}
//                         >
//                             Finish
//                         </button>
                        
//                     : ""}
                        
//                     </td>
//                 </tr>
//             </thead>
            
//         </table>
//     )
// }
