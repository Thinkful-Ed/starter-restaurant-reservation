import React, { useState } from "react";
import { useHistory } from "react-router";
import { listReservations } from "../utils/api";
import { Link } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";


export default function Search(){
    const history = useHistory();
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleChange = ({ target }) => {
        setPhoneNumber(target.value)
        console.log(phoneNumber)
    }


    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        setReservations([])
        console.log('clicked submit', event.target)

        listReservations({mobile_number:phoneNumber})
            .then(setReservations)
            .catch(setReservationsError)

        console.log(reservations)
        
    }

    // const mappedReservations = reservations.map((reservation, index) => (
    //     <>
    //     <tr key={index}>
    //         <td>{reservation.first_name}</td>

    //     </tr>
    //     </>

    // ))



    return (
        <main>
        <h3>Search by Phone Number</h3>
        <form name="search"
        onSubmit={handleSubmit}
        >
            <input 
            id="mobile_number"
            name="mobile_number"
            type="mobile_number"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
            value={phoneNumber}
            />
            <button type="submit">Find</button>
        </form>


        <div>
        <ErrorAlert error={reservationsError} />

      {reservations.length > 0 ? (
        <table className = "table">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Reservation Date</th>
              <th>Reservation Time</th>
              <th>People</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.reservation_id}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.mobile_number}</td>
                <td>{reservation.reservation_date}</td>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.people}</td>
                <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                {reservation.status === 'seated' ? '' : 
                <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                  <button type="button" Link to="/reservations/{reservation.reservation_id}/seat">Seat</button>
                </Link>}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
      </div>
      <div>
      </div>
      
        </main>
    )
}