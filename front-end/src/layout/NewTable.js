import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import TableForm from "./TableForm";
import { createTable } from "../utils/api.js";
import ErrorAlert from "./ErrorAlert";

function NewTable() {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: ""
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    console.log(formData)
    event.preventDefault();
    setErrorMessage(null);
    const ac = new AbortController();
    formData.capacity = Number(formData.capacity);
     createTable({ data: formData }, ac.signal)
     
     .then(() => {
      history.push(`/dashboard`);
     })
     .catch(setErrorMessage)   
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const goHome = () => {
    history.goBack();
  };

  const reload = () => {
    window.location.reload();
  };

  if (errorMessage) {
    return (
      <div>
        <ErrorAlert error={errorMessage} />
        <button type="button" class="btn btn-info ml-2" onClick={goHome}>
          Home Page
        </button>
        <button type="button" class="btn btn-info ml-2" onClick={reload}>
          Try Again
        </button>
      </div>
    );
  } else {
    return (
      <TableForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    );
  }
}

export default NewTable;
