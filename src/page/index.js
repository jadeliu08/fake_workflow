import React, {useContext} from "react";
import {Redirect, Route, Switch, Link} from "react-router-dom";

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
                <div className="content">
                    Content
                    <Link to="/about">About</Link>
                    <Switch children={<h2>Switch children</h2>}>
                        <Route exact path="/about" render={() => (<h2>render</h2>)}/>
                        <Route render={() => (<h2>No path</h2>)}/>
                    </Switch>
                </div>
            </div>
        </OceanXAuth>
        : <Redirect to="/login"/>;
}

export default Page;