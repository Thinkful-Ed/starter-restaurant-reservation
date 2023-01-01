import React, {useState} from "react";
import Table from "./Table";
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
// import { listTables } from "../utils/api";
import { useHistory } from "react-router-dom";
import { today } from "../utils/date-time";

function TablesList({tables}) {
  const history = useHistory();

  // const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // useEffect(() => {
  //   async function loadTables() {
  //     const abortController = new AbortController();
  //     try {
  //       const tablesFromAPI = await listTables(abortController.signal);
  //       setTables(tablesFromAPI);
  //     } catch (error) {
  //       if (error) {
  //         setTablesError(error)
  //       }
  //     }
  //     return () => abortController.abort();
  //   }

  //   loadTables();
  // }, []);
  const finishTableHandler = async (table_id) => {
    const result = window.confirm("Is this table ready to seat new guests? This cannot be undone.");
    if (result) {
      const abortController = new AbortController();
      const dashboardDate = today();
    try {
        await finishTable(table_id, abortController.signal);

        history.push(`/dashboard?date=${dashboardDate}`);
      }
    catch (error) {
        if (error) {
            setTablesError(error);
        }
    }
    return () => abortController.abort();
    } 
    
};

  const list = tables.map((table) => {
    return <Table key={table.table_id} table={table} finishTable={finishTableHandler}/>
  });
  return (
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
              <td>Action</td>
            </tr>
            {list}
          </tbody>
        </table>
      </div>
    </main>

  );

}

export default TablesList;