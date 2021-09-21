import React from "react";
import ModelTableStore from "../Store/ModelTableStore";
import { observer } from "mobx-react";
import Table from "../Components/Table";
import TableFilter from "../Components/TableFilter";
import TablePaging from "../Components/TablePaging";

function Home() {
  const tableData = new ModelTableStore({ rpp: 10 });

  return (
    <div>
      <div className="table-functions-wrap">
        <TableFilter filterData={tableData} page="home" />
        <TablePaging pagingData={tableData} page="home" />
      </div>
      <Table tableData={tableData} />
    </div>
  );
}

export default observer(Home);
