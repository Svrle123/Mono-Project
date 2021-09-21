import React from "react";
import ModelFormStore from "../Store/ModelFormStore";
import MakeTableStore from "../Store/MakeTableStore";
import ModelTableStore from "../Store/ModelTableStore";
import TablePaging from "../Components/TablePaging";
import TableFilter from "../Components/TableFilter";
import Table from "../Components/Table";
import SelectForm from "../Components/SelectForm";
import AddForm from "../Components/AddForm";
import DeleteForm from "../Components/DeleteForm";
import UpdateForm from "../Components/UpdateForm";
import { observer } from "mobx-react";

function Model() {
  const makeTableData = new MakeTableStore({ rpp: 5 });
  const modelTableData = new ModelTableStore({ rpp: 5 });
  const formData = new ModelFormStore();

  return (
    <div>
      <div className="split-screen-left">
        <AddForm
          inputs={["model", "launched"]}
          purpose={"Add"}
          formData={formData}
          tableData={makeTableData}
          table={"make"}
          select={
            <SelectForm
              resource="make"
              tableData={makeTableData}
              formData={formData}
            />
          }
        />
        <DeleteForm
          resource="model"
          tableData={modelTableData}
          formData={formData}
        />
        <UpdateForm
          inputs={["model", "launched"]}
          resource="model"
          tableData={modelTableData}
          formData={formData}
        />
      </div>
      <div className="split-screen-right">
        <div className="table-functions-wrap">
          <TableFilter filterData={makeTableData} page="model" />
          <TablePaging pagingData={makeTableData} page="model" />
        </div>
        <Table tableData={makeTableData} page="model" />

        <div className="table-functions-wrap">
          <TableFilter filterData={modelTableData} page="model" />
          <TablePaging pagingData={modelTableData} page="model" />
        </div>
        <Table tableData={modelTableData} page="model" />
      </div>
    </div>
  );
}

export default observer(Model);
