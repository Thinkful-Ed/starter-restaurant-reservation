import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, finishTable } from "../utils/api";

function TableList() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState("");

  const [finishTableError, setFinishTableError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }, []);

  const handleFinish = (tableId) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setFinishTableError(null);
      finishTable(tableId, abortController.signal)
        .then(() => history.go(0))
        .catch(setFinishTableError);
      return () => abortController.abort();
    }
  };

  const tableList = tables.map(
    ({ reservation_id, table_name, capacity, table_id }) => (
      <tbody key={table_id}>
        <tr>
          <td>{table_name}</td>
          <td>{capacity}</td>
          <td data-table-id-status={table_id}>{reservation_id ? "occupied" : "free"}</td>
          <td>
            {reservation_id ? (
              <button  data-table-id-finish={table_id} type="button" onClick={() => handleFinish(table_id)}>
                Finish
              </button>
            ) : null}
          </td>
        </tr>
      </tbody>
    )
  );

  //JSX
  return (
    <>
      <div>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={finishTableError} />
        <table className="table">
          <thead>
            <tr>
              <td>Table Number</td>
              <td>Capacity</td>
              <td>Status</td>
            </tr>
          </thead>
          {tableList}
        </table>
      </div>
      
    </>
  );
}

export default TableList;
