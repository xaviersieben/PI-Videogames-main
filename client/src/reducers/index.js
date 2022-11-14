import {
  GET_GAME,
  GET_GENRE,
  FILTER_BY_CREATED,
  FILTER_BY_GENRE,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  GET_VIDEOGAME_BY_NAME,
  GET_DETAILS,
  RESET_DETAIL,
  LOW_RATING,
  getVideoGame,
} from "../actions/index.js";

const initialState = {
  videogames: [],
  backUpGames: [],
  genres: [],
  detail: [],
  error: [],
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_GAME:
      return {
        ...JSON.parse(JSON.stringify(state)),
        videogames: payload,
        backUpGames: payload,
      };

    case GET_GENRE:
      return {
        ...JSON.parse(JSON.stringify(state)),
        genres: payload,
      };

    case FILTER_BY_GENRE:
      const allVideoGames = state.backUpGames;
      const genreFiltered =
        payload === "Genres"
          ? allVideoGames
          : allVideoGames.filter((e) => e.genres?.includes(payload));
      return {
        ...JSON.parse(JSON.stringify(state)),
        videogames: genreFiltered,
      };

    case FILTER_BY_CREATED:
      console.log(payload)
      const allVideoGames2 = state.backUpGames;
      console.log(state.backUpGames)
      const createdFilter =
        payload === "Created"
          ? allVideoGames2.filter((e) => e.createInDb)
          : allVideoGames2.filter((e) => !e.createInDb);
      return {
        ...JSON.parse(JSON.stringify(state)),
        videogames: payload === "Games" ? state.backUpGames : createdFilter,
      };

    case ORDER_BY_NAME:
 
      let sortGame =
      
        payload === "asc"
          ? state.videogames.sort((a, b) => {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
              }
              if (a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return -1;
              }
              if (a.name.toUpperCase() < b.name.toUpperCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...JSON.parse(JSON.stringify(state)),
        videogames: sortGame,
      };
    case LOW_RATING:
      const lowRating = state.backUpGames;
      const newLowRating = lowRating.filter((e) => e.rating <= 2);

      return {
        ...JSON.parse(JSON.stringify(state)),
        videogames: newLowRating,
      };

    case ORDER_BY_RATING:
      let sortByRating =
        payload === "Hight"
          ? state.videogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            });
      return {
        ...JSON.parse(JSON.stringify(state)),
        videogames: sortByRating,
      };

    case GET_VIDEOGAME_BY_NAME:
      return {
        ...JSON.parse(JSON.stringify(state)),
        videogames: payload.err ? [{ Error: "No videogames Found" }] : payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...JSON.parse(JSON.stringify(state)),
      };

    case GET_DETAILS:
      return {
        ...JSON.parse(JSON.stringify(state)),
        detail: payload,
      };
    case RESET_DETAIL:
      return {
        ...JSON.parse(JSON.stringify(state)),
        detail: [],
      };

    default:
      return state;
  }
}
