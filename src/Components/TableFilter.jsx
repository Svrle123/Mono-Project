import React from "react";
import { observer } from "mobx-react";

function TableFilter({ filterData, page }) {
  const filterStyle = `table-filter-wrap-${page}`;
  return (
    <div>
      <input
        className={filterStyle}
        type="text"
        placeholder="Search here..."
        onChange={(e) => filterData.setTableFilter(e.target.value)}
      />
    </div>
  );
}

export default observer(TableFilter);
