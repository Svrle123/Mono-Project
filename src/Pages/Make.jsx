import React from "react";
import FormStore from "../Store/FormStore";
import TableStore from "../Store/TableStore";
import TablePaging from "../Components/TablePaging";
import TableFilter from "../Components/TableFilter";
import Table from "../Components/Table";
import AddForm from "../Components/AddForm";
import DeleteForm from "../Components/DeleteForm";
import UpdateForm from "../Components/UpdateForm";
import { observer } from "mobx-react";

function Make() {
  const tableData = new TableStore(
    ["Make", "Abbreviation"],
    "vehicletable",
    "VehicleMake",
    10
  );
  const formData = new FormStore(
    "vehicletable",
    "VehicleMake",
    "ivansvrtan",
    "emsa-1988"
  );

  return (
    <div>
      <div className="split-screen-left">
        <AddForm
          inputs={["make", "abbreviation"]}
          purpose={"Add"}
          formData={formData}
          tableData={{}}
          table={"make"}
        />
        <DeleteForm resource="make" tableData={tableData} formData={formData} />
        <UpdateForm
          inputs={["make", "abbreviation"]}
          resource="make"
          tableData={tableData}
          formData={formData}
        />
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

export default observer(Make);
