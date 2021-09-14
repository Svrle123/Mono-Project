import React from "react";
import FormStore from "../Store/FormStore";
import TableStore from "../Store/TableStore";
import TablePaging from "../Components/TablePaging";
import TableFilter from "../Components/TableFilter";
import Table from "../Components/Table";
import SelectForm from "../Components/SelectForm";
import AddForm from "../Components/AddForm";
import DeleteForm from "../Components/DeleteForm";
import UpdateForm from "../Components/UpdateForm";
import { observer } from "mobx-react";

function Model() {
  const tableData = new TableStore(
    ["Make", "Model", "Launched"],
    "vehicletable",
    "VehicleModel",
    5
  );
  const secondTableData = new TableStore(
    ["Make", "Abbreviation"],
    "vehicletable",
    "VehicleMake",
    5
  );
  const formData = new FormStore(
    "vehicletable",
    "VehicleModel",
    "ivansvrtan",
    "emsa-1988"
  );

  return (
    <div>
      <div className="split-screen-left">
        <AddForm
          inputs={["model", "launched"]}
          purpose={"Add"}
          formData={formData}
          tableData={secondTableData}
          table={"make"}
          select={
            <SelectForm
              resource="make"
              tableData={secondTableData}
              formData={formData}
            />
          }
        />
        <DeleteForm
          resource="model"
          tableData={tableData}
          formData={formData}
        />
        <UpdateForm
          inputs={["model", "launched"]}
          resource="model"
          tableData={tableData}
          formData={formData}
        />
      </div>
      <div className="split-screen-right">
        <div className="table-functions-wrap">
          <TableFilter filterData={secondTableData} page="model" />
          <TablePaging pagingData={secondTableData} page="model" />
        </div>
        <Table tableData={secondTableData} page="model" />

        <div className="table-functions-wrap">
          <TableFilter filterData={tableData} page="model" />
          <TablePaging pagingData={tableData} page="model" />
        </div>
        <Table tableData={tableData} page="model" />
      </div>
    </div>
  );
}

export default observer(Model);
