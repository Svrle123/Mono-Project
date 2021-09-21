import MakeServices from "../Services/MakeServices";
import TableStore from "./Main Stores/TableStore";

class MakeTableStore extends TableStore {
  constructor(props) {
    super(props);
    this.services = new MakeServices();
    this.columns = ["Make", "Abbreviation"];
    this.tableParams.rpp = props.rpp;
    this.getData();
    this.getPages();
  }
}
export default MakeTableStore;
