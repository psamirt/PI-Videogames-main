import {
  GET_GAMES,
  GET_GENRE,
  GET_DETAIL,
  POST_GAMES,
  CURR_PAGE,
  FILTER_AZ,
  RESET,
  FILTER_RATING,
  FILTER_GENRE,
  FILTER_ORIGIN,
  GET_NAME,
} from "../Actions";

let initialState = {
  allGames: [],
  allGenres: [],
  detail: [],
  currentPage: 1,
  orderBolean: false,
  ratingBolean: false,
  genreBolean: false,
  originBolean: false,
  gamesAZ: [],
  gamesRating: [],
  filterByGenre: [],
  filterByOrigin: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: action.payload,
      };
    case GET_GENRE:
      return {
        ...state,
        allGenres: action.payload,
      };
    case POST_GAMES:
      return {
        ...state,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case CURR_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case FILTER_AZ:
      if (action.payload === "asc") {
        let asc = [...state.allGames].sort((prev, next) => {
          if (prev.name > next.name) return 1;
          if (prev.name < next.name) return -1;
          return 0;
        });
        return {
          ...state,
          gamesAZ: asc,
          orderBolean: true,
          currentPage: 1,
        };
      } else if (action.payload === "0") {
        return {
          ...state,
          gamesAZ: state.allGames,
          orderBolean: false,
          currentPage: 1,
        };
      } else {
        return {
          ...state,
          gamesAZ: [...state.allGames].sort((prev, next) => {
            if (prev.name > next.name) return -1;
            if (prev.name < next.name) return 1;
            return 0;
          }),
          orderBolean: true,
        };
      }
    case FILTER_RATING:
      if (action.payload === "ma-me") {
        let mayor = [...state.allGames].sort((prev, next) => {
          if (prev.rating > next.rating) return 1;
          if (prev.rating < next.rating) return -1;
          return 0;
        });
        return {
          ...state,
          gamesRating: mayor,
          ratingBolean: true,
          currentPage: 1,
        };
      } else if (action.payload === "0") {
        return {
          ...state,
          gamesRating: state.allGames,
          ratingBolean: false,
          currentPage: 1,
        };
      } else {
        return {
          ...state,
          gamesRating: [...state.allGames].sort((prev, next) => {
            if (prev.rating > next.rating) return -1;
            if (prev.rating < next.rating) return 1;
            return 0;
          }),
          ratingBolean: true,
          currentPage: 1,
        };
      }

    case FILTER_GENRE:
      const games = state.allGames;
      const genreFiltered =
        action.payload === "0"
          ? games
          : games.filter((el) => {
              const genres = el.genre || el.Genres.map((genre) => genre.name);
              return genres.includes(action.payload);
            });
      return {
        ...state,
        filterByGenre: genreFiltered,
        genreBolean: true,
        currentPage: 1,
      };

    case FILTER_ORIGIN:
      const list = state.allGames;
      const originFiltered =
        action.payload === "created"
          ? list.filter((el) => el.createdInDb)
          : list.filter((el) => !el.createdInDb);
      return {
        ...state,
        filterByOrigin:
          action.payload === "all" ? state.allGames : originFiltered,
        originBolean: true,
        currentPage: 1,
      };
    case GET_NAME:
      return {
        ...state,
        allGames: action.payload,
        currentPage: 1,
      };

    case RESET:
      return {
        ...state,
        orderBolean: false,
        ratingBolean: false,
        genreBolean: false,
        originBolean: false,
        gamesAZ: [],
        gamesRating: [],
        filterByGenre: [],
        filterByOrigin: [],
        currentPage: 1,
      };

    default:
      return state;
  }
}

export default rootReducer;
