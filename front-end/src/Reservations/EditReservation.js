import React, {useState, useEffect} from "react";
import {useParams, Link, useHistory} from "react-router-dom"
import { updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

export default function EditReservation(){
  const { reservation_id } = useParams();

  return(
    <ReservationForm reservation_id={reservation_id} eventType="edit" />
  )
}