import React from "react";
import ReservationButtons from "./ReservationButtons";

export default function ReservationDisplay({ onCancel, reservations = []}){
    const rows = reservations.length ? (
        reservations.map((reservation) => {
            // const {reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people, status } = reservation;
            return (
                <tr key={reservation.reservation_id}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                <ReservationButtons 
                    status={reservation.status}
                    reservation_id={reservation.reservation_id}
                    onCancel={onCancel}
                />
            </tr>
            )
        })
    ) : (
        <tr>
            <td colSpan="6">No reservations found.</td>
        </tr>
    );

    return (
        <div className="table-responsive">
            <table className="table no-wrap">
                <thead>
                <tr>
                    <th className="border-top-0">#</th>
                    <th className="border-top-0">FIRST NAME</th>
                    <th className="border-top-0">LAST NAME</th>
                    <th className="border-top-0">PHONE</th>
                    <th className="border-top-0">DATE</th>
                    <th className="border-top-0">TIME</th>
                    <th className="border-top-0">PEOPLE</th>
                    <th className="border-top-0">STATUS</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
        // <table>
        //     <thead>
        //         <tr>
        //             <th>Reservation ID</th>
        //             <th>First Name</th>
        //             <th>Last Name</th>
        //             <th>Mobile Number</th>
        //             <th>Reservation Date</th>
        //             <th>Reservation Time</th>
        //             <th>Number of People</th>
        //             <th>Status</th>
        //         </tr>
        //         <tr>
        //             <td>{reservation_id}</td>
        //             <td>{first_name}</td>
        //             <td>{last_name}</td>
        //             <td>{mobile_number}</td>
        //             <td>{reservation_date}</td>
        //             <td>{reservation_time}</td>
        //             <td>{people}</td>
        //             <td data-reservation-id-status={reservation.reservation_id}>{status}</td>
        //             <td>{status === "booked" ?  
        //             <a
        //                 type="button" 
        //                 className="btn btn-dark"
        //                 href={`/reservations/${reservation_id}/seat`}
        //                 >
        //                     Seat
        //                 </a>
        //                 : ""}
                        
                       
        //             </td>
        //         </tr>
        //     </thead>
            
        // </table>
    )

}

// export default function ReservationDisplay(reservation){
//     const {
//         reservation_id,
//         first_name,
//         last_name,
//         mobile_number,
//         reservation_date,
//         reservation_time,
//         people,
//         status
//       } = reservation.reservation;


//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>Reservation ID</th>
//                     <th>First Name</th>
//                     <th>Last Name</th>
//                     <th>Mobile Number</th>
//                     <th>Reservation Date</th>
//                     <th>Reservation Time</th>
//                     <th>Number of People</th>
//                     <th>Status</th>
//                 </tr>
//                 <tr>
//                     <td>{reservation_id}</td>
//                     <td>{first_name}</td>
//                     <td>{last_name}</td>
//                     <td>{mobile_number}</td>
//                     <td>{reservation_date}</td>
//                     <td>{reservation_time}</td>
//                     <td>{people}</td>
//                     <td data-reservation-id-status={reservation.reservation_id}>{status}</td>
//                     <td>{status === "booked" ?  
//                     <a
//                         type="button" 
//                         className="btn btn-dark"
//                         href={`/reservations/${reservation_id}/seat`}
//                         >
//                             Seat
//                         </a>
//                         : ""}
                        
                       
//                     </td>
//                 </tr>
//             </thead>
            
//         </table>
//     )
    
// }