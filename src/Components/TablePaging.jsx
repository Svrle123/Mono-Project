import React from "react";
import { observer } from "mobx-react";
import {
  CaretLeftFill,
  CaretRightFill,
  ChevronDoubleLeft,
  ChevronDoubleRight,
} from "react-bootstrap-icons";
import _ from "lodash";

function TablePaging({ pagingData, page }) {
  const pageStyle = `page-numbers-${page}`;
  return (
    <div className="table-paging-wrap">
      <button
        className="btn-paging-first"
        onClick={() => pagingData.setCurrentPage(1)}
      >
        <ChevronDoubleLeft />
      </button>
      <button
        className="btn-paging-left"
        onClick={() =>
          pagingData.setCurrentPage(pagingData.tableParams.page - 1)
        }
      >
        <CaretLeftFill />
      </button>
      <button
        className="btn-paging-last"
        onClick={() => pagingData.setCurrentPage(pagingData.totalPages)}
      >
        <ChevronDoubleRight />
      </button>
      <button
        className="btn-paging-right"
        onClick={() =>
          pagingData.setCurrentPage(pagingData.tableParams.page + 1)
        }
      >
        <CaretRightFill />
      </button>
      <ul className={pageStyle}>
        {_.map(pagingData.displayPages, function (x, key) {
          if (x === pagingData.tableParams.page) {
            return (
              <li key={key}>
                <button
                  className="active-page"
                  onClick={() => pagingData.setCurrentPage(x)}
                >
                  {x}
                </button>
              </li>
            );
          } else {
            return (
              <li key={key}>
                <button onClick={() => pagingData.setCurrentPage(x)}>
                  {x}
                </button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default observer(TablePaging);
