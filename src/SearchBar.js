import React, { useState } from "react";

function SearchBar(){
    return (
  <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;