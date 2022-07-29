import React from "react"
import useQuery from "../../utils/useQuery"
import { getReservationPlusMobile } from "../../utils/api"


export default function Search(){

    const query = useQuery()
    console.log("query", query.mobile_number)

    
    const handleClick = () =>{
        // const response = await getReservationPlusMobile()
        console.log("clicked!")
    }


    return (
        <>
        
        <label htmlFor="mobile_number">

        </label>
        <input
        name="mobile_number"
        placeholder="Enter a customer's phone number"
        >
        </input>
        <button type="button" onClick={handleClick}>Find</button>
        </>

    )
}