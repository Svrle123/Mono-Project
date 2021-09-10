import _ from "lodash";
import { action, makeObservable } from "mobx";
class Api {
  constructor() {
    makeObservable(this, {
      fetchData: action,
    });
  }
  async fetchData(
    apiKey,
    schemaName,
    queryParams = { page: null, rpp: null, searchQuery: null, sort: null }
  ) {
    let url = `https://api.baasic.com/v1/${apiKey}/resources/${schemaName}?`;
    _.forEach(queryParams, function (value, key) {
      if (value !== null) {
        let firstFilter = key + "=" + value + "&";
        url = url + firstFilter;
      }
    });
    let pendingData = await fetch(url.slice(0, -1));
    let fetchedData = await pendingData.json();
    return fetchedData.item;
  }
  async fetchNumOfDocs(apiKey, schemaName, searchQuery) {
    let url = `https://api.baasic.com/v1/${apiKey}/resources/${schemaName}`;
    if (searchQuery) {
      url = url + `?searchQuery=${searchQuery}`;
    }
    let pendingData = await fetch(url);
    let fetchedData = await pendingData.json();
    return fetchedData.totalRecords;
  }
}

export default Api;
