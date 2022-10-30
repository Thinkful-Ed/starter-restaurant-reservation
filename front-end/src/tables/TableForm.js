import React, { useState } from "react"
import { useHistory } from "react-router"
import axios from "axios"
import ErrorAlert from "../layout/ErrorAlert"

// Defines form for creating new table.

export default function TableForm() {
    const history = useHistory()

    const initialFormState = {
        table_name: "",
        capacity: 0,
    }

    const [formData, setFormData] = useState(initialFormState)
    const [error, setError] = useState(null)

    const handleChange = (event) => {
        event.preventDefault()
        if (event.target.name !== "capacity") {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            })
        } else {
            setFormData({
                ...formData,
                capacity: parseInt(event.target.value),
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)
        const abortController = new AbortController()
        try {
            await axios.post(process.env.REACT_APP_API_BASE_URL + '/tables', {
                data: formData,
                signal: AbortController.signal,
            })
            history.push(`/dashboard`)
        } catch (error) {
            setError(error.response.data.error)
        }
        abortController.abort()
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <form onSubmit={handleSubmit}>
                {/* table name */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            <span className="oi oi-layer mr-2"></span>
                        </span>
                    </div>
                    <label className="sr-only" htmlFor="table_name">
                        Table Name
                    </label>
                    <input
                        name="table_name"
                        type="text"
                        id="table_name"
                        placeholder="Table Name"
                        className="form-control"
                        aria-label="table_name"
                        style={{ maxWidth: 200 }}
                        required={true}
                        value={formData.table_name}
                        onChange={handleChange}
                    />
                </div>

                {/* Capacity */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">
                            <span className="oi oi-people mr-2"></span>
                            Capacity
                        </span>
                    </div>
                    <label className="sr-only" htmlFor="capacity">
                        Capacity:
                    </label>
                    <input
                        name="capacity"
                        type="number"
                        id="capacity"
                        min="1"
                        className="form-control"
                        aria-label="capacity"
                        style={{ maxWidth: 100 }}
                        required={true}
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                </div>

                {/* buttons */}
                <button
                    type="button"
                    className="btn btn-secondary mr-1 mb-3"
                    onClick={() => history.goBack()}
                >
                    <span className="oi oi-circle-x mr-2" />
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary mx-1 mb-3">
                    <span className="oi oi-circle-check mr-2" />
                    Submit
                </button>
            </form>
        </div>
    )
}