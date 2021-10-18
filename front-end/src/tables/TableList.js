import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, finishTable } from "../utils/api";

/*compnent renders the list of tables with their names and capacity where reservations may be seated on the dashboard. 
It is also used in the selector in SeatReservation*/
function TableList() {

  /*state holds all returned data from api call to "tables" table*/
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

  /*when "finish" button is clicked and confirmed reservation status is changed to "finished"*/
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

  /*map through all tables to render as a table*/
  const tableList = tables.map(
    ({ reservation_id, table_name, capacity, table_id }) => (
      <tbody key={table_id}>
        <tr>
          <td>{table_name}</td>
          <td>{capacity}</td>
          <td data-table-id-status={table_id}>
            {reservation_id ? "occupied" : "free"}
          </td>
          <td>
            {reservation_id ? (
              <button
                data-table-id-finish={table_id}
                type="button"
                onClick={() => handleFinish(table_id)}
              >
                Finish
              </button>
            ) : null}
          </td>
        </tr>
      </tbody>
    )
  );

  /*JSX renders TableList*/
  return (
    <>
      <div>
        <ErrorAlert error={tablesError} />
        <ErrorAlert error={finishTableError} />
        <table className="table table-info">
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
