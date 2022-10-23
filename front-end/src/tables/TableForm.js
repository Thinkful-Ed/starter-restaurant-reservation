import React, { useState } from "react"
import { useHistory } from "react-router"
import axios from "axios"
import ErrorAlert from "../layout/ErrorAlert"

export default function TableForm() {
    const history = useHistory()

    const initialFormState = {
        table_name: "",
        capacity: 0,
    }

    const [formData, setFormData] = useState(initialFormState)
    const [errors, setErrors] = useState(null)

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
        try {
            await axios.post(
                process.env.REACT_APP_API_BASE_URL + '/tables',
                {data: formData}
            )
            history.push(`/dashboard`)
        } catch (error) {
            setErrors(error.response.data.error)
        }
    }

    return (
        <div>
            <ErrorAlert error={errors} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="table_name">Table Name:</label>
                    <input
                        name="table_name"
                        type="text"
                        id="table_name"
                        placeholder="Table Name"
                        required={true}
                        value={formData.table_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        name="capacity"
                        type="number"
                        id="capacity"
                        min="1"
                        required={true}
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="btn btn-danger"
                    className="btn btn-danger"
                    onClick={() => history.goBack()}
                >
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}