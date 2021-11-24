import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cancel from "../buttons/Cancel";
import Submit from "../buttons/Submit";
import { createTableReservation, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Table({ date }) {
  const history = useHistory();

  const initialTableState = {
    table_name: "",
    capacity: 0,
  };

  const [tables, setTables] = useState([{ ...initialTableState }]);
  const [errors, setErrors] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setErrors(null);
    listTables({ date }, abortController.signal)
      .then(setTables)
      .catch(setErrors);
    return () => abortController.abort();
  }


  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const savedTable = await createTableReservation(tables);
      console.log(savedTable);
      history.push(`/dashboard?table=${savedTable}`);
      setTables({ ...initialTableState, savedTable });
    } catch (err) {
      setErrors(err);
    }
  };

  const handleChange = ({ target }) => {
    setTables({
      ...tables,
      [target.name]:
        target.name === "capacity" ? Number(target.value) : target.value,
    });
  };

  return (
    <div>
      <h1>Reserve a Table</h1>
      <ErrorAlert error={errors} />
      {JSON.stringify(tables)}
      <table onSubmit={handleSubmit} className="table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          <td>{<input onChange={handleChange} placeholder="Enter table name">{tables.table_name}</input>}</td>
          <td>{<input onChange={handleChange}>{tables.capacity}</input>}</td>
        </tbody>
      </table>
      <Cancel />
      <Submit />
    </div>
  );
}

export default Table;
