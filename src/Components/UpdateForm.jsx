import React from "react";
import { observer } from "mobx-react-lite";
import _ from "lodash";

function UpdateForm({ inputs, resource, tableData, formData }) {
  return (
    <form className="form-wrap">
      <div className="form-title">{`Choose a ${resource} to update!`}</div>
      <div>
        <label htmlFor="" className="form-label">
          To update a existing {resource}, double click on a {resource} in the{" "}
          {resource} table!
          <p className="form-paragraph">
            {tableData.doubleClickedDocument[resource]}
          </p>
        </label>
        {_.map(inputs, function (text, key) {
          return (
            <label htmlFor={text} className="form-label" key={key}>
              Write new {text}
              <input
                key={key}
                type="text"
                name={text}
                id={text}
                className="form-input"
                placeholder={`${_.startCase(text)} here...`}
                onChange={(e) =>
                  formData.getInputUpdateValues(e.target.name, e.target.value)
                }
              />
            </label>
          );
        })}
        <button
          className="form-button"
          onClick={() =>
            formData.updateDocument(tableData.doubleClickedDocument.id)
          }
        >{`Update ${resource}!`}</button>
      </div>
    </form>
  );
}

export default observer(UpdateForm);
