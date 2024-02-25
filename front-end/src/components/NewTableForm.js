import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api"; 

function NewTableForm() {
    const initialFormState = { table_name: "", capacity: "" };
    const [formData, setFormData] = useState({ ...initialFormState });
    const history = useHistory();

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.name === "capacity" ? Number(target.value) : target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        createTable(formData, abortController.signal)
            .then(() => history.push("/dashboard"))
            .catch(console.error);

        return () => abortController.abort();
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="table_name">Table Name:</label>
                <input
                    name="table_name"
                    id="table_name"
                    type="text"
                    minLength="2"
                    required
                    value={formData.table_name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="capacity">Capacity:</label>
                <input
                    name="capacity"
                    id="capacity"
                    type="number"
                    min="1"
                    required
                    value={formData.capacity}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </form>
    );
}

export default NewTableForm;
