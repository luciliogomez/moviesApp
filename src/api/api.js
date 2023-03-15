import axios from "axios"
const API_KEY = "e79d6a0c468f0856ec7990a04f81f5dc";
const API_BASE_URL = "https://api.themoviedb.org/3"
// eslint-disable-next-line
const api = axios.create({
    baseURL: API_BASE_URL,
  
  });

  const getPosterImage = function(img){
    return "https://image.tmdb.org/t/p/w342"+img
  }
  const getBackdropImage = function(img){
    return "https://image.tmdb.org/t/p/w1280"+img
  }
  const getProfileImage = function(img){
    return "https://image.tmdb.org/t/p/w185"+img
  }

export  {api, API_KEY, getPosterImage, getBackdropImage, getProfileImage};
