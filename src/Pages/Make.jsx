import React from "react";
import TableData from "../Store/TableData";
import TablePaging from "../Components/TablePaging";
import TableFilter from "../Components/TableFilter";
import Table from "../Components/Table";
import Form from "../Components/Form";
import FormStore from "../Store/FormStore";

function Make() {
  const tableData = new TableData(
    ["Name", "Abbreviation"],
    "vehicletable",
    "VehicleMake",
    10
  );
  return (
    <div>
      <div className="split-screen-left">
        <Form />
      </div>
      <div className="split-screen-right">
        <div className="table-functions-wrap">
          <TableFilter filterData={tableData} page="make" />
          <TablePaging pagingData={tableData} page="make" />
        </div>
        <Table tableData={tableData} />
      </div>
    </div>
  );
}

export default Make;
