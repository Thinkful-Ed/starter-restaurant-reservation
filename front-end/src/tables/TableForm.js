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
        event.preventDefault();
        addTable(table)
            .then(() => {
                history.push("/dashboard");
            })
            .catch(setTablesError);
    }

    function handleCancel() {
        history.goBack();
      }

    return (
        <div>
            <div className="d-flex justify-content-center my-4">
            <h2>New Table</h2>
            </div>
            <ErrorAlert error={tablesError} />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="table_name">Table Name</label>
                    <input
                        className="form-control bg-secondary bg-opacity-10"
                        type="text"
                        name="table_name"
                        placeholder="Enter table name"
                        value={table.table_name}
                        onChange={handleChange}
                        minLength={2}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        className="form-control bg-secondary bg-opacity-10"
                        type="text"
                        name="capacity"
                        placeholder="Enter seating capacity"
                        value={table.capacity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <div className="btns mt-5 d-flex justify-content-center">
                    <button className="btn btn-primary mr-2" type="submit">
                        Submit
                    </button>
                    <button
                        onClick={handleCancel}
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