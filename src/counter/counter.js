import {useSelector, useDispatch} from 'react-redux';
import counterSlice, {selectCount, incrementAsync} from "../reduxes/counter";
import {useState} from "react";

function Counter(props) {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [stepper, setStepper] = useState("2");
    return (
        <div>
            <div>
                <button aria-label="Increment value" onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>
            </div>
            <div>
                <input type="text" value={stepper} onChange={(e) => {
                    setStepper(e.target.value);
                }}/>
                <button onClick={() => {
                    dispatch(counterSlice.actions.incrementByAmount(Number(stepper) || 0))
                }}>Add Amount
                </button>
                <button onClick={() => {
                    dispatch(incrementAsync(Number(stepper) || 0))
                }}>Add Async
                </button>
            </div>
        </div>
    )
}

export default Counter;