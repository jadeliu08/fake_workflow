import React, { useEffect, useLayoutEffect, useState } from "react";
import "./app.css";

function Page(props) {
    useLayoutEffect(function () {
        console.log("Page useLayoutEffect called");
        return function () {
            console.log("Page useLayoutEffect destroy called");
        }
    });
    return <div>
        {props.children}
    </div>;
}

function Header() {
    useLayoutEffect(function () {
        console.log("Header useLayoutEffect called");
        return function () {
            console.log("Header useLayoutEffect destroy called");
        }
    });
    return <div>This is Header</div>;
}
function Container(props) {
    useLayoutEffect(function () {
        console.log("Container useLayoutEffect called");
        return function () {
            console.log("Container useLayoutEffect destroy called");
        }
    });
    useEffect(function () {
        console.log("Container useEffect called");
        return function () {
            console.log("Container useEffect destroy called");
        }
    });
    return <div>
        {props.children}
    </div>
}

function App() {
    useLayoutEffect(function () {
        console.log("App useLayoutEffect called");
        return function () {
            console.log("App useLayoutEffect destroy called");
        }
    });
    useEffect(function () {
        console.log("App useEffect1 called");
        return function () {
            console.log("App useEffect1 destroy called");
        }
    });
    useEffect(function () {
        console.log("App useEffect2 called");
        return function () {
            console.log("App useEffect2 destroy called");
        }
    });
    useEffect(function () {
        console.log("App useEffect3 called");
        return function () {
            console.log("App useEffect3 destroy called");
        }
    });
    const [count, setCount] = useState(0);
    return <Page>
        <Header />
        <Container>
            <div className="child">Child1</div>
            <div className="child">Child2</div>
            <div className="child">Child3</div>
            <button type="button" className="k-button" onClick={() => { setCount(count + 1) }}>Click Me</button>
            <br />
            <span>{count}</span>
        </Container>
    </Page>;
}

export default App;