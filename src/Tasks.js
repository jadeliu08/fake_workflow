import {PendingTaskGrid} from "./tasks/pendingtask";

function HistoryTasks() {
    return (<div>HistoryTasks</div>);
}

function CandidateTasks() {
    return (<div>CandidateTasks</div>);
}

function DelegationTasks() {
    return (<div>DelegationTasks</div>);
}


function Tasks(props) {
    let urlParams = new URLSearchParams(props.location.search), status = urlParams.get("status");
    let specifyTask = {
        pending: PendingTaskGrid,
        candidate: CandidateTasks,
        delegate: DelegationTasks
    };
    var Component = specifyTask[status] || PendingTaskGrid;
    return <div>{<Component/>}</div>;
}

export default Tasks;

export {HistoryTasks};