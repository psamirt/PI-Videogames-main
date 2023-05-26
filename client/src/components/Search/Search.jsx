import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../redux/Actions";
import { getGames } from "../../redux/Actions";
import "./Search.css"

const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputchange = (e) => {
    e.preventDefault()
    if(e.target.value === ""){
      dispatch(getGames())
    }else{
      setName(e.target.value)
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(getName(name))
  }

  return (
    <div className="search-container">
      <input type="text" placeholder="Buscar..." onChange={handleInputchange} />
      <button type="submit" onClick={handleSubmit} >Buscar</button>
    </div>
  );
};

export default Search;
