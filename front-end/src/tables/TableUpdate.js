import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import  NewTableForm   from "../forms/NewTableForm"

function TableUpdate() {

    // const history = useHistory();
    const [tableErrors, setTableErrors] = useState([]);
    const [table, setTable] = useState({
        table_name: "",
        capacity: 1,
    });  


return (
    <main>
        <h1 className="mb-3">Table Assignment</h1>
        <ErrorAlert errors={tableErrors} />
        <div><NewTableForm  table={table} setTable={setTable} setTableErrors={setTableErrors} /></div> 
    </main>
  );

}

export default TableUpdate;