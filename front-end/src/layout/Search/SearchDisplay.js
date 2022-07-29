import React , {useState}from "react"
import useQuery from "../../utils/useQuery"
import { getReservationPlusMobile } from "../../utils/api"


export default function Search(){
    const [searchPhone, setSearchPhone] = useState("")

    const query = useQuery()
    console.log("query", query.mobile_number)

    
    const handleSubmitSearch = async (event) =>{
        event.preventDefault()
        const response = await getReservationPlusMobile(searchPhone)
        console.log(searchPhone)
        console.log("clicked!")
        console.log(response)
    }

    const handleChange = (event) =>{
        console.log(event.target.value)
        setSearchPhone(event.target.value)
    }


    return (
        <>
        <form onSubmit = {handleSubmitSearch}>
        <label htmlFor="mobile_number">

        </label>
        <input
            name="mobile_number"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
            >
        </input>
        <button type="submit">Find</button>
        </form>
        
        </>

    )
}