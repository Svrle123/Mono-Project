import React from "react";
import { observer } from "mobx-react-lite";

function SelectForm({ resource, tableData }) {
  return (
    <div>
      <label htmlFor="" className="form-label">
        Choose a {resource} from the {resource} table! <br /> To unselect double
        click on the {resource} table!
        <div className="form-paragraph">
          {tableData.clickedDocument[resource]}
        </div>
      </label>
    </div>
  );
}

export default observer(SelectForm);
