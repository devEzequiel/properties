export const API_URL = "http://127.0.0.1:8000/api/";

export function TOKEN_POST(body) {
  return {
    url: API_URL + "auth/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + "auth/token",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json, text/plain",
      },
    },
  };
}

export function USER_GET (token) {
    return {
        url: API_URL + "auth/",
        options: {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            // "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "*",
            Accept: "application/json, text/plain",
          }
        },
      };
}

export function USER_POST(body) {
  return {
    url: API_URL + "auth/",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_LOGOUT(token) {
  return {
    url: API_URL + "auth/logout",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json, text/plain",
      },
    },
  };
}