import { listReservations } from "../utils/api";
import { useState } from "react";
import ReservationsTable from "./ReservationsTable";
import ErrorAlert from "../layout/ErrorAlert";
import "./Search.css"


const Search = () => {



  const [phoneNumber, setPhoneNumber] = useState( {mobile_number: ""} );
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null)




//   function reservationsByPhoneNumber(reservations) {
//     return (
//       <div className="row g-2">
//         <table className="table table-dark">
//   <thead>
//     <tr>
//       <th scope="col">Last Name</th>
//       <th scope="col">First Name</th>
//       <th scope="col">Mobile Number</th>
//       <th scope="col">Time</th>
//       <th scope="col">Party Of</th>
//       <th scope="col">Status</th>
//     </tr>
//   </thead>
//   <tbody>
//   {reservations
//   .map((reservation) => 
//   (
//             <tr key={reservation.reservation_id}>
//             <td>{reservation.last_name}</td>
//             <td>{reservation.first_name}</td>
//             <td>{reservation.mobile_number}</td>
//             <td>{reservation.reservation_time}</td>
//             <td>{reservation.people}</td>
//             <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
//             {reservation.status === "booked" && <td><Link to={`/reservations/${reservation.reservation_id}/seat`} type="button" className="btn btn-success">Seat</Link></td>}
//           </tr>
//     ))}
//   </tbody>
// </table>

//       </div> 
//     )
//   }


// function reservationsByPhoneNumber(reservations) {
//   return  (
//       <div className="row g-2">
//         <table className="table table-dark">
//   <thead>
//     <tr>
//       <th scope="col">Last Name</th>
//       <th scope="col">First Name</th>
//       <th scope="col">Mobile Number</th>
//       <th scope="col">Time</th>
//       <th scope="col">Party Of</th>
//       <th scope="col">Status</th>
//     </tr>
//   </thead>
//   <tbody>
//   {
//     reservations
//     .filter((reservation) => reservation.mobile_number.includes(phoneNumber.mobile_number))
//     .map((reservation) => 
//   (
//             <tr key={reservation.reservation_id}>
//             <td>{reservation.last_name}</td>
//             <td>{reservation.first_name}</td>
//             <td>{reservation.mobile_number}</td>
//             <td>{reservation.reservation_time}</td>
//             <td>{reservation.people}</td>
//             <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
//             {reservation.status === "booked" && <td><Link to={`/reservations/${reservation.reservation_id}/seat`} type="button" className="btn btn-success">Seat</Link></td>}
//           </tr>
//   ))}
//   </tbody>
// </table>

//       </div>
//     )
// }

  function listReservationsByPhoneNumber(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(phoneNumber, abortController.signal)
    .then(setReservations)
    .catch(setReservationsError)
    return () => abortController.abort();
  }

  function inputChangeHandler(e) {
    setPhoneNumber({...phoneNumber, [e.target.name]: e.target.value});
  }

  

  return (
    <div>
      <h1>Search</h1>
      <hr></hr>
  <ErrorAlert error={reservationsError}/>
  <form className="form-inline" onSubmit={listReservationsByPhoneNumber}>
	<input 
  name="mobile_number" 
  id="search-input" 
  onChange= {inputChangeHandler}
  type="search" 
  className="form-control w-75 p-3"
  placeholder="Enter a customer's phone number">
  </input>
  	<button id="search-button" type="submit" className="btn btn-primary ml-2">
      Find
  	</button>
    </form>
    <div className="reservations-table">
      {reservations.length ? 
    <ReservationsTable reservations={reservations} />
    : <h2> No reservations found. </h2>
      }
    </div>
    </div>
  );
};

export default Search;
