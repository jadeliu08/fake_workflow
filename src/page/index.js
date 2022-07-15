import React, {useContext} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../reduxes/store";

import {authContext} from "../contexts";
import OceanXAuth from "../authentication";
import Header from "../header";
import "./index.css";
import UserSidebar from "../userSidebar";
import Tasks, {HistoryTasks} from "../Tasks";
import {ProcessDefinitionList} from "../ProcessDefinitions";
import {ProcessInstanceList} from "../ProcessInstances";


function Container() {
    return (
        <Switch>
            <Route exact path="/tasks" component={Tasks}/>
            <Route path="/tasks/history" component={HistoryTasks}/>
            <Route path="/process_definitions" component={ProcessDefinitionList}/>
            <Route path="/process_instances" component={ProcessInstanceList}/>
        </Switch>
    );
}

function Page() {
    const authContextValue = useContext(authContext);
    return authContextValue.logged ?
        <OceanXAuth>
            <Provider store={store}>
                <div className="page">
                    <div className="header">
                        <Header/>
                    </div>
                    <div className="sidebar">
                        <UserSidebar/>
                    </div>
                    <div className="content">
                        <Container/>
                    </div>
                </div>
            </Provider>
        </OceanXAuth>
        : <Redirect to="/login"/>;
}

export default Page;