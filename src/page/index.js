import React, {useContext} from "react";
import {Redirect, Switch, Route} from "react-router-dom";

import {authContext} from "../contexts";
import OceanXAuth from "../authentication";
import Header from "../header";
import "./index.css";
import UserSidebar from "../userSidebar";
import Tasks, {HistoryTasks} from "../Tasks";
import {ProcessDefinitionList} from "../ProcessDefinitions";
import {ProcessInstanceList} from "../ProcessInstances";
import context from "react-router/modules/RouterContext";


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

function Test(context) {
    return null;
}

function Page() {
    const authContextValue = useContext(authContext);
    return authContextValue.logged ?
        <OceanXAuth>
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
                {/*第一种写法使用children属性*/}
                <authContext.Consumer children={Test}></authContext.Consumer>
                {/*第二种写法*/}
                {/*<authContext.Consumer>*/}
                {/*    {*/}
                {/*        (context)=>{console.log(context);}*/}
                {/*    }*/}
                {/*</authContext.Consumer>*/}
            </div>
        </OceanXAuth>
        : <Redirect to="/login"/>;
}

export default Page;