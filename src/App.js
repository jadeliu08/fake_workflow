import React from "react";
import NavBar from "./navbar";


function Container(props) {
    return <div className="container"></div>;
}

function App() {
    return <div style={{display: "flex", height: "100vh"}}>
        <NavBar/>
        <Container style={{flex: 7}}/>
    </div>;
}


export default App;