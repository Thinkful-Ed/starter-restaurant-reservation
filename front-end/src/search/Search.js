import React, {useState} from 'react';
import {search} from "../utils/api"
import Reservation from "../reservation/Reservation"
export default function Search(){
    const [formData, setFormData] = useState('')
    const [result, setResult] = useState([])
    const changeHandler=(event)=>{
       setFormData(event.target.value)
    }
    const submitHandler=(event)=>{
        event.preventDefault()
       search(formData).then(setResult)
    }



    return <>
    <form onSubmit={submitHandler}>
        <label htmlFor='mobile_number'>Search by Phone Number</label>
        <input type="text" id="mobile_number" name="mobile_number" value={FormData.mobile_number} onChange={changeHandler}/>
        <button type='submit'>Find</button>
    </form>
    <div>

    {result.length > 0 ? result.map(r=><div key={r.reservation_id}> <Reservation reservation={r} /> </div>):<p>No reservations found</p>}
    </div>
    </>
}