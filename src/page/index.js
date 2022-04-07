import React, {useContext, useRef, useEffect} from "react";
import {Redirect} from "react-router-dom";

import {authContext} from "../contexts";
import OceanXAuth from "../authentication";
import Header from "../header";
import "./index.css";
import UserSidebar from "../userSidebar";

let containerRef = null;

function Container() {
    const innerRef = useRef();
    useEffect(function () {
        containerRef = innerRef.current;
    }, []);
    return (<div ref={innerRef}/>);
}

function Page() {
    const context = useContext(authContext);
    return context.logged ?
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
            </div>
        </OceanXAuth>
        : <Redirect to="/login"/>;
}

export default Page;
export {containerRef};