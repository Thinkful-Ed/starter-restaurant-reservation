import { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";

function TableList() {
  const [tables, setTables] = useState([]);

  const [tablesError, setTablesError] = useState("");

  //const [reservation, setReservation] = useState({});


 

  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }, []);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   setReservationError(null);

  //   getReservation(reservation_id, abortController.signal)
  //     .then(setReservation)
  //     .catch(setReservationError);

  //   return () => abortController.abort();
  // }, [reservation_id]);

  const tableList = tables.map(({ reservation_id, table_name, capacity, table_id }) => (
    <tbody key={table_id}>
      <tr>
        <td>{table_name}</td>
        <td>{capacity}</td>
        <td>{reservation_id ? (<td>occupied</td>) : (<td>free</td>)}</td>
      </tr>
    </tbody>
  ));

  //JSX
  return (
    <>
      <div>
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
      <ErrorAlert error={tablesError} />
    </>
  );
}

export default TableList;
