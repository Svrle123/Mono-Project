import ModelServices from "../Services/ModelServices";
import FormStore from "./Main Stores/FormStore";

class ModelFormStore extends FormStore {
  constructor() {
    super();
    this.services = new ModelServices();
  }
}

export default ModelFormStore;
