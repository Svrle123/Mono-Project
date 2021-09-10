import Api from "../Services/Api";
import { makeObservable } from "mobx";

class FormStore {
  constructor() {
    makeObservable(this, {});
    this.services = new Api();
  }
}

export default FormStore;
