import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  listTables,
  loadTable,
  seatReservation,
  loadReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

import Form from "../form/Form";

function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [seatError, setSeatError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const initialFormState = {
    table_id: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  function validate(seat) {
    const errors = [];

    async function isMore({ table_id }) {
      const { capacity } = await loadTable(table_id);
      const { people } = await loadReservation(reservation_id);
      if (people > capacity)
        errors.push(
          new Error(
            "The number of people reserved exceeds the seating capacity of this table. Please select another table."
          )
        );
    }

    isMore(seat);

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const formErrors = validate(formData);
    if (formErrors.length) {
      console.error(formErrors);
      return setSeatError(formErrors);
    }

    try {
      await seatReservation(reservation_id, Number(formData.table_id));
      history.push("/dashboard");
    } catch (err) {
      console.error(err);
      setSeatError(err);
    }
  }

  const handleCancel = () => {
    history.goBack();
  };

  const options = tables.map(({ table_id, table_name, capacity }) => [
    table_id,
    `${table_name} - ${capacity}`,
  ]);

  const tableNumber = {
    type: "select",
    id: "table",
    name: "table_id",
    options: options,
    required: true,
  };

  const inputs = [tableNumber];

  return (
    <>
      <div className="d-flex flex-column">
        <h2>Seat Reservation</h2>
        <ErrorAlert error={tablesError} />
        <Form
          inputs={inputs}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
        <ErrorAlert error={seatError} />
      </div>
    </>
  );
}

export default SeatReservation;
