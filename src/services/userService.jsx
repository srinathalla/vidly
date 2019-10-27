import http from "./httpService";

// const apiEndPoint = "http://localhost:3900/api/users";

const apiEndPoint = "https://evening-island-57734.herokuapp.com/api/users";
export function getUsers() {
  return http.get(apiEndPoint);
}

export function registerUser(user) {
  return http.post(apiEndPoint, {
    name: user.name,
    password: user.password,
    email: user.username
  });
}
