import React from "react"
import {formatAsTime} from "../utils/date-time"


function Reservation({reservation}){
 const{first_name, last_name, mobile_number, reservation_time, people} = reservation;

 const timeString = reservation_time.toString();
 const newTime =formatAsTime(timeString);
 const time = newTime.split(":");
 const hours = Number(time[0]);
 const minutes = Number(time[1]);
 let timeValue = null;

 if(hours > 0 && hours <=12){
     timeValue= "" + hours;
 } else if (hours >12){
     timeValue="" + (hours-12)
 } else if (hours===0){
     timeValue = "12"
 }
 timeValue += (minutes <10) ? ":0" + minutes : ":" + minutes;
 timeValue += (hours >=12) ? " P.M." : " A.M.";
 

    return(
        <div className = "card">
            <div className = "card-body">
                <h5 className="card-title">
                    Reservation for: {first_name} {last_name}
                </h5>
                <p className="card-text">Phone number: {mobile_number}</p>
                <p className="card-text">Time: {timeValue}</p>
                <p className="card-text">Party size: {people}</p>
            </div>
        </div>
    )
}

export default Reservation