import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export default async function fetchData(endpoint, query = {}) {
  const response = await axios.get(endpoint, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGMxODkyZjczOGJmZGQxZjA3YWZiZGY3MGU5N2NjNyIsInN1YiI6IjY2MDU0MWI5MTVkZWEwMDE4NTI3ZmE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T_dlVwiEGfszTI00Bx2wsgehlyNy9SnIEP36v2AfYYo',
    },
    params: {
      query,
    },
  });
  return response.data;
}
