import React from "react";
import {Link, Switch, Route, useParams} from "react-router-dom";

function ParamsExample() {
    return (
        <div>
            <h2>Accounts</h2>
            <ul>
                <li><Link to="/netflix">Netflix</Link></li>
                <li><Link to="/zillow-group">Zillow Group</Link></li>
                <li><Link to="/yahoo">Yahoo</Link></li>
                <li><Link to="/modus-create">Modus Create</Link></li>
            </ul>
            <Switch>
                <Route path="/:childId" children={<Child/>}/>
            </Switch>
        </div>
    );
}

function Child() {
    let {childId} = useParams();
    return (<div>
        <h3>Id: {childId}</h3>
    </div>);
}

export {ParamsExample};

