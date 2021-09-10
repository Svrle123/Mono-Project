import { toLower } from "lodash";
import { observer } from "mobx-react";

function Table({ tableData }) {
  return (
    <div>
      <table>
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
            <tr key={newKey}>
              {tableData.columns.map((x, newKey) => (
                <td key={newKey}> {item[toLower(x)]} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default observer(Table);
