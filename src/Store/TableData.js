import Api from "../Services/Api";
import _ from "lodash";
import { action, makeObservable, observable, runInAction } from "mobx";

class TableData {
  data = [];
  totalPages = 0;
  pagesArray = [];
  displayPages = [];
  displayPagesLimit = 5;
  tableParams = {};
  filter = "";
  constructor(columns, key, schema, itemsPerPage) {
    makeObservable(this, {
      data: observable,
      filter: observable,
      totalPages: observable,
      pagesArray: observable,
      tableParams: observable,
      displayPages: observable,
      displayPagesLimit: observable,
      getData: action,
      getPages: action,
      setCurrentPage: action,
      setDisplayPages: action,
    });
    this.columns = columns;
    this.apyKey = key;
    this.schemaName = schema;
    this.sortOrder = "asc";
    this.sortBy = "";
    this.tableParams = {
      page: 1,
      rpp: itemsPerPage,
      searchQuery: null,
      sort: null,
    };
    this.services = new Api();
    this.getData();
    this.getPages();
  }
  async getData() {
    var fetchedData = await this.services.fetchData(
      this.apyKey,
      this.schemaName,
      this.tableParams
    );
    runInAction(() => {
      this.data = fetchedData;
    });
  }
  async getPages() {
    let numOfDocs = await this.services.fetchNumOfDocs(
      this.apyKey,
      this.schemaName,
      this.tableParams.searchQuery
    );
    this.totalPages = Math.ceil(numOfDocs / this.tableParams.rpp);
    //Create array of numbers up to number of total pages excluding 0, for display in UI
    runInAction(() => {
      this.pagesArray = [...Array(this.totalPages + 1).keys()].slice(1);
      this.displayPages = [];
      for (let i = 0; i < this.pagesArray.length; i++) {
        if (this.displayPages.length < this.displayPagesLimit) {
          this.displayPages.push(this.pagesArray[i]);
        }
      }
    });
  }
  setCurrentPage(pageNumber) {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > this.totalPages) {
      pageNumber = this.totalPages;
    }
    this.tableParams.page = pageNumber;
    this.setDisplayPages();
    this.getData();
  }
  setDisplayPages() {
    if (this.tableParams.page === this.displayPages[1]) {
      if (this.tableParams.page !== 2) {
        this.displayPages.unshift(this.displayPages[0] - 1);
        this.displayPages.pop();
      }
      return null;
    } else if (
      this.tableParams.page === this.displayPages[this.displayPages.length - 2]
    ) {
      if (this.displayPages[this.displayPages.length - 1] !== this.totalPages) {
        this.displayPages.push(
          this.displayPages[this.displayPages.length - 1] + 1
        );
        this.displayPages.shift();
      }
    } else if (this.tableParams.page === this.totalPages) {
      this.displayPages = _.takeRight(this.pagesArray, 5);
    } else if (this.tableParams.page === 1) {
      this.displayPages = _.take(this.pagesArray, 5);
    }
  }
  setSortOrder(newSortBy) {
    if (this.sortBy !== newSortBy) {
      this.sortOrder = "asc";
    } else {
      if (this.sortOrder === "asc") {
        this.sortOrder = "desc";
      } else this.sortOrder = "asc";
    }
  }
  setTableFilter(text) {
    //Ignore special characters, accept only Letters,Numbers and White space
    let checkedText = text.replace(/[^a-zA-Z0-9\s]+/g, "");
    let trimmedText = checkedText.trim();
    if (trimmedText === "") {
      if (text === "") {
        this.tableParams.searchQuery = null;
        this.getData();
        this.getPages();
        this.setDisplayPages();
      }
      return null;
    } else {
      this.tableParams.searchQuery = trimmedText;
      this.getData(this.tableParams);
    }
    this.getPages();
    this.setDisplayPages();
  }
}

export default TableData;
