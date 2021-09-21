import ApiServices from "./ApiServices";

class ModelServices extends ApiServices {
  constructor() {
    super("https://api.baasic.com/v1/vehicletable/resources/VehicleModel");
  }
}

export default ModelServices;
