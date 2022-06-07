import React from "react";
import {Route} from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css"

import Login from "./login";
import Logout from "./logout";
import Page from "./page";

function App() {
    return <>
        <Route path="/" component={Page}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
    </>;
}

export default App;