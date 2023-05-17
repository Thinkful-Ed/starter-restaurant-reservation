import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

function TableForm({initialFormState, apiHandler}) {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    //sets form data to initial state passed in so it can be used for edit and new
    useEffect(()=>{
        setFormData(initialFormState)
    },[initialFormState])

    //updates form STATE when values are changed
    function changeHandler(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    //calls API to submit the reservation to our server
    async function submitHandler(event) {
        event.preventDefault()
        try {
            await apiHandler(formData)
            history.push(`/dashboard`)
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    return <div>
        <form onSubmit={submitHandler}>
            <h3>Create a New Table</h3>
            <div>
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            </div>
            <div>
                <label htmlFor="table_name">
                    Table Name
                </label>
                <input type="text" id="table_name" name="table_name" value={formData.table_name} onChange={changeHandler}/>
            </div>
            <div>
                <label htmlFor="capacity">
                    Capacity
                </label>
                <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={changeHandler}/>
            </div>
            <div>
                <button onClick={()=> history.goBack()} className="btn btn-secondary">Cancel</button>
                <button className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    </div>
}

export default TableForm