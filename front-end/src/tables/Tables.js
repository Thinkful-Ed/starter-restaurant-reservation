import React from "react";

import {useHistory} from "react-router-dom";

function Tables(){
  const history = useHistory();

return(
    <main>
    <h1>Tables</h1>
    <div className="d-md-flex mb-3">
      <h4 className="mb-0">Create a new Table</h4>

      <input name="table_name" />
      <input name="capacity" />
      <button type="submit" className="btn btn-primary mr-3">Submit</button>
                    <button  type="button" onClick={()=> history.goBack()} className="btn btn-danger">Cancel</button>

    </div>
  </main>

);

}

export default Tables