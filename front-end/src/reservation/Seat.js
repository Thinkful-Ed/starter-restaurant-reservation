import React from 'react';
import {useRouteMatch} from 'react-router-dom';
export default function Seat(){
  const {reservation_id} = useRouteMatch().params;
  console.log(reservation_id)

    return <><h2>This is page for seat</h2></>
}