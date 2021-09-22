import { makeObservable, observable, action } from "mobx";

class FormStore {
  inputAddValues = {};
  inputUpdateValues = {};
  constructor() {
    makeObservable(this, {
      inputAddValues: observable,
      inputUpdateValues: observable,
      getInputAddValues: action,
      getInputUpdateValues: action,
      createNewData: action,
      deleteData: action,
      updateData: action,
    });
  }
  async getInputAddValues(inputKey, inputValue) {
    this.inputAddValues[inputKey] = inputValue;
  }
  async getInputUpdateValues(inputKey, inputValue) {
    this.inputUpdateValues[inputKey] = inputValue;
  }
  createNewData(parentDoc, table) {
    if (parentDoc !== undefined) {
      parentDoc[`${table}ID`] = parentDoc.id;
      delete parentDoc.id;
      if (parentDoc.name === null) {
        delete parentDoc.name;
      }
      let newDoc = Object.assign({}, this.inputAddValues, parentDoc);
      this.services.addNewResource(newDoc, this.services.userToken);
      this.inputAddValues = {};
    } else {
      if (Object.keys(this.inputAddValues).length !== 0) {
        const data = this.inputAddValues;
        this.services.addNewResource(data, this.services.userToken);
        this.inputAddValues = {};
      } else {
        alert("Please fill in a input field!");
      }
    }
  }
  deleteData(resource) {
    const data = { id: resource, token: this.services.userToken };
    this.services.deleteExistingResource(data);
  }
  updateData(resource) {
    const data = {
      id: resource,
      data: this.inputUpdateValues,
      token: this.services.userToken,
    };
    this.services.updateExistingResource(data);
  }
}

export default FormStore;
