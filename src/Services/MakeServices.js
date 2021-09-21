import ApiServices from "./ApiServices";

class MakeServices extends ApiServices {
  constructor() {
    super(`https://api.baasic.com/v1/vehicletable/resources/VehicleMake`);
  }
}

export default MakeServices;
