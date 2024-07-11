import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "../forms/TableForm";
import { createTable } from "../utils/api";
import useSubmitHandler from "../hooks/useSubmitHandler";

function TableCreate() {

    const initialFormState = {
        table_name: "",
        capacity: 1,
    }
    
    const [table, setTable] = useState({ ...initialFormState });
    const onSuccess = (response) => "/dashboard";
    const { submitHandler, errors } = useSubmitHandler(createTable, onSuccess);
    const tableErrors = errors;

   
   
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