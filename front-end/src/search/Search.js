import React, { useState } from "react";
import { listReservations } from "../utils/api";
import { Link } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { useEffect } from "react";

export default function Search(){
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleChange = ({ target }) => {
        setPhoneNumber(target.value)
    }


    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // setReservations([])
    //     // setPhoneNumber(event.target.value)
    //     console.log('clicked submit', event.target)

    //     listReservations({mobile_number:phoneNumber})
    //         .then(setReservations)
    //         .catch(setReservationsError)
    //     // loadReservations()
    // }  

    // useEffect(loadReservations, [submittedNumber]);

    // function loadReservations() {
    //   const abortController = new AbortController();
    //   setReservationsError(null);
    //   listReservations({ mobile_number: phoneNumber }, abortController.signal)
    //     .then(setReservations)
    //     .catch(setReservationsError);
    //   return () => abortController.abort();
    // }

    // const mappedReservations = reservations? reservations.map((reservation, index) => (
    //     <>
    //     <tr key={index}>
    //         <td>{reservation.first_name}</td>

    //     </tr>
    //     </>

    // )) : null;

    function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        setReservationsError(null);

        listReservations({ mobile_number: phoneNumber}, abortController.signal)
            .then(setReservations)
            .catch(reservationsError);
        
        return () => abortController.abort();
    }


    return (
        <main>
        <h3>Search by Phone Number</h3>
        <form name="mobile_number"
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
            <button type="submit" name="mobile_number" onSubmit={handleSubmit}>Find</button>
        </form>

        <div>
            {/* {mappedReservations ? (
                <table>
                    {mappedReservations}
                </table>
            ) : (
                <p>No reservations found</p>
            )} */}






        {/* <ErrorAlert error={reservationsError} /> */}

{/* This works!!!!! */}
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
              <th>Edit</th>
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
                <td>{reservation.status === 'seated' ? '' : 
                <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                  <button type="button">Seat</button>
                </Link>}
                </td>

                <td>
                  <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                  <button type="button">Edit</button>
                  </Link>
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
      </div>  
    </main>
    )
}