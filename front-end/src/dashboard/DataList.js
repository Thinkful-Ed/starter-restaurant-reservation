import React from "react";
import {useHistory} from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

const DataList = ({reservations, date}) => {
    const history = useHistory();
    //console.log(date)
    function todayClick(){
        history.push(`/dashboard?date=${today()}`)
    }

    function previousClick(){
        history.push(`/dashboard?date=${previous(date)}`)
    }

    function nextClick(){
        history.push(`/dashboard?date=${next(date)}`)
    }
  return (
    <div>
      <div className="button-section">
        <button onClick={previousClick} className="previous">Previous</button>
        <button onClick={todayClick} className="today">Today</button>
        <button onClick={nextClick} className="next">Next</button>
      </div>
      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>DATE</th>
              <th>TIME</th>
              <th>PEOPLE</th>
              <th>STATUS</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((val, idx) => (
              <tr key={idx}>
                <td>{val.reservation_id}</td>
                <td>
                 { `${val.last_name} ${val.first_name}`}
                </td>
                <td>{val.mobile_number}</td>
                <td>{val.reservation_date}</td>
                <td>{val.reservation_time}</td>
                <td>{val.people}</td>
                <td>booked</td>
                <td>
                  <button>Seat</button>
                </td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataList;
