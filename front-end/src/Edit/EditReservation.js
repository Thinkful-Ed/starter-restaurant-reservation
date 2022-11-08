import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { editReservation, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import EditReservationForm from "./EditForm";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [editFormData, setEditFormData] = useState({ ...initialFormState });

  const [editError, setEditError] = useState(null);

  useEffect(loadReservation, [reservation_id]);

  //calls readReservation for specific reservation_id, then sets editFormData to keys and values that were read
  function loadReservation() {
    const abortController = new AbortController();
    setEditError(null);
    readReservation(reservation_id, abortController.signal)
      .then(setEditFormData)
      .catch(setEditError);
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    setEditFormData({
      ...editFormData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setEditError(null);
    const formatReservation = {
      ...editFormData,
      people: Number(editFormData.people),
    };

    editReservation(reservation_id, formatReservation, abortController.signal)
      .then(() => {
        history.push(`/dashboard?date=${editFormData.reservation_date}`);
      })
      .catch(setEditError);
    return () => abortController.abort();
  };

  const handleCancel = (event) => history.go(-1);

  return (
    <React.Fragment>
      <ErrorAlert error={editError} />
      <EditReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        first_name={editFormData.first_name}
        last_name={editFormData.last_name}
        mobile_number={editFormData.mobile_number}
        reservation_date={editFormData.reservation_date}
        reservation_time={editFormData.reservation_time}
        people={editFormData.people}
      />
    </React.Fragment>
  );
}

export default EditReservation;
