import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "../forms/TableForm";

function TableUpdate() {

    // const history = useHistory();
    const [tableErrors, setTableErrors] = useState([]);
    const [table, setTable] = useState({
        table_name: "",
        capacity: 1,
    });
     const history =useHistory();

 const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    
       try {
        const updatedTable = await  updateTable(table, abortController.signal);
        console.log("Table updated successfully:", updatedTable);
        history.push("/dashboard");
    } 
    catch (error) {
        console.error("Error during update of table:", error);
        setTableErrors([error.response?.data?.error || error.message || "Unknown error occurred."]);
        abortController.abort();
    }
 
};

return (
    <div>
        <h1 className="mb-3">Table Assignment</h1>
        <ErrorAlert errors={tableErrors} />
        <div><TableForm table={table} setTable={setTable} submitHandler={submitHandler} /></div> 
    </div>
  );

}

export default TableUpdate;