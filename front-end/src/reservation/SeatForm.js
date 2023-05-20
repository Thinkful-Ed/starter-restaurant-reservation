import React, {useState, useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { seatTable } from "../utils/api";

function SeatForm({tables}) {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()
    const {reservation_id} = useParams()

    const initialFormState = {
        table_id: "",
        table_name: "",
        capacity: "",
        created_at: "",
        updated_at: "",
        status: "",
        reservation_id,
    }

    //sets form data to initial state passed in so it can be used for edit and new
    useEffect(()=>{
        setFormData(initialFormState)
    },[])

    //updates form STATE when values are changed
    function changeHandler(event) {
        const index = tables.findIndex(table=>table.table_id===Number(event.target.value))
        setFormData({
            ...formData,
            table_id: Number(event.target.value),
            table_name: tables[index].table_name,
            capacity: tables[index].capacity,
            created_at: tables[index].created_at,
            updated_at: tables[index].updated_at,
            status: "Occupied",
        })
    }

    //calls API to submit the reservation to our server
    async function submitHandler(event) {
        event.preventDefault()
        try {
            await seatTable(formData)
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
                    {tables.map(table=><option value={table.table_id} >
                        {table.table_name} - {table.capacity}
                    </option>)}
                </select>
            </div>
            <div>
                <button onClick={()=> history.goBack()} className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    </div>
}

export default SeatForm