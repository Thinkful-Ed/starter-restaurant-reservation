import {useHistory} from "react-router-dom";
import {useState} from "react";
import {createTable} from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"
import { today } from "../utils/date-time"

function NewTable() {
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [inputData, setInputData] = useState({ ...initialFormState });

  const changeHandler = ({ target }) => {
    let value = target.value;
    if (target.name === "capacity" && typeof value === "string") {
      value = Number(value);
    }
console.log("val", value)
    setInputData({
      ...inputData,
      [target.name]: value,
    });
  };
  console.log("Input29", inputData)
  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();
    setTablesError(null);
    console.log("Input", inputData)
    createTable(inputData, abortController.signal)
      .then(() => history.push(`/dashboard?date=${today()}`))
      .catch(setTablesError);
    return () => abortController.abort();
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const newTableBtns = () => (
    <>
      <button
        type="submit"
        className="col btn btn-primary mb-2 mt-2"
      >
        Submit
      </button>
      <button
        type="cancel"
        className="col btn btn-danger mt-2"
        onClick={cancelHandler}
      >
        Cancel
      </button>
    </>
  );
//onSubmit always on form
  return (
    <>
      <h1 className="mt-3 mb-4">New Table</h1>
      <ErrorAlert error={tablesError}/>
      <div className="d-flex justify-content-center">
        <form onSubmit={submitHandler}>  
          <label className="row">Table Name:</label>
          <input
            onChange={changeHandler}
            className="row"
            type="text"
            id="table_name"
            name="table_name"
            required={true}
          ></input>
          <label className="row">Capacity:</label>
          <input
            onChange={changeHandler}
            className="row"
            type="number"
            id="capacity"
            name="capacity"
            required={true}
            min="1"
          ></input>
          <div className="mt-3 text-center">{newTableBtns()}</div>
        </form>
      </div>
    </>
  );
}
export default NewTable;
