import React from "react"

export default function Search(){
    
    return (
        <div>
            <h1>Search</h1>
            <form>
                <label htmlFor="mobile_number">Mobile Phone Number</label>
                <div>
                    <input className="form-control" type="tel" name="mobile_number" placeholder="Enter a customer's phone number"></input>
                    <button>Search</button>
                </div>
            </form>
            {/* table list from search */}
        </div>
    )
}