import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations, cancelReservation } from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";

export default function Search(){
  const {date} = useParams();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [reservationsError, setReservationsError] = useState(null);
    const [reservations, setReservations] = useState([]);
    
    
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
            class="input-field"
            style={{width: 300}}
            />
            <br></br>
            {" "}
            <button 
            type="submit"
            name="mobile_number" 
            onSubmit={handleSubmit}
            class="btn btn-success"
            style={{margin: 10}}>Find</button>
        </form>

        <div style={{textAlign:"center"}}>
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
      </div>  
    </main>
    )
}