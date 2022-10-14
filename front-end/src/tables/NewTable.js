import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewTable() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [formErrors, setFormErrors] = useState([]);

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

    if (formData.table_name.length > 2) {
      errors.push({
        message: `Table name must be at least 2 characters long.`,
      });
    }

    if (formData.capacity > 1) {
      errors.push({
        message: `Capacity must be at least 1.`,
      });
    }

    setFormErrors(errors);

    createTable(formData, abortController.signal)
      .then((_) => {
        history.push(`/dashboard`);
      })
      .catch((e) => console.log(e));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error) => (
    <ErrorAlert key={error} error={error} />
  ));

  return (
    <>
      {formErrors.length ? displayErrors : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="table_name">
            Table Name:
          </label>
          <input
            required
            type="text"
            onChange={handleChange}
            value={formData.table_name}
            className="form-control"
            name="table_name"
          ></input>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="capacity">
            Capacity:
          </label>
          <input
            required
            type="text"
            onChange={handleChange}
            value={formData.capacity}
            className="form-control"
            name="capacity"
          ></input>
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

export default NewTable;
