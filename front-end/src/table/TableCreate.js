import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "../forms/TableForm";
import { createTable } from "../utils/api";


function TableCreate() {

    const initalFormState = {
        table_name: "",
        capacity: 1,
    }

    const [table, setTable] = useState({ ...initalFormState });
    const [tableErrors, setTableErrors] = useState([]);
    const history = useHistory();

    const submitHandler = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();    
        try {
            const newTable = await  createTable(table, abortController.signal);
            console.log("Table created successfully:", newTable);
            history.push("/dashboard");
        } 
        catch (error) {
            console.error("Error during update of table:", error);
            setTableErrors([error.response?.data?.error || error.message || "Unknown error occurred."]);
            
        }
        finally {
            abortController.abort();
        };
    };

return (
    <div>
        <h1 className="mb-3">Table Assignment</h1>
        <ErrorAlert errors={tableErrors} />
        <div>
          <TableForm table={table} setTable={setTable} submitHandler={submitHandler} />
        </div> 
    </div>
  );

}

export default TableCreate;