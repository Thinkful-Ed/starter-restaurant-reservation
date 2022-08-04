import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
const ac = new AbortController();

export default function Table() {
  const initialTableData = {
    table_name: "",
    capacity: "",
  };
  const [tableData, setTableData] = useState({ ...initialTableData });
  const history = useHistory();

  function changeHandler({ target }) {
    let tableValue = target.value;
    if (target.name === "capacity" && tableValue) {
      tableValue = parseInt(tableValue, 10);
    }
    setTableData({ ...tableData, [target.name]: tableValue });
  }

  function submitTableHandler(event) {
    event.preventDefault();
    async function addTableToList() {
      try {
        await createTable(tableData, ac.signal);
        setTableData({ ...initialTableData });
        history.push(`/dashboard`);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    addTableToList();
    return () => ac.abort();
  }
  return (
    <>
      <style>{"body { background-color: #f7f4f180; }"}</style>
      <form onSubmit={submitTableHandler}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="table_name"
                  type="text"
                  required={true}
                  value={tableData.name}
                  onChange={changeHandler}
                  minLength="2"
                />
              </td>
              <td>
                <input
                  name="capacity"
                  type="text"
                  required={true}
                  value={tableData.capacity}
                  onChange={changeHandler}
                  min="1"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </>
  );
}
