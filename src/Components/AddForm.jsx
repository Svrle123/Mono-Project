import React from "react";
import { observer } from "mobx-react-lite";
import _ from "lodash";

function AddForm({ inputs, purpose, formData, tableData, table, select }) {
  return (
    <form className="form-wrap">
      <div className="form-title">{`${purpose} document!`}</div>
      {select}
      <div>
        {_.map(inputs, function (text, key) {
          return (
            <label htmlFor={text} className="form-label" key={key}>
              Write your {text}
              <input
                key={key}
                type="text"
                name={text}
                id={text}
                className="form-input"
                placeholder={`${_.startCase(text)} here...`}
                onChange={(e) =>
                  formData.getInputAddValues(e.target.name, e.target.value)
                }
              />
            </label>
          );
        })}
        <button
          className="form-button"
          onClick={() =>
            formData.createNewData(tableData.clickedDocument, table)
          }
        >{`${purpose} document!`}</button>
      </div>
    </form>
  );
}

export default observer(AddForm);
