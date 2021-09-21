import MakeServices from "../Services/MakeServices";
import FormStore from "./Main Stores/FormStore";

class MakeFormStore extends FormStore {
  constructor() {
    super();
    this.services = new MakeServices();
  }
}

export default MakeFormStore;
