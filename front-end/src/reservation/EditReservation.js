import React from 'react';
import FormReservation from './FormReservation';
import { useParams } from 'react-router-dom';
import { readReservation } from '../utils/api';
import { useEffect, useState } from 'react';

export default function EditReservation() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      try {
        const reservation = await readReservation(
          reservation_id,
          abortController.signal
        );
        setReservation(reservation);
      } catch (error) {
        setError(error);
      }
    }
    loadReservation();
  }
  , [reservation_id]);

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await EditReservation(reservation, abortController.signal);




  }




  return (
    <div>
      <FormReservation   reservation={reservation}
  setReservation={setReservation}
  submitHandler={submitHandler}
  error={error}
  isEditing={true}/>
    </div>
  );
}
