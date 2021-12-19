import axios from "axios";

const KEY = "c07e91d5d5c572c0bf5dabe0ae7a4fc6";
const BASE_URL = "https://api.themoviedb.org/3";

export const chageWordEnum = {
  CREDITS: "credits",
  REVIEWS: "reviews",
};

const getTrendingApi = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${KEY}`
  );
  return response.data.results;
};

const getSearchInputApi = (query) => {
  return axios
    .get(
      `${BASE_URL}/search/movie?api_key=${KEY}&query=${query}&language=en-US&page=1&include_adult=false`
    )
    .then((res) => res.data.results);
};

const getMovieDetailsApi = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${KEY}`
  );
  return { ...response.data };
};

const getCastReviewApi = async (movieId, chageWord) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/${chageWord}?api_key=${KEY}`
  );
  return response.data;
};

const searchApi = {
  getTrendingApi,
  getSearchInputApi,
  getMovieDetailsApi,
  getCastReviewApi,
};

export default searchApi;
