const API_KEY = "e79d6a0c468f0856ec7990a04f81f5dc";
const API_BASE_URL = "https://api.themoviedb.org/3/movie"

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default api;
