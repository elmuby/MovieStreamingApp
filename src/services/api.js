import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING

export const fecthTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );
  return data?.results;
};

// MOVIES AND SERIES DETAILS

export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);

  return res?.data;
};

// MOVIES AND SERIES CREDITS
export const fetchCredits = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  );
  return res?.data;
};

// MOVIE AND SERIES TRAILER
export const fecthTrailer = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`);
  return res?.data;
};

// DISCOVER MOVIES

export const fetchMovies = async (page, sortBy) =>{
  const res = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&&sort_by=${sortBy}`)
  return res?.data;
}

// DISCOVER TVSHOWS
export const fetchShows = async (sortBy, page) =>{
  const res = await axios.get(`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&&sort_by=${sortBy}`)
  return res?.data;
}

// SEARCH OPTIONS
export const searchData = async(query, page)=>{
  const res = await axios.get(`${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`);
  return res?.data;
}
