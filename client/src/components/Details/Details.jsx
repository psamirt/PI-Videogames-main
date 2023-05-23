import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/Actions";
import "./Details.css";
import { useHistory } from "react-router-dom";

const Details = (props) => {
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, []);

  function handleClick() {
    history.goBack();
  }

  return (
    <div className="detail-container">
      <div>
      <button className="back-button" onClick={handleClick}>Atrás</button>
      </div>
      <div className="container-detail-name">
        <h1 className="text-name">{detail.name}</h1>
      </div>
      <div className="container-rating-released-platform-genre">
        <h4 className="text-container">
          Fecha de lanzamiento: <div className="inside"> *{detail.released}</div>
        </h4>
        <h4 className="text-container">Calificación: <div className="inside">* {detail.rating}</div></h4>
        <h4 className="text-container">
          Plataformas: <div className="inside"> *{Array.isArray(detail.platforms) ? detail.platforms.join(" - ") : detail.platforms}</div>
        </h4>
        <h4 className="text-container">Generos: <div className="inside">* {Array.isArray(detail.genre) ? detail.genre.join(" - ") : detail.genre}</div></h4>
      </div>
      <div className="container-image-description">
        <img className="detail-image" src={detail.image} alt="" />
        <div className="container-description">
        <h3 className="titulo-desctipcion" >Descripcion</h3> 
        <p className="description-text">{detail.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
