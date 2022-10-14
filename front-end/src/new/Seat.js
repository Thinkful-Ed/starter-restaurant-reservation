import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
  const history = useHistory();

  const initialFormState = {
    table_id: 0,
  };

  const [tables, setTables] = useState([]);
  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(console.log);
  }

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setFormErrors([]);

    const errors = [];

    // **** Check of table capacity is sufficient

    // if (formData.table_name.length > 2) {
    //   errors.push({
    //     message: `Table name must be at least 2 characters long.`,
    //   });
    // }

    setFormErrors(errors);

    // **** Seat table API Call

    // createTable(formData, abortController.signal)
    //   .then((_) => {
    //     history.push(`/dashboard`);
    //   })
    //   .catch((e) => console.log(e));

    // return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
    <ErrorAlert key={error} error={error} />
  ));

  const tableList = tables.map((table) => (
    <option value={table}>{table}</option>
  ));
  return (
    <>
      {formErrors.length ? displayErrors : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="table_name">
            Table Name:
          </label>
          <select
            required
            onChange={handleChange}
            value={formData.table_name}
            className="form-control"
            name="table_id"
          >
            {tableList}
          </select>
        </div>
        <button className="btn btn-primary mx-2" type="submit">
          Submit
        </button>
        <button onClick={history.goBack} className="btn btn-secondary">
          Cancel
        </button>
      </form>
    </>
  );
}

export default Seat;
