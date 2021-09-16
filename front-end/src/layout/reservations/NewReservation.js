import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {createReservation} from "../../utils/api";
import { today } from "../../utils/date-time";
import ErrorAlert from "../ErrorAlert";

function NewReservation() {
  const [reservation, setReservation] = useState({
    first_name : "",
    last_name : "",
    mobile_number : "",
    people : 1,
    reservation_date : today(),
    reservation_time : "",
  })  
  const history = useHistory();
  const [mobile, setMobile] = useState("");
  const [createError, setCreateError] = useState(null);
  
  function mobileChangeHandler({ target: { value } }) {
    let clearedValue = value.replace(/[^0-9]/g, "");
    if (clearedValue.length > 10) {
      clearedValue = clearedValue.slice(0, 10);
    }
    const numbers = clearedValue.split("");
    for (let i = numbers.length; i < 10; i++) {
      numbers.push(" ");
    }
    const area = numbers.slice(0, 3).join("");
    const pre = numbers.slice(3, 6).join("");
    const tel = numbers.slice(6).join("");
    const result = `(${area}) ${pre}-${tel}`;
    setMobile(result);
  }

  function cancelHandler(){
      history.goBack();
  }

  function tuesday(){
    const date = new Date(reservation.reservation_date);
    const day = date.getDay();
    if ( day === 2 ){
      
    }
  }

  function submitHandler(event){
      event.preventDefault();
      reservation.mobile_number = mobile.replace(/[^0-9]/g,"");
      reservation.people = Number(reservation.people);
      console.log(reservation.reservation_date);
      createReservation(reservation)
        .then( () => history.push(`/dashboard?date=${reservation.reservation_date}`) )
        .catch(setCreateError);
  } 

  function changeHandler({ target: { name, value } }){
      setReservation( (reservation) => ({...reservation, [ name ]: value }));
  }

  return (  
    <form onSubmit={submitHandler} className="border border-1 p-4 m-4 ">
      <div>
          <ErrorAlert error={createError} />
      </div>
      <div className="card ">
        <div className="card-header alert alert-primary">New Reservation</div>
        <div className="card-body">
          <div className="row">
            <div className="form-group col-4">
              <label htmlFor="first_name">First Name</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-primary text-white">
                    {" "}
                    <i className="oi oi-person"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  id="first_name"
                  placeholder="John"
                  required
                  value={reservation.first_name}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form-group col-4">
              <label htmlFor="last_name">Last Name</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-primary text-white">
                    {" "}
                    <i className="oi oi-person"></i>{" "}
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  id="last_name"
                  placeholder="Smith"
                  required
                  value={reservation.last_name}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form-group col-4">
              <label htmlFor="mobile_number">Tel</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-primary text-white">
                    +1
                  </span>
                </div>
                <input
                  type="tel"
                  className="form-control"
                  name="mobile_number"
                  id="mobile_number"
                  // placeholder="(123) 456-7890"
                  // pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                  required
                  value={mobile}
                  onChange={mobileChangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-4">
              <label htmlFor="people">Number of party</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-primary text-white">
                    {" "}
                    <i className="oi oi-people"></i>
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  name="people"
                  id="people"
                  placeholder="2"
                  min="1"
                  max="30"
                  required
                  value={reservation.people}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form-group col-4">
              <label htmlFor="reservation_date">Reservation Date</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-primary text-white">
                    {" "}
                    <i className="oi oi-calendar"></i>{" "}
                  </span>
                </div>
                <input
                  type="date"
                  className="form-control"
                  name="reservation_date"
                  id="reservation_date"
                  required
                  value={reservation.reservation_date}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="form-group col-4">
              <label htmlFor="reservation_time">Reservation Time</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-primary text-white">
                    <i className="oi oi-clock"></i>
                  </span>
                </div>
                <input
                  type="time"
                  className="form-control"
                  name="reservation_time"
                  id="reservation_time"
                  required
                  value={reservation.reservation_time}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-2 mr-2">Submit</button>
      <button type="button" className="btn btn-secondary mt-2" onClick={cancelHandler}>Cancel</button>

    </form>
  );
}

export default NewReservation;
