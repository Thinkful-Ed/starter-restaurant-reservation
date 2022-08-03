import React, {useState, useEffect} from "react"
import {useParams, Link, useHistory} from "react-router-dom";
import { listReservations } from "../utils/api";
import ReservationList from "../Create/ReservationList";

export default function SearchBox(){
  const [searchData, setSearchData] = useState({ mobile_number: "" });
  const [results, setResults] = useState(null)
  // const [errorMessages, setErrorMessages]= useState(null)

  function changeMobileHandler(event){
    setSearchData({...searchData, [event.target.name]:event.target.value})
  }

  function findCustomer(event) {
    event.preventDefault();

    async function requestForCustomerByMobileNumber() {
      try {
        // setErrorMessages(null)
        let listOfReservations = await listReservations(searchData);
        // console.log("listOfReservations", listOfReservations);
        setResults(listOfReservations);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          // console.log(error)
          // setErrorMessages(error.message)
          // throw error;
        }
      }
    }
    requestForCustomerByMobileNumber();
  }

  return(
    <>
    {results && results.length === 0 && <li className="alert alert-danger m-2">No reservations found</li>}
    <form onSubmit={findCustomer}>
      <label htmlFor="mobile_number">
        Search
        <input name="mobile_number" id="mobile_number" value={searchData.mobile_number} onChange={changeMobileHandler} type="text" placeholder="Enter a customer's phone number"/>
        <button type="submit">Find</button>
      </label>

    </form>
    <ReservationList reservations = {results || []}/>
    </>
  )
}