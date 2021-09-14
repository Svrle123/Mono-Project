import _ from "lodash";
import { action, makeObservable, observable } from "mobx";
class Api {
  userToken = "";
  constructor(apiKey, schemaName, username, password) {
    makeObservable(this, {
      userToken: observable,
      fetchData: action,
      fetchNumOfDocs: action,
      addNewResource: action,
      deleteExistingResource: action,
      loginUser: action,
    });
    this.apiKey = apiKey;
    this.schemaName = schemaName;
    this.username = username;
    this.password = password;
    this.url = `https://api.baasic.com/v1/${this.apiKey}/resources/${this.schemaName}`;
  }
  async fetchData(
    queryParams = { page: null, rpp: null, searchQuery: null, sort: null }
  ) {
    let newUrl = this.url;
    let hasFirstParam = false;
    _.forEach(queryParams, function (value, key) {
      if (!hasFirstParam) {
        if (value !== null) {
          let firstFilter = "?" + key + "=" + value + "&";
          newUrl = newUrl + firstFilter;
          hasFirstParam = true;
        }
      }
      if (value !== null) {
        let firstFilter = key + "=" + value + "&";
        newUrl = newUrl + firstFilter;
      }
    });
    let pendingData = await fetch(newUrl.slice(0, -1));
    let fetchedData = await pendingData.json();
    return fetchedData.item;
  }
  async fetchNumOfDocs(searchQuery) {
    let newUrl = this.url;
    if (searchQuery) {
      newUrl = newUrl + `searchQuery=${searchQuery}`;
    }
    let pendingData = await fetch(newUrl);
    let fetchedData = await pendingData.json();
    return fetchedData.totalRecords;
  }
  addNewResource(data, token) {
    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
  deleteExistingResource({ id, token }) {
    fetch(this.url + `/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => console.log(err));
  }
  updateExistingResource({ id, data, token }) {
    fetch(this.url + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).catch((err) => console.log(err));
  }
  async loginUser() {
    let loginUrl = `https://api.baasic.com/v1/${this.apiKey}/login`;
    let response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=password&username=${this.username}&password=${this.password}`,
    });

    this.userToken = await response.json().then((res) => res.access_token);
  }
}

export default Api;
