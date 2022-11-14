import axios from "axios";


export const GET_GAME = "GET_GAME";
export const GET_GENRE = "GET_GENRE";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const RESET_DETAIL = "RESET_DETAIL";
export const LOW_RATING = "LOW_RATING";

export function getVideoGame() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames");

    return dispatch({
      type: "GET_GAME",
      payload: json.data,
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRE",
      payload: json.data,
    });
  };
}

export function filterVideoGameByGenres(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload: payload,
  };
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload: payload,
  };
}

export function orderByName(payload) {
  console.log(payload);
  return {
    type: "ORDER_BY_NAME",
    payload: payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload: payload,
  };
}

export function getNameVideoGame(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/videogames?name=${payload}`
      );
      
      return dispatch({
        type: "GET_VIDEOGAME_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log("getNameVideoGame" + error);
    }
  };
}

export function postVideoGame(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      `http://localhost:3001/videogames`,
      payload
    );
    return response;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearDetail() {
  return {
    type: "RESET_DETAIL",
  };
}

export function ratingLow(payload) {
  return {
    type: "LOW_RATING",
    payload: payload,
  };
}
