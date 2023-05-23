import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="card-container">
      <Link to={`/details/${props.id}`}>
        <div className="card-tittle">
          <h2>{props.name}</h2>
        </div>
        <div className="card-genre">
          <h4>
            Generos:{" "}
            {Array.isArray(props.genre) ? props.genre.join(" - ") : props.genre}
          </h4>
        </div>
        <div className="card-image">
          <img className="image" src={props.image} alt={props.name} />
        </div>
        <div className="card-platform">
          <h4>
            {Array.isArray(props.platforms)
              ? props.platforms.join(" - ")
              : props.platforms}
          </h4>
        </div>
        <div className="card-rating">
          <h4>Calificación {props.rating}</h4>
        </div>
      </Link>
    </div>
  );
};

export default Card;
