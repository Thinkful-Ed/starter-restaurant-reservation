import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, seatReservation } from "../utils/api"; 

function SeatReservation() {
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState("");
    const history = useHistory();
    const { reservation_id } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        listTables(abortController.signal)
            .then(setTables)
            .catch(console.error);

        return () => abortController.abort();
    }, []);

    const handleChange = ({ target }) => {
        setTableId(target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        seatReservation(tableId, reservation_id, abortController.signal)
            .then(() => history.push("/dashboard"))
            .catch(console.error);

        return () => abortController.abort();
    };

    const handleCancel = () => {
        history.goBack();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="table_id">Choose a table:</label>
            <select
                id="table_id"
                name="table_id"
                value={tableId}
                onChange={handleChange}
                required
                className="form-control"
            >
                <option value="">-- Please select a table --</option>
                {tables.map((table) => (
                    <option key={table.table_id} value={table.table_id}>
                        {table.table_name} - {table.capacity}
                    </option>
                ))}
            </select>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </form>
    );
}

export default SeatReservation;
