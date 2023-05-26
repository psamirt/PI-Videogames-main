import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Filter.css";
import {
  filtersAZ,
  filtersRating,
  filterByGenre,
  filterByOrigin,
  reset,
  // filterbyPlatform,
  getGenre,
  getGames,
} from "../../redux/Actions";

const Filter = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  // const allGames = useSelector((state) => state.allGames);
  const [selectedAZ, setSelectedAZ] = useState("0");
  const [selectedRating, setSelectedRating] = useState("0");
  const [selectedGenre, setSelectedGenre] = useState("0");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("0");

  const filtroAZ = (e) => {
    setSelectedAZ(e.target.value);
    dispatch(filtersAZ(e.target.value));
  };

  const filtroRating = (e) => {
    setSelectedRating(e.target.value);
    dispatch(filtersRating(e.target.value));
  };

  const filtroGenre = (e) => {
    setSelectedGenre(e.target.value);
    dispatch(filterByGenre(e.target.value));
  };

  const filtroFrom = (e) => {
    setSelectedOrigin(e.target.value);
    dispatch(filterByOrigin(e.target.value));
  };

  // const filterPlatform = (e) => {
  //   setSelectedPlatform(e.target.value);
  //   dispatch(filterbyPlatform(e.target.value));
  // };
  const handleReset = () => {
    setSelectedAZ("0");
    setSelectedRating("0");
    setSelectedGenre("0");
    setSelectedOrigin("all");
    setSelectedPlatform("0");
    dispatch(reset());
  };

  useEffect(()=>{
    dispatch(getGenre())
  },[])

  useEffect(()=>{
    dispatch(getGames())
  },[])

  return (
    <div className="filter-container">
      <div>
        <select
          className="select-general"
          onChange={filtroAZ}
          name="orderAZ"
          id="orderAZ-ZA"
          value={selectedAZ}
        >
          <option className="options-filter" value="0">
            Ordenar
          </option>
          <option className="options-filter" value="asc">
            A-Z
          </option>
          <option className="options-filter" value="dsc">
            Z-A
          </option>
        </select>
      </div>
      <div>
        <select
          className="select-general"
          onChange={filtroRating}
          name="orderRating"
          id="orderR"
          value={selectedRating}
        >
          <option className="options-filter" value="0">
            Calificación
          </option>
          <option className="options-filter" value="ma-me">
            0-5
          </option>
          <option className="options-filter" value="me-ma">
            5-0
          </option>
        </select>
      </div>
      <div>
        <select
          className="select-general"
          onChange={filtroFrom}
          name="filterOrigin"
          id="origiFilter"
          value={selectedOrigin}
        >
          <option className="options-filter" value="all">
            Origen
          </option>
          <option className="options-filter" value="created">
            Creados
          </option>
          <option className="options-filter" value="api">
            Api
          </option>
        </select>
      </div>
      {/* <div>
        <select
          className="select-general"
          onChange={filterPlatform}
          name="filterPlatform"
          id="platformFilter"
          value={selectedPlatform}
        >
          <option className="options-filter" value="0">
            Plataformas
          </option>
          {Array.from(new Set(allGames.flatMap((game) => game.platforms))).map(
            (platform) => (
              <option
                className="options-filter"
                key={platform}
                value={platform}
              >
                {platform}
              </option>
            )
          )}
        </select>
      </div> */}
      <div>
        <select
          className="select-general"
          onChange={filtroGenre}
          name="filterGenre"
          id="genreFilter"
          value={selectedGenre}
        >
          <option className="options-filter" value="0">
            Géneros
          </option>
          {allGenres.map((genre) => (
            <option
              className="options-filter"
              key={genre.name}
              value={genre.name}
            >
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <button className="button-reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Filter;
