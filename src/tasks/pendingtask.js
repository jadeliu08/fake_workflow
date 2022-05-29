import {useEffect, useLayoutEffect, useRef, useState} from "react";

import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import {ExcelExport} from "@progress/kendo-react-excel-export";
import {Splitter, TabStrip} from "@progress/kendo-react-layout";

import emitter from "../customEvents";
import {pendingTaskDataSource} from "../data";

function PendingTaskGrid() {
    const exportRef = useRef(null);

    function handleExportToExcel() {
        if (exportRef) {
            exportRef.current.save();
        }
    }

    function handleRowClick(event) {
        emitter.emit("pendingTaskGridRowClick", event.dataItem);
    }

    return <ExcelExport data={pendingTaskDataSource} ref={exportRef} fileName="test.xlsx">
        <Grid data={pendingTaskDataSource} scrollable="virtual" pageable={true} onRowClick={handleRowClick}>
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
    const [selectedIndex, setTabSelectedIndex] = useState(0);
    const [rowDataItem, setRowDataItem] = useState(null);

    function handleSelect(item) {
        setTabSelectedIndex(item.selected);
    }

    useEffect(function () {
        const gridRowClickEmitter = function (dataItem) {
            setRowDataItem(dataItem);
        };
        emitter.on("pendingTaskGridRowClick", gridRowClickEmitter);
        return () => emitter.off("pendingTaskGridRowClick", gridRowClickEmitter);
    }, []);

    var children = [
        <span title="流程图" key="diagram" children={<TabContentDiagram dataItem={rowDataItem}/>}></span>,
        <span title="历史记录" key="history" children={<TabContentHistory dataItem={rowDataItem}/>}></span>,
        <span title="操作日志" key="operation-log" children={<TabContentOperationLog dataItem={rowDataItem}/>}></span>
    ];
    return rowDataItem ? <TabStrip children={children} selected={selectedIndex} onSelect={handleSelect} tabContentStyle={{border: "none"}}></TabStrip> : <></>;
}

function TabContentDiagram(props) {
    const {dataItem} = props;
    return <>
        <div><span className="label">任务名称：</span><span>{dataItem.name}</span></div>
        <div><span className="label">发起人：</span><span>{dataItem.processInstanceStartUserId}</span></div>
        <div><span className="label">创建时间：</span><span>{dataItem.created}</span></div>
        <div><span className="label">过期时间：</span><span>{dataItem.dueDate}</span></div>
        <div><span className="label">流程主题：</span><span>{dataItem.processInstanceDescription}</span></div>
        <div><span className="label">描述：</span><span>{dataItem.description}</span></div>
    </>;
}

function TabContentHistory(props) {
    const {dataItem} = props;
    return <>{dataItem.id}--->历史记录</>;
}

function TabContentOperationLog(props) {
    const {dataItem} = props;
    return <>{dataItem.id}--->操作日志</>;
}

function PendingTaskSplitterGrid() {
    const panes = [{size: "60%", scrollable: false}, {}];
    const ref = useRef(null);
    //由于splitter初始没有高度随着子元素高度变化而变化，故要给splitter设置父高度，pane size才会生效
    useLayoutEffect(function () {
        const container = ref.current._container;
        container.style.height = container.parentElement.clientHeight + "px";
    }, []);
    return <Splitter panes={panes} orientation="vertical" ref={ref}>
        <PendingTaskGrid key="pendingTaskGrid"></PendingTaskGrid>
        <PendingTaskTabStrip key="pendingTaskTabStrip"></PendingTaskTabStrip>
    </Splitter>;
}


export {PendingTaskSplitterGrid}