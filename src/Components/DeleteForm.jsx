import React from "react";
import { observer } from "mobx-react-lite";

function DeleteForm({ resource, tableData, formData }) {
  return (
    <form className="form-wrap">
      <div className="form-title">{`Choose a ${resource} to delete!`}</div>
      <div>
        <label htmlFor="" className="form-label">
          To delete a existing {resource}, click on a {resource} in the{" "}
          {resource} table!
          <p className="form-paragraph">
            {tableData.clickedDocument[resource]}
          </p>
        </label>
        <button
          className="form-button"
          onClick={() => formData.deleteData(tableData.clickedDocument.id)}
        >{`Delete ${resource}!`}</button>
      </div>
    </form>
  );
}

export default observer(DeleteForm);
