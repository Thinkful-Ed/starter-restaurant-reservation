import React from "react";


function Search(){

    return(
        <main>
      <h1>Search</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Search for Reservation</h4>
        <input name="mobile_number"
              type="phone"
              placeholder="Enter a customer's phone number" />
              <button type="submit" className="btn btn-primary mr-3">Find</button>
      </div>
    </main>
  );
    
}
export default Search;