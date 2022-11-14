import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";


function TableForm() {
    const initialFormState = {
        table_name: "",
        capacity: 0,
    };
    const history = useHistory();

    const [formData, setFormData] = useState(initialFormState);
    const [formError, setFormError] = useState(null);
    
    const handleChange = ({ target }) => {
        const value = target.id === "capacity" ? parseInt(target.value) : target.value;

        setFormData({
            ...formData,
           [target.name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await createTable(formData);
            history.push('/dashboard');
        } catch(error) {
            setFormError(error);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <>
            <ErrorAlert error={formError} />

            <form onSubmit={ handleSubmit }>
                <label htmlFor="table_name">
                    Table Name

                    <input 
                        id="table_name"
                        type="text"
                        name="table_name"
                        required
                        onChange={handleChange}
                        value={formData.table_name}
                    />
                </label>
                <br />
                <label htmlFor="capacity">
                    Capacity

                    <input 
                        id="capacity"
                        type="number"
                        name="capacity"
                        required
                        onChange={handleChange}
                        value={formData.capacity}
                    />
                </label>
                <br />
                <button className="btn btn-primary" type="submit">Submit</button>
                <button className="btn btn-danger ml-3" type="button" onClick={handleCancel}>Cancel</button>
            </form>
            
        </>
    );
}

export default TableForm;
