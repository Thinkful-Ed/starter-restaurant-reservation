import React from "react";

function ReservationsTable({ reservations }) {

    const columnHeadingsForReservationTable = <tr>
    <th scope="col">#</th>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Mobile Number</th>
    <th scope="col">Reservation Date</th>
    <th scope="col">Reservation Time</th>
    <th scope="col">People</th>
    <th scope="col">Seat</th>
   </tr>     
   
     const reservationsForThisDate = reservations.length ? (
         reservations.map((reservation) => {
         const reservation_id = reservation.reservation_id;
         return(
         <tr key={reservation_id}>
           <th scope="row">{reservation_id}</th>
           <td>{reservation.first_name}</td>
           <td>{reservation.last_name}</td>
           <td>{reservation.mobile_number}</td>
           <td>{reservation.reservation_date}</td>
           <td>{reservation.reservation_time}</td>
           <td>{reservation.people}</td>
           {/* <td>{reservation.status}</td> */}
           <td><a href={`/reservations/${reservation_id}/seat`} className="seat-button">
           Seat
               </a>
           </td>
         </tr>
       )})
   
     ) : (
       <tr>
         <td colSpan="7" className="text-center">
           No reservations for this date.
         </td>
       </tr>
     );



    return (
        <table className="table">
        <thead>
            {columnHeadingsForReservationTable}     
        </thead>
        <tbody>
           {reservationsForThisDate}
        </tbody>
      </table>
    )
}

export default ReservationsTable;