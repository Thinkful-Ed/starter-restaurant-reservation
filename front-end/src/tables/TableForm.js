import React, { useState } from "react";
import { addTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function TableForm(){
    const [table, setTable] = useState({
        table_name: "",
        capacity: "",
    });

    const [tablesError, setTablesError] = useState(null);
    const history = useHistory();

    function handleChange(event){
        setTable({ ...table, [event.target.name]: event.target.value })
    }

    function handleSubmit(event){
        event.preventDefault()
        addTable(table)
            .then(() => {
                history.push(`/dashboard`);
            })
            .catch(setTablesError);
    }

    return (
        <div>
            <h1>New Table</h1>
            <ErrorAlert error={tablesError} />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="table_name">Table Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="table_name"
                        placeholder="Enter table name"
                        value={table.table_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        className="form-control"
                        type="text"
                        name="capacity"
                        placeholder="Enter seating capacity"
                        value={table.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="btns">
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                    <button
                        onClick={() => history.goBack()}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}


export default TableForm;