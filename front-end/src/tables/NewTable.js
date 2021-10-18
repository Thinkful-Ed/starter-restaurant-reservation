import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

/*component is used to render and adds functionality to create a new table*/
function NewTable() {
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [newTable, setNewTable] = useState({ ...initialFormState });


  /*makes form controlled and considers edge case that capacity may be a string*/
  const changeHandler = ({ target }) => {
    let value = target.value;
    if (target.name === "capacity" && typeof value === "string") {
      value = Number(value);
    }
    setNewTable({
      ...newTable,
      [target.name]: value,
    });
  };


  /*submit handler creates a new table when submit btn is clicked*/
  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    setTablesError(null);
    createTable(newTable, abortController.signal)
      .then(() => history.push(`/dashboard?date=${today()}`))
      .catch(setTablesError);
    return () => abortController.abort();
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  /*renders the submit and cancel buttons*/
  const newTableBtns = () => (
    <div className="text-center">
      <button type="submit" className="btn btn-primary mr-2">
        Submit
      </button>
      <button type="cancel" className="btn btn-danger" onClick={cancelHandler}>
        Cancel
      </button>
    </div>
  );


  /*JSX renders form for NewTable */
  return (
    <>
      <div>
        <h1 className="mt-3 mb-4">New Table</h1>
        <ErrorAlert error={tablesError} />
        <div className="d-flex justify-content-center">
          <form onSubmit={submitHandler}>
            <label>Table Name:</label>
            <input
              onChange={changeHandler}
              className="form-control"
              type="text"
              id="table_name"
              name="table_name"
              required={true}
            ></input>
            <label className="mt-1">Capacity:</label>
            <input
              onChange={changeHandler}
              className="form-control"
              type="number"
              id="capacity"
              name="capacity"
              required={true}
              min="1"
            ></input>
            <br />
            {newTableBtns()}
          </form>
        </div>
      </div>
    </>
  );
}
export default NewTable;
