import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findRes, updateRes } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import { notTuesday, inTheFuture } from "../utils/date-time";



export default function EditRes(){
    const history = useHistory();
    const { reservation_id } = useParams();
    const [err, setErr] = useState(null);
    const [resData, setResData] = useState(null);

      useEffect(()=> {
        async function loadRes(){
        const abortController = new AbortController();
        try {
            const res = await findRes(reservation_id, abortController.signal);
            setResData({...res, reservation_time: res.reservation_time.slice(0,5)});
        } catch (err) {
            setErr(err);
        }
        return ()=> abortController.abort();
        }
        loadRes();
      }, [reservation_id]);

      function findErrors(reservation, errs){
        notTuesday(reservation.reservation_date, errs);
        inTheFuture(reservation.reservation_date, errs);
        if(reservation.status && reservation.status !== "booked"){
            errs.push("Reservation can no longer be changed");
        }
      }

      async function handleSubmit(event){
        console.log("handleSubmit called:", resData);
        event.preventDefault();
        const abortController = new AbortController();
        const errs = [];
        findErrors(resData, errs);
        if (errs.length){
            setErr({ message: errs });
            console.log(errs);
            return;
        }
        try {
            resData.people = Number(resData.people);
            await updateRes(reservation_id, resData, abortController.signal);
            history.push(`/dashboard?date=${resData.reservation_date}`);
        } catch(err) {
          console.log(err);
            setErr(err);
        } 
        return ()=> abortController.abort;
      }

      function handleChange(event){
        setResData({
            ...resData,
            [event.target.name]: event.target.value,
        });
      }

    return (
       <>
        <ErrorAlert error={err}/>
        <ReservationForm
            initialFormData={resData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
        </>
    )
  }