import React from "react";
import { useHistory } from "react-router-dom";

function ReservationCreate() {
  const history = useHistory();

  function cancelHandler() {
    history.push("/");
  }

  function submitHandler(event) {
    event.preventDefault();
    history.push("/");
  }
 
  return (
    <main>
        <h1>Create Reservation</h1>
        <p>Later, input fields will be added here</p>
        <form onSubmit={submitHandler}>
            <div>
                <button 
                    type="button" 
                    className="btn btn-secondary mr-2"
                    onClick={cancelHandler}
                
                >Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                >Submit
                </button>
            </div>
        </form>
    </main>
  );

}

export default ReservationCreate;