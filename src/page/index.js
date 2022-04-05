import React, {useContext} from "react";
import {Redirect} from "react-router-dom";

import {authContext} from "../contexts";
import OceanXAuth from "../authentication";
import Header from "../header";
import "./index.css"


function Page() {
    const context = useContext(authContext);
    return context.logged ?
        <OceanXAuth>
            <div className="page">
                <div className="header">
                    <Header/>
                </div>
                <div className="sidebar">
                    <nav>
                        <li>1</li>
                        <li>2</li>
                    </nav>
                </div>
                <div className="content">Content</div>
            </div>
        </OceanXAuth>
        : <Redirect to="/login"/>;
}

export default Page;