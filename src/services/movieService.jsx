import http from "./httpService";

// const apiEndPoint = "http://localhost:3900/api/movies";

const apiEndPoint = "https://evening-island-57734.herokuapp.com/api/movies";

// const apiEndPoint = "apiEndPoint/movies";
export function getMovies() {
  return http.get(apiEndPoint);
}

export function saveMovie(movie) {
  console.log(movie);
  if (movie._id) {
    const data = { ...movie };
    delete data._id;
    return http.put(apiEndPoint + "/" + movie._id, data);
  }
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + "/" + movieId);
}

export function getMovie(movieId) {
  return http.get(apiEndPoint + "/" + movieId);
}
