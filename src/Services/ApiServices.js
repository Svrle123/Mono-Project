import _ from "lodash";
class ApiServices {
  constructor(baseUrl) {
    this.url = baseUrl;
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
        let secondaryFilter = key + "=" + value + "&";
        newUrl = newUrl + secondaryFilter;
      }
    });
    let pendingData = await fetch(newUrl.slice(0, -1));
    let fetchedData = await pendingData.json();
    return fetchedData.item;
  }
  async fetchNumOfRecords(searchQuery) {
    let newUrl = this.url;
    if (searchQuery) {
      newUrl = newUrl + `?searchQuery=${searchQuery}`;
    }
    let pendingData = await fetch(newUrl);
    let fetchedData = await pendingData.json();
    return fetchedData.totalRecords;
  }
  addNewResource(data) {
    fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(data),
    });
  }
  deleteExistingResource({ id }) {
    fetch(this.url + `/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }).catch((err) => console.log(err));
  }
  updateExistingResource({ id, data }) {
    fetch(this.url + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(data),
    }).catch((err) => console.log(err));
  }
}

export default ApiServices;
