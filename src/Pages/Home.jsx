import React from "react";
import Table from "../Components/Table";
import TableFilter from "../Components/TableFilter";
import TablePaging from "../Components/TablePaging";
import TableData from "../Store/TableData";

function Home() {
  const tableData = new TableData(
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

export default Home;
