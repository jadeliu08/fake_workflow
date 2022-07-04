import React, {useState} from "react";
import {PendingTaskSplitterGrid} from "./tasks/pendingtask";

// function TextMemo(props) {
//     console.log("TextMemo render");
//     return <div>
//         TextMemo
//     </div>
// }

class TextMemo extends React.Component {
    render() {
        console.log("TextMemo");
        return <div>TextMemo</div>;
    }
}

//第二个参数没有时，React会调用shallowEqual对新旧props进行对比
const NewTextMemo = React.memo(TextMemo, function (prevProps, nextProps) {
    return nextProps.number1 > 3;
});

const LazyComponent = React.lazy(() => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve({
                default: () => (<div>LazyComponent Show</div>)
            });
        }, 10000);
    });
});

function HistoryTasks() {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    return <div>
        <span>HistoryTasks</span>
        <NewTextMemo number1={number1} number2={number2}/>
        <button onClick={() => {
            setNumber1(number1 + 1)
        }}>改变number1
        </button>
        <button onClick={() => {
            setNumber2(number1 + 1)
        }}>改变number2
        </button>
        <React.Suspense fallback={(<div>Loading</div>)}>
            <LazyComponent/>
        </React.Suspense>
    </div>;
}

// function CandidateTasks() {
//     return (<div>CandidateTasks</div>);
// }

class CandidateTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({name: "jade"}, function () {
            console.log("CandidateTasks handleClick callback")
        });
    }

    render() {
        return <div onClick={this.handleClick}>
            CandidateTasks
        </div>
    }
}

function DelegationTasks() {
    return (<div>DelegationTasks</div>);
}


function Tasks(props) {
    let urlParams = new URLSearchParams(props.location.search), status = urlParams.get("status");
    let specifyTask = {
        pending: PendingTaskSplitterGrid,
        candidate: CandidateTasks,
        delegate: DelegationTasks
    };
    var Component = specifyTask[status] || PendingTaskSplitterGrid;
    return <>{<Component/>}</>;
}

export default Tasks;

export {HistoryTasks};