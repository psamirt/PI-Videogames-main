import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Create.css";
import { getGames, getGenre, postGame } from "../../redux/Actions";

const Create = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const allGames = useSelector((state) => state.allGames);

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    platforms: [],
    releaseDate: "",
    rating: "",
    genre: [],
  });
  const [errors, setErrors] = useState({
    name: "Nombre",
    image: "Imagen",
    description: "Descripción",
    releaseDate: "Fecha de lanzamiento",
    rating: "Calificacion",
  });

  const validate = (input, name) => {
    const urlRegex = /^(?:\/\/|[^\/]+\/)(?:\S+\/)*\S+\.(?:jpg|jpeg|gif|png)$/i;
    const ratingRegex = /^([0-5](\.\d+)?)$/;

    if (name === "name") {
      if (input.name !== "") setErrors({ ...errors, name: "" });
      else setErrors({ ...errors, name: "Nombre requerido" });
      return;
    }
    if (name === "image") {
      if (input.image !== "") setErrors({ ...errors, image: "" });
      else setErrors({ ...errors, image: "Imagen URL requerida" });
      if (urlRegex.test(input.image)) setErrors({ ...errors, image: "" });
      else setErrors({ ...errors, image: "Formato incorrecto, ingrese URL" });
      return;
    }
    if (name === "description") {
      if (input.description !== "") setErrors({ ...errors, description: "" });
      else setErrors({ ...errors, description: "Descripción requerida" });
      return;
    }

    if (name === "releaseDate") {
      if (input.releaseDate !== "") setErrors({ ...errors, releaseDate: "" });
      else
        setErrors({
          ...errors,
          releaseDate: "Fecha de lanzamiento requeridas",
        });
      return;
    }
    if (name === "rating") {
      if (input.rating !== "") setErrors({ ...errors, rating: "" });
      else setErrors({ ...errors, rating: "Calificacion requerido" });
      if (ratingRegex.test(input.rating)) setErrors({ ...errors, rating: "" });
      else
        setErrors({
          ...errors,
          rating: "Rating solo puede ser de 0 a 5 incluyendo decimales.",
        });
      return;
    }
  };

  const disable = () => {
    let genreValid = false;
    let platformsValid = false;
    let textValid = true;
    for (let error in errors) {
      if (errors[error] !== "") {
        textValid = false;
        break;
      }
    }
    if (input.genre.length > 0) {
      genreValid = true;
    }
    if (input.platforms.length > 0) {
      platformsValid = true;
    }
    return !(genreValid && platformsValid && textValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postGame(input));
    setInput({
      name: "",
      image: "",
      description: "",
      platforms: [],
      releaseDate: "",
      rating: "",
      genre: [],
    });
    e.target.reset();
    setErrors({
      name: "Nombre",
      image: "Imagen",
      description: "Descripción",
      releaseDate: "Fecha de lanzamiento",
      rating: "Calificacion",
    });
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validate(
      {
        ...input,
        [e.target.name]: e.target.value,
      },
      e.target.name
    );
  };

  const handleCheckGenre = (e) => {
    const selected = e.target.value;
    const isChecked = e.target.checked;
    let updatedGenres = input.genre;
    if (isChecked) {
      updatedGenres.push(selected);
    } else {
      updatedGenres = updatedGenres.filter((element) => element !== selected);
    }
    setInput({ ...input, genre: updatedGenres });
  };

  const handleCheckPlatforms = (e) => {
    const selected = e.target.value;
    const isChecked = e.target.checked;
    let updatedPlatforms = input.platforms;
    if (isChecked) {
      updatedPlatforms.push(selected);
    } else {
      updatedPlatforms = updatedPlatforms.filter(
        (element) => element !== selected
      );
    }
    setInput({ ...input, platforms: updatedPlatforms });
  };

  useEffect(() => {
    dispatch(getGenre());
  }, []);

  useEffect(() => {
    dispatch(getGames());
  }, []);

  return (
    <div className="container-form">
      <div className="container-inputs">
        {console.log(input, errors)}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label-nombre">
              {errors["name"]}
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              placeholder={"..."}
              maxLength={80}
            />
          </div>
          <div className="form-group">
            <label htmlFor="released-date" className="label-fecha">
              {errors["releaseDate"]}
            </label>
            <input
              type="date"
              name="releaseDate"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating" className="label-rating">
              {errors["rating"]}
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="5"
              name="rating"
              className="form-control"
              onChange={handleChange}
              placeholder={"0.1 - 5"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="label-imagen">
              {errors["image"]}
            </label>
            <input
              type="text"
              name="image"
              className="form-control"
              onChange={handleChange}
              placeholder={"URL"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="label-description">
              {errors["description"]}
            </label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              onChange={handleChange}
              placeholder={"Ingresar..."}
              maxLength={1000}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre" className="label-nombre">
              Generos
            </label>
            <div className="genre-container">
              {allGenres.map((genre) => (
                <div key={genre.id} className="genre-checkbox-container">
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    name="genre"
                    value={genre.name}
                    onChange={handleCheckGenre}
                    checked={input.genre.includes(genre.name)}
                  />
                  <label className="label-check" htmlFor="genre">
                    {genre.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="platforms" className="label-nombre">
              Plataformas
            </label>
            <div className="platforms-container">
              {Array.from(
                new Set(allGames.flatMap((game) => game.platforms))
              ).map((platforms) => (
                <div className="platforms-checkbox-container" key={platforms}>
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    name="platforms"
                    value={platforms}
                    onChange={handleCheckPlatforms}
                    checked={input.platforms.includes(platforms)}
                  />
                  <label className="label-check" htmlFor={platforms}>
                    {platforms}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="button-container">
            <button disabled={disable()} type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
