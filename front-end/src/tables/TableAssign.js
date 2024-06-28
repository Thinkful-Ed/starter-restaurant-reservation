import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import  TablesForm   from "../forms/TablesForm"
function TableAssign() {

    // const history = useHistory();
    const [tableAssignErrors, setTableAssignErrors] = useState([]);
    const [tableAssignment, setTableAssignment] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    });  
console.log("TableAssign - tableAssignErrors: ",tableAssignErrors);


return (
    <main>
        <h1 className="mb-3">Table Assignment</h1>
        <ErrorAlert errors={tableAssignErrors} />
        <div><TablesForm  tableAssignment={tableAssignment} setTableAssignment={setTableAssignment} errors={tableAssignErrors} setTableAssignErrors={setTableAssignErrors} /></div> 
    </main>
  );

}

export default TableAssign;