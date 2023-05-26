import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const POST_GAMES = "POST_GAMES";
export const GET_GENRE = "GET_GENRE";
export const GET_DETAIL = "GET_DETAIL";
export const CURR_PAGE = "CURR_PAGE";
export const FILTER_AZ = "FILTER_AZ";
export const RESET = "RESET";
export const FILTER_RATING = "FILTER_RATING";
export const FILTER_GENRE = "FILTER_GENRE";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const GET_NAME = "GET_NAME";

export function getGames() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/videogames/");
      return dispatch({
        type: GET_GAMES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function postGame(info) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogames/",
        info
      );
      alert("Videojuego Creado");
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: GET_NAME,
        payload: response.data,
      });
    } catch (error) {
      alert("Videojuego no encontreado");
      console.error(error);
    }
  };
}

export function getGenre() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/genres/");
      return dispatch({
        type: GET_GENRE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function pagination(payload) {
  return {
    type: CURR_PAGE,
    payload,
  };
}
export function filtersAZ(filter) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_AZ,
      payload: filter,
    });
  };
}
export function filtersRating(filterR) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_RATING,
      payload: filterR,
    });
  };
}

export function filterByGenre(genre) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_GENRE,
      payload: genre,
    });
  };
}

export function filterByOrigin(origin) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_ORIGIN,
      payload: origin,
    });
  };
}

export function reset() {
  return function (dispatch) {
    return dispatch({
      type: RESET,
    });
  };
}
