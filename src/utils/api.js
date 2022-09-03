export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.jwt = options.jwt
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error${res.status}`);
  }

  // _responseUrl(res) {
  //   if (res.ok) {
  //     return res;
  //   }
  //   return Promise.reject(`error${res.status}`);
  // }

  login(username, password) {
    return fetch(`${this.baseUrl}/login`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
      method: "POST",
    })
    .then(this._response);
  }

  register(username, password) {
    return fetch(`${this.baseUrl}/register?username=${username}&password=${password}`, {
      headers: {
        Accept: "application/json"
      },
      method: "POST"
    })
    .then(this._response);
  }

  squeeze(link) {
    return fetch(`${this.baseUrl}/squeeze?link=${link}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.jwt}`
      },
      method: "POST"
    })
    .then(this._response);
  }

  statistics(order, offset, limit) {
    return fetch(`${this.baseUrl}/statistics?order=${order}&offset=${offset}&limit=${limit}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.jwt}`
      },
    })
    .then(this._response);
  }

  // redirect(key) {
  //   return fetch(`${this.baseUrl}/s/${key}`, {
  //     headers: {
  //       Accept: "*/*"
  //     }
  //   })
  //   .then(this._responseUrl);
  // }
}