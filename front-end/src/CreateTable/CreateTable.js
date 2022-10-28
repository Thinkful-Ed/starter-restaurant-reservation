import React, { useState } from "react";
import { useHistory } from "react-router";
import { createNewTable } from "../utils/api";

function CreateTable() {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted", formData);
    const formatNewTable = {
      ...formData,
      capacity: Number(formData.capacity),
    };
    const abortController = new AbortController();
    await createNewTable(formatNewTable, abortController.signal);
    history.push(`/dashboard`);
    return () => abortController.abort();
  };

  return (
    <React.Fragment>
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
                    required
                    placeholder="Table name"
                    onChange={handleChange}
                    value={formData.table_name}
                  />
                </div>

                <div className="form-group col">
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="capacity"
                    id="capacity"
                    required
                    min="1"
                    onChange={handleChange}
                    value={formData.capacity}
                  />
                </div>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.goBack()}
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
