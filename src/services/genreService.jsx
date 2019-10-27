import http from "./httpService";

const apiEndPoint = "https://evening-island-57734.herokuapp.com/api/genres";

export function getGenres() {
  return http.get(apiEndPoint);
}
