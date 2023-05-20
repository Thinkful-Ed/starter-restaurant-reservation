import React from "react";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";

function NewTable() {
    const initialFormState = {
        table_name: "",
        capacity: "",
        status: "Free",
    }

    function apiHandler(formData) {
        return createTable(formData)
    }

    return <div>
        <TableForm initialFormState={initialFormState} apiHandler={apiHandler}/>
    </div>
}

export default NewTable