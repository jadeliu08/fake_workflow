import React from "react";
import {PendingTaskSplitterGrid} from "./tasks/pendingtask";
import DelegationTaskGrid from "./tasks/delegationtask";
import CandidateTaskGrid from "./tasks/candidate-task";



function Tasks(props) {
    let urlParams = new URLSearchParams(props.location.search), status = urlParams.get("status");
    let specifyTask = {
        pending: PendingTaskSplitterGrid,
        candidate: CandidateTaskGrid,
        delegate: DelegationTaskGrid,
    };
    var Component = specifyTask[status] || PendingTaskSplitterGrid;
    return <>{<Component/>}</>;
}

export default Tasks;