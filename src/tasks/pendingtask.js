import {useLayoutEffect, useRef} from "react";
import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import {ExcelExport} from "@progress/kendo-react-excel-export";
import {Splitter} from "@progress/kendo-react-layout";
import {pendingTaskDataSource} from "../data";

function PendingTaskGrid() {
    const exportRef = useRef(null);

    function handleExportToExcel() {
        if (exportRef) {
            exportRef.current.save();
        }
    }

    return <ExcelExport data={pendingTaskDataSource} ref={exportRef} fileName="test.xlsx">
        <Grid data={pendingTaskDataSource} scrollable="virtual" pageable={true}>
            <GridToolbar>
                <button title="Export Excel" className="k-button k-button-md k-rounded-md k-button-outline-primary" onClick={handleExportToExcel}>Export to Excel</button>
            </GridToolbar>
            <GridColumn field="processInstanceName" title="流程实例ID"/>
            <GridColumn field="name" title="任务名称"/>
            <GridColumn field="processInstanceStartUserId" title="发起人"/>
            <GridColumn field="created" title="创建时间"/>
            <GridColumn field="dueDate" title="过期时间"/>
            <GridColumn field="processInstanceDescription" title="流程主题"/>
            <GridColumn field="processDefinitionName" title="流程定义名称"/>
            <GridColumn field="description" title="描述"/>
        </Grid>
    </ExcelExport>;
}

function PendingTaskTabStrip() {
    return <div>TabStrip</div>;
}

function PendingTaskSplitterGrid() {
    const panes = [{size: "60%", scrollable: false}, {}];
    const children = [<PendingTaskGrid key="pendingTaskGrid"></PendingTaskGrid>, <PendingTaskTabStrip key="pendingTaskTabStrip"></PendingTaskTabStrip>];
    const ref = useRef(null);
    useLayoutEffect(function (){
        const container = ref.current._container;
        container.style.height = container.parentElement.clientHeight + "px";
    }, []);
    return <Splitter panes={panes} orientation="vertical" children={children} ref={ref}></Splitter>;
}


export {PendingTaskSplitterGrid}