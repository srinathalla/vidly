import http from "./httpService";
import jwtDecode from "jwt-decode";

// const apiEndPoint = "http://localhost:3900/api/auth";

const apiEndPoint = "https://evening-island-57734.herokuapp.com/api/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });

  localStorage.setItem("token", jwt);
}

export async function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export async function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  try {
    return localStorage.getItem("token");
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt
};
