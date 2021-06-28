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

export function USER_GET(token) {
  return {
    url: API_URL + "auth/",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json, text/plain",
      },
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

export function PROPERTY_POST(body, token) {
  return {
    url: API_URL + "property/",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(body),
    },
  };
}

export function PROPERTIES_GET(token) {
  return {
    url: API_URL + "property/",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json, text/plain",
      },
    },
  };
}

export function PROPERTY_GET(id, token) {
  return {
    url: API_URL + "property/" + id,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json, text/plain",
      },
    },
  };
}

export function PROPERTY_DELETE(id, token) {
  return {
    url: API_URL + "property/" + id,
    options: {
      method: "DELETE",
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

export function PROPERTY_EDIT(body) {
  return {
    url: API_URL + "property/",
    options: {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + body.token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(body),
    },
  };
}

export function SAVED_PROPERTIES_GET(token) {
  return {
    url: API_URL + "saved/",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json, text/plain",
      },
    },
  };
}

export function SAVED_PROPERTY_GET(token, id) {
  return {
    url: API_URL + "saved/" + id,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json, text/plain",
      },
    },
  };
}

export function SAVE_PROPERTY_POST(id, token) {
  return {
    url: API_URL + "saved/" + id,
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

export function UNSAVE_PROPERTY(id, token) {
  return {
    url: API_URL + "saved/" + id,
    options: {
      method: "DELETE",
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

