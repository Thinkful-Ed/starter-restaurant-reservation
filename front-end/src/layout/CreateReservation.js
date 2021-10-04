import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom"


function CreateReservation(){

    const history= useHistory();

    return (
        <>
        <h1>Make a Reservation</h1>
        <form>
            <div className="container">
            <div className="form-group">
                <label for="first_name">
                    First Name:
                    <input 
                        type="text" 
                        id="first_name" 
                        name="first_name"
                    />
                </label>
            </div>
            
            <div className="form-group">
                <label for="last_name">
                    Last Name:
                    <input 
                        type="text" 
                        id="last_name" 
                        name="last_name"
                    />
                </label>
            </div>

            <div className="form-group">
                <label for="mobile_number">
                    Phone number: 
                    <input 
                        type="tel" 
                        id="telNo" 
                        name="mobile_number" 
                        placeholder="123-456-7890"
                    />
                </label>
            </div>

            <div className="form-group">
                <label for="reservation_date">
                    Reservation Date: 
                    <input 
                        type="date" 
                        id="reservation_date" 
                        name="reservation_date" 
                    />
                </label>
            </div>

            <div className="form-group">
                <label for="reservation_time">
                    Reservation Time: 
                    <input 
                        type="time" 
                        id="reservation_time" 
                        name="reservation_time" 
                    />
                </label>
            </div>

            <div className="form-group">
                <label for="people">
                    Number of People in Party: 
                    <input 
                        type="number" 
                        id="people" 
                        name="people"
                        min="1" 
                        max="100"
                    />
                </label>
            </div>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
            <button type="button" className="btn btn-secondary" onClick={()=> history.goBack()}>Cancel</button>
            
 
        </form>
        </>
    )
 /*
 
 
 Submit button that when clicked saves new reservation and displays the dashboard page for date of the new reservation
 any error messages returned from API
*/
}

export default CreateReservation;