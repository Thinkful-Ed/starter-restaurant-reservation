import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { seatTable, updateReservation } from "../utils/api";

function SeatForm({tables}) {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()
    const {reservation_id} = useParams()

    const initialFormState = {
        table_id: 3,
    }

    //sets form data to initial state passed in so it can be used for edit and new
    useEffect(()=>{
        setFormData(initialFormState)
    },[])

    //updates form STATE when values are changed
    function changeHandler(event) {
        setFormData({
            ...formData,
            table_id: Number(event.target.value)
        })
    }

    //calls API to submit the reservation to our server
    async function submitHandler(event) {
        event.preventDefault()
        try {
            await seatTable(reservation_id, formData.table_id)
            await updateReservation("seated", reservation_id)
            history.push(`/dashboard/`)
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    return <div>
        <form onSubmit={submitHandler}>
            <div>
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            </div>
            <p>Please select a table from the dropdown menu</p>
            <div>
                <label htmlFor="table_id">
                    Table Name
                </label>
                <select name="table_id" id="table_id" onChange={changeHandler}>
                    {tables.map(table=><option key={table.table_id} value={table.table_id} >
                        {table.table_name} - {table.capacity}
                    </option>)}
                </select>
            </div>
            <div>
                <button type="button" onClick={()=> history.goBack()} className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    </div>
}

export default SeatForm