import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

export default function CreateTable() {

    const history = useHistory()

    const initialFormState = {
        table_name: "",
        capacity: 1
    }

    const [formData, setFormData] = useState({...initialFormState})

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const handleCreateTableSubmission = (event) => {
        event.preventDefault()
        history.push("/dashboard")
    }

    return (
        <div>
            <h1>Create Table</h1>
            <form onSubmit={handleCreateTableSubmission}>
                <label htmlFor="table_name" className="form-label">
                    Table Name
                </label>
                <input 
                    id="table_name"
                    type="text"
                    name="table_name"
                    minlength="2"
                    onChange={handleChange}
                    value={formData.table_name}
                    className="form-control"
                    required
                />
                <label htmlFor="capacity" className="form-label">
                    Capacity
                </label>
                <input 
                    id="capacity"
                    type="number"
                    name="capacity"
                    min="1"
                    onChange={handleChange}
                    value={formData.capacity}
                    className="form-control"
                    required
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
            </form>
        </div>
    )
}