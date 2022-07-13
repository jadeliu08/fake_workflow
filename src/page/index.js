import React, {useContext, useState} from "react";
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
import Counter from "../counter/counter"


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

function Test(contextValue) {
    const [name, setName] = useState("Test");
    store.subscribe(function () {
        setName("TestChanged");
    });
    return <div>{name}</div>;
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
                    {/*第一种写法使用children属性,此时Test组件内不能使用hook，因为react内部是通过调用props.children(contextValue)来生成children子节点的*/}
                    {/*<authContext.Consumer children={Test}></authContext.Consumer>*/}
                    {/*第二种写法*/}
                    <authContext.Consumer>
                        {
                            (contextValue) => (<Test/>)
                        }
                    </authContext.Consumer>
                </div>
                <Counter/>
            </Provider>
        </OceanXAuth>
        : <Redirect to="/login"/>;
}

export default Page;