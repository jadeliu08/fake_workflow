import React from "react";
import {BrowserRouter, Route} from "react-router-dom";

import Login from "./login";
import Logout from "./logout";
import Page from "./page";

function App() {
    return <BrowserRouter>
        <Route path="/" component={Page}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
    </BrowserRouter>;
}


export default App;