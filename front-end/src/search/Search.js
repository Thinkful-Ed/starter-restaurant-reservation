import React, { useState } from "react";
import { listReservations } from "../utils/api";
import { Link } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { useEffect } from "react";
import ReservationsList from "../reservations/ReservationsList";
import { cancelReservation } from "../utils/api";
import { useParams } from "react-router-dom";

export default function Search(){
    const [phoneNumber, setPhoneNumber] = useState("");
    const {date} = useParams();
    
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);
    
    const handleChange = ({ target }) => {
        setPhoneNumber(target.value)
    }


    function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError(null);
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
      return () => abortController.abort();
    }

    const handleCancel = async (event) => {
      event.preventDefault();
      if(window.confirm(`Do you want to cancel this reservation? \n \nThis cannot be undone.`)) {
        try{
          await cancelReservation(event.target.value);
          //TODO remove extra code
          // loadTables();
          loadDashboard();
        }
        catch(error) {
          console.log(error)
          throw error
        }
      }

    }

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
  

        <ErrorAlert error={reservationsError} />
        {reservations.length > 0 ? (
          <h4>Search results for {phoneNumber}</h4>
        ): ''}
            <ReservationsList
            reservations={reservations}
            reservationsError={reservationsError}
            handleCancel={handleCancel}
            date={date}
            />
      {/* {reservations.length > 0 ? (
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
      )} */}
      </div>  
    </main>
    )
}