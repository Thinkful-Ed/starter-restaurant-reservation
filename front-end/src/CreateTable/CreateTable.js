import React, { useState } from "react";
import { useHistory } from "react-router";
import { createNewTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateTable() {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const [tableError, setTableError] = useState(null);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setTableError(null);
    const formatNewTable = {
      ...formData,
      capacity: Number(formData.capacity),
    };
    createNewTable(formatNewTable, abortController.signal)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch(setTableError);
    return () => abortController.abort();
  };

  const cancelButtonClick = () => history.go(-1);

  return (
    <React.Fragment>
      <ErrorAlert error={tableError} />
      <div className="col">
        <main>
          <h1>Create Reservation</h1>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="row">
                <div className="form-group col">
                  <label htmlFor="table_name">Table name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="table_name"
                    id="table_name"
                    minLength="2"
                    placeholder="Table name"
                    onChange={handleChange}
                    value={formData.table_name}
                    required
                  />
                </div>

                <div className="form-group col">
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="capacity"
                    id="capacity"
                    min="1"
                    onChange={handleChange}
                    value={formData.capacity}
                    required
                  />
                </div>
              </div>
              <br />
              <button
                style={{ backgroundColor: "#7B6A96", color: "white" }}
                type="submit"
                className="btn btn-submit"
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelButtonClick}
              >
                Cancel
              </button>
            </fieldset>
          </form>
        </main>
      </div>
    </React.Fragment>
  );
}

export default CreateTable;
