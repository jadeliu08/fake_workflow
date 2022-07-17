import {useLayoutEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import {ExcelExport} from "@progress/kendo-react-excel-export";
import {Splitter, TabStrip} from "@progress/kendo-react-layout";
import {Window} from "@progress/kendo-react-dialogs";

import {pendingTaskDataSource} from "../data";
import {TASK_ACTION, gridRowItemSelector} from "../reduxes/task";
import {handleClickDoubleClick} from "../utils";
import TaskHandle from "../taskhandle";

function PendingTaskGrid() {
    const exportRef = useRef(null);
    const dispatch = useDispatch();
    const [dialogOptions, setDialogOptions] = useState({visible: false});
    var containerElement = document.getElementById("root");
    const windowProps = {
        style: {width: containerElement.offsetWidth, height: containerElement.offsetHeight},
        title: "任务处理", draggable: false, modal: true, doubleClickStageChange: false, stage: 'FULLSCREEN',
        appendTo: containerElement,
        onClose: () => {
            setDialogOptions({visible: false});
        }
    }

    function handleExportToExcel() {
        if (exportRef) {
            exportRef.current.save();
        }
    }

    function onRowClick(event) {
        dispatch({type: TASK_ACTION.TASK_ROW_CLICK, rowDataItem: event.dataItem});
    }

    function onRowDoubleClick(event) {
        dispatch({type: TASK_ACTION.TASK_ROW_CLICK, rowDataItem: event.dataItem});
        setDialogOptions({visible: true});
    }

    const handleRowClick = handleClickDoubleClick(onRowClick, onRowDoubleClick);

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
        {
            dialogOptions.visible && <Window {...windowProps}>
                <TaskHandle/>
            </Window>
        }
    </ExcelExport>;
}

function PendingTaskTabStrip() {
    const [selectedIndex, setTabSelectedIndex] = useState(0);
    const rowDataItem = useSelector(gridRowItemSelector);

    function handleSelect(item) {
        setTabSelectedIndex(item.selected);
    }

    var children = [
        <span title="流程图" key="diagram" children={<TabContentDiagram dataItem={rowDataItem}/>}></span>,
        <span title="历史记录" key="history" children={<TabContentHistory dataItem={rowDataItem}/>}></span>,
        <span title="操作日志" key="operation-log" children={<TabContentOperationLog dataItem={rowDataItem}/>}></span>
    ];
    return rowDataItem ? <TabStrip children={children} selected={selectedIndex} onSelect={handleSelect} tabContentStyle={{border: "none"}}></TabStrip> : <></>;
}

function TabContentDiagram(props) {
    return <>
        <div className="k-d-flex"><span className="label k-pr-3 k-pb-2">任务名称</span><span>{props.dataItem.name}</span></div>
        <div className="k-d-flex"><span className="label k-pr-3 k-pb-2">发起人</span><span>{props.dataItem.processInstanceStartUserId}</span></div>
        <div className="k-d-flex"><span className="label k-pr-3 k-pb-2">创建时间</span><span>{props.dataItem.created}</span></div>
        <div className="k-d-flex"><span className="label k-pr-3 k-pb-2">过期时间</span><span>{props.dataItem.dueDate}</span></div>
        <div className="k-d-flex"><span className="label k-pr-3 k-pb-2">流程主题</span><span>{props.dataItem.processInstanceDescription}</span></div>
        <div className="k-d-flex"><span className="label k-pr-3 k-pb-2">描述</span><span>{props.dataItem.description}</span></div>
    </>;
}

function TabContentHistory(props) {
    const {dataItem} = props;
    return <>{dataItem.processInstanceName}--{dataItem.id}--->历史记录</>;
}

function TabContentOperationLog(props) {
    const {dataItem} = props;
    return <>{dataItem.processInstanceName}--{dataItem.id}--->操作日志</>;
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