import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { seatTable } from "../utils/api"

function SeatForm({ reservation_id, reservation_date, tables }) {
    const initialFormState = { table_id: null };
    const [formData, setFormData] = useState(initialFormState);
    const [formError, setFormError] = useState(null);
    const history = useHistory();

    const handleChange = ({ target }) => {
        setFormData({ table_id: target.value });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { table_id } = formData;
            await seatTable(table_id, {reservation_id});
            history.push(`/dashboard?date=${reservation_date}`)
        } catch(error) {
            setFormError(error);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack();
    }

    return (
        <>
            <ErrorAlert error={formError} />

            <form onSubmit={handleSubmit}>
                <label htmlFor="table">Table: </label>
                <select name="table_id" onChange={handleChange}>
                    {tables.map((table) => <option key={`res-with-table-${table.table_id}`} value={table.table_id}>{table.table_name} - {table.capacity}</option>)}
                </select>
                <button className="btn btn-primary" type="submit">Submit</button>
                <button className="btn btn-danger ml-3" type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </>
    )
}

export default SeatForm;
