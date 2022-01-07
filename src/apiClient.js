import axios from "axios";
const url = "https://event-backend-florentinandtom.herokuapp.com/";

export class ApiClient {
  constructor(tokenProvider,logoutHandler){
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }


  authenticatedCall(method,url,data){
    return axios({
      method,
      url,
      headers: {
        authorization: this.tokenProvider
      },
      data,
    }).catch((error) => {
      if(error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject()
      } else {
      throw error;
    }
    });
  }

  apiCall(method, url, data) {
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  login(username,password) {
    return this.apiCall("post",url + "auth/",{username: username, password:password});
  }

  getAds() {
    return this.authenticatedCall("get", url);
  }

  getLocation(location) {
    return this.authenticatedCall("get", `${url}events/${location}`)
  }
  queryResult(searchParams){
    return this.authenticatedCall("post", `${url}events/search`, searchParams)
  }

  addAd(event, location, summary, date, time ) {
    return this.authenticatedCall("post", url, { event, location, summary, date, time});
  }

  removeAd(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateAd(id, event, location,summary, date,) {
    return this.authenticatedCall("put", `${url}${id}`, { event, location, summary, date});
  }
}