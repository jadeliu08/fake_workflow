import store1 from "../reduxes/store";

function Counter(props) {
    function handleClick() {
        store1.dispatch({type: "dispatch_part1", newValue: "handleClick"});
    }

    return (
        <div>
            <div>
                <button aria-label="Increment value" onClick={handleClick}>Click Me</button>
            </div>
        </div>
    )
}

export default Counter;