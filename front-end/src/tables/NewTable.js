import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "",
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

    //check form validity and add validation classes
    if (!event.target.checkValidity()) {
      event.target.classList.add("was-validated");
    }

    //convert capacity to number
    formData.capacity = Number(formData.capacity);

    //validate table name length
    if (formData.table_name.length < 2) {
      errors.push({
        message: `Table must be at least 2 characters long`,
      });
    }

    //validate capacity
    if (formData.capacity < 1) {
      errors.push({
        message: `Capacity must be at least 1.`,
      });
    }

    setFormErrors(errors);

    createTable(formData, abortController.signal)
      .then((_) => {
        history.push("/dashboard");
      })
      .catch((e) => console.log(e));

    return () => abortController.abort();
  };

  let displayErrors = formErrors.map((error, index) => (
    <ErrorAlert key={index} error={error} />
  ));

  return (
    <>
      <div>
        <h1>Creaate a New Table</h1>
      </div>
      {formErrors.length > 0 && displayErrors}
      <div>
        <form noValidate={true} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="table_name">Table Name =</label>
            <input
              required
              type="text"
              placeholder="table Name"
              onChange={handleChange}
              value={formData.table_name}
              name="table_name"
            ></input>
          </div>
          <div>
            <label htmlFor="capacity">Capacity =</label>
            <input
              required
              type="text"
              placeholder="Capacity"
              min="1"
              onChange={handleChange}
              value={formData.capacity}
              name="capacity"
            ></input>
          </div>
          <button type="submit">Submit</button>
          <button onClick={history.goBack} type="button">
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
