import { observer } from "mobx-react";
import React from "react";
import Table from "../Components/Table";
import TableFilter from "../Components/TableFilter";
import TablePaging from "../Components/TablePaging";
import TableStore from "../Store/TableStore";

function Home() {
  const tableData = new TableStore(
    ["Make", "Abbreviation", "Model", "Launched"],
    "vehicletable",
    "VehicleModel",
    10
  );

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
