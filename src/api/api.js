import axios from "axios"
const API_KEY = "e79d6a0c468f0856ec7990a04f81f5dc";
const API_BASE_URL = "https://api.themoviedb.org/3/movie"
// eslint-disable-next-line
const api = axios.create({
    baseURL: API_BASE_URL,
  
  });

export  {api,API_KEY};
