import { toLower } from "lodash";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

function Table({ tableData, page }) {
  return (
    <div>
      <table className={`table-wrap-${page}`}>
        <thead>
          <tr>
            {tableData.columns.map((x, key) => (
              <th
                key={key}
                onClick={() => {
                  tableData.setSortOrder((tableData.sortBy = toLower(x)));
                  tableData.tableParams.sort =
                    toLower(x) + "|" + tableData.sortOrder;
                  tableData.getData();
                }}
              >
                <b>{x}</b>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.data.map((item, newKey) => (
            <tr
              key={newKey}
              onClick={() =>
                runInAction(() => {
                  tableData.doubleClickedDocument = {};
                  tableData.clickedDocument = item;
                })
              }
              onDoubleClick={() =>
                runInAction(() => {
                  tableData.doubleClickedDocument = item;
                  tableData.clickedDocument = {};
                })
              }
            >
              {tableData.columns.map((x, newKey) => (
                <td key={newKey} className={`td-${page}`}>
                  {" "}
                  {item[toLower(x)]}{" "}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default observer(Table);
