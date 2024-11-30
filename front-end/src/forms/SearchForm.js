import React from "react";
import { useHistory } from "react-router-dom";



function SearchForm({ mobileNumber, setMobileNumber, submitHandler }) {
   
    const history = useHistory();

    function cancelHandler() {
        history.goBack();
    }

    
    function changeHandler(event) {
        setMobileNumber(event.target.value);
    }

 return(
    <form onSubmit={submitHandler} className="form-group">
      <div className="row search-bar">
        <label htmlFor="mobile_number" className="col" >
        <input className="form-control"
               type="text"
               id="mobile_number"
               name="mobile_number"
               placeholder=" Enter a customer's phone number"
               value={mobileNumber}
               onChange={changeHandler}
        />
        </label>
        <div className="mb-3"> 
            <button         
                type="button" 
                className="btn btn-secondary mr-2"
                onClick={cancelHandler}
            >Cancel
            </button>
          
            <button
                type="submit"
                className="btn btn-primary"
            >Find
            </button>
        
        </div>    
    </div>
  </form>);
}

export default SearchForm;