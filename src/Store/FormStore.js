import Api from "../Services/Api";
import { makeObservable, observable, action } from "mobx";

class FormStore {
  inputAddValues = {};
  inputUpdateValues = {};
  constructor(apiKey, schemaName, username, password) {
    makeObservable(this, {
      inputAddValues: observable,
      inputUpdateValues: observable,
      getInputAddValues: action,
      getInputUpdateValues: action,
      createNewDoc: action,
      deleteDocument: action,
    });
    this.apiKey = apiKey;
    this.schemaName = schemaName;
    this.username = username;
    this.password = password;
    this.services = new Api(
      this.apiKey,
      this.schemaName,
      this.username,
      this.password
    );
    this.services.loginUser();
  }
  async getInputAddValues(inputKey, inputValue) {
    this.inputAddValues[inputKey] = inputValue;
  }
  async getInputUpdateValues(inputKey, inputValue) {
    this.inputUpdateValues[inputKey] = inputValue;
  }
  createNewDoc(parentDoc, table) {
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
  deleteDocument(resource) {
    const info = { id: resource, token: this.services.userToken };
    this.services.deleteExistingResource(info);
  }
  updateDocument(resource) {
    const info = {
      id: resource,
      data: this.inputUpdateValues,
      token: this.services.userToken,
    };
    this.services.updateExistingResource(info);
  }
}

export default FormStore;
