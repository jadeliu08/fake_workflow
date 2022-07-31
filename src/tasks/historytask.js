import React, {useEffect, useState} from "react";

class TextMemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
    }

    componentDidMount() {
        this.setState({counter: ++this.state.counter}, function () {
            console.log("componentDidMount")
        });
    }

    render() {
        function handleMouseDown(event) {
            console.log("MouseDown");
        }

        function handleMouseUp(event) {
            console.log("MouseUp");
        }

        function handleClick(event) {
            console.log("Click");
        }

        function handleDoubleClick(event) {
            console.log("DoubleClick");
        }

        return <div onMouseDown={handleMouseDown} onClick={handleClick} onMouseUp={handleMouseUp} onDoubleClick={handleDoubleClick}>TextMemo--{this.state.counter}</div>;
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

function HistoryTaskGrid() {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const outerRef = React.createRef();
    useEffect(function () {
        console.log("HistoryTaskGrid create");
        return function () {
            console.log("HistoryTaskGrid destroy");
        }
    }, [number1]);
    return <div>
        <span>HistoryTasks----number1:</span><span>{number1}</span>
        <NewTextMemo number1={number1} number2={number2}/>
        <button onClick={() => {
            setNumber1(number1 + 1);
        }}>改变number1
        </button>
        <button onClick={() => {
            setNumber2(number1 + 1);
            outerRef.current.changeFocus();
        }}>改变number2
        </button>
        <FancyComponent ref={outerRef}/>
        <React.Suspense fallback={(<div>Loading</div>)}>
            <LazyComponent/>
        </React.Suspense>
    </div>;
}

const FancyComponent = React.forwardRef(function (props, ref) {
    const innerRef = React.useRef();
    React.useImperativeHandle(ref, function () {
        return {
            changeFocus: function () {
                innerRef.current.focus();
            }
        }
    });
    return <input type="text" name="testInput" ref={innerRef}/>
});

//px em

export default HistoryTaskGrid;