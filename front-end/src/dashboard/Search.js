import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function Search() {
  return (
    <div className="search">
      <input type="text" placeholder="Search" />
      <button>Search</button>
    </div>
  );
}

export default Search;
