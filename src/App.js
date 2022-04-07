import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./login";
import Logout from "./logout";
import Page, {containerRef} from "./page";
import Tasks, {HistoryTasks} from "./Tasks";
import {ProcessDefinitionList} from "./ProcessDefinitions";
import {ProcessInstanceList} from "./ProcessInstances";

function OXRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} children={function (routeProps) {
            return ReactDOM.render(<Component {...routeProps} />, containerRef);
        }}/>
    );
}

function App() {
    return <BrowserRouter>
        <Route path="/" component={Page}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Switch>
            <OXRoute exact path="/tasks" component={Tasks}/>
            <OXRoute path="/tasks/history" component={HistoryTasks}/>
            <OXRoute path="/process_definitions" component={ProcessDefinitionList}/>
            <OXRoute path="/process_instances" component={ProcessInstanceList}/>
        </Switch>
    </BrowserRouter>;
}


export default App;