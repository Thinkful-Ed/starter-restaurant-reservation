import React, { useEffect,useState } from "react";
import Table from "./Table";
import ErrorAlert from "../layout/ErrorAlert";

function TablesList(){
  const [tables, setTables] = useState([]);
const [tablesError, setTablesError]= useState(null);

  useEffect(()=>{
    async function loadTables() {
       const abortController = new AbortController();
       try{
        //  const tablesFromAPI = await listTables( abortController.signal);
        //  setTables(tablesFromAPI);
       } catch(error){
         if (error){
           setTablesError(error)
         }
       }
       return () => abortController.abort();
       }
 
 loadTables();
   }, []);

   const list = tables.map((table) => {
    return <Table key={table.table_id} table={table} />
});
return(
    <main>
    <h2>Tables</h2>
    <div className="d-md-flex mb-3">
    <ErrorAlert error={tablesError} />
    <table className="table bordered table-striped table-hover table-condensed">
      <tbody>
        <tr>
          <td>Table Name</td>
          <td>Capacity</td>
          <td>Status</td>
        </tr>
        {list}
      </tbody>
     </table>
    </div>
  </main>

);

}

export default TablesList;