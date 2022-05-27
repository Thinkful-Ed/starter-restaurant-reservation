import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";

function TableForm() {
    const INITIAL_FORM_STATE = {
        table_name: "",
        capacity: ""
    }

    const [formData, setFormData] = useState({ ...INITIAL_FORM_STATE });
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleChange = event => {
        const { target } = event;
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData);
        let { capacity } = formData;
        capacity = Number(capacity);
        createTable({ ...formData, capacity })
            .then(() => {
                // setFormData({ ...INITIAL_FORM_STATE });
                history.push(`/dashboard`);
            })
            .catch((error) => {
                const splitError = error.message.split("|");
                setErrors(splitError);
            }
            );
    }

    const errorMessage = (
        <div className="alert alert-danger">
            Please fix the following errors:
            <ul>
                {errors.map((error, index) => {
                    return <li key={index}>{error}</li>;
                })}
            </ul>
        </div>
    )

    return (
        <form name="table" onSubmit={handleSubmit}>
            <h1>Create Table</h1>
            {errors.length ? errorMessage : null}
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label htmlFor="table_name">Table Name</label>
                        <input
                            id="table_name"
                            name="table_name"
                            type="text"
                            required
                            placeholder="Table Name"
                            onChange={handleChange}
                            value={formData.table_name}
                            pattern="^[a-zA-Z0-9]{2,}$"
                            // pattern="/(.*[a-z]){2}/i"
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="capacity">Capacity</label>
                        <input
                            id="capacity"
                            name="capacity"
                            type="number"
                            min="1"
                            step="1"
                            placeholder={formData.capacity}
                            onChange={handleChange}
                            value={formData.capacity}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
            </div>
            <button className="btn btn-danger mr-2" type="cancel" onClick={() => history.go(-1)}>Cancel</button>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}

export default TableForm;