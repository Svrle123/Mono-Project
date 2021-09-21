import ModelServices from "../Services/ModelServices";
import TableStore from "./Main Stores/TableStore";

class ModelTableStore extends TableStore {
  constructor(props) {
    super(props);
    this.services = new ModelServices();
    this.columns = ["Make", "Abbreviation", "Model", "Launched"];
    this.tableParams.rpp = props.rpp;
    this.getData();
    this.getPages();
  }
}
export default ModelTableStore;
