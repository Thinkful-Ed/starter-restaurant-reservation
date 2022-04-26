import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createTable, listTables } from "../utils/api"
import ErrorAlert from "./ErrorAlert"

export default function NewTable() {
    // form with table name at least 2 characters and capacity 
    //which must be at least 1

    const history = useHistory()

    const initialFormData = {
        table_name: "",
        capacity: null
    }

    const [tables, setTables] = useState([])
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({ ...initialFormData })

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        
        // validate input
        if (formData.table_name.length < 2) {
            setError({ message: `Table name must be at least 2 characters.` })
            return
        }

        const abortController = new AbortController()
        const newTable = { ...formData }
        const response = await createTable(newTable, abortController.signal)
        if (response.message) {
            setError(response)
            return
        } else {
            setError(null)
        }
    }

    function handleCancel() {
        history.push(-1)
    }

    

    

    return (
        <div>
            <form className="new-table-form" onSubmit={handleSubmit}>
                <h1>Add Table</h1>
                <div className="form-group">
                    <label htmlFor="table_name">Table Name</label>
                    <input 
                        id="table_name"
                        className="form-control"
                        type="text"
                        name="table_name"
                        onChange={handleChange}
                        value={formData.table_name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        id="capacity"
                        className="form-control"
                        type="number"
                        name="capacity"
                        onChange={handleChange}
                        value={formData.capacity}
                    />
                    <div className="invalid-feedback">
                        Table name must be 2 characters minimum.
                    </div>
                </div>
                <ErrorAlert error={error} />
                <label htmlFor="submit">
                    <input 
                        type="submit"
                        id="submit"
                        name="submit"
                        className="btn btn-primary"
                    />
                </label>
                <label htmlFor="cancel">
                    <button 
                        type="cancel"
                        id="cancel"
                        name="cancel"
                        className="btn btn-primary"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </label>
            </form>
        </div>
    )
}