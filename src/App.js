import React from "react";
import {Switch, Route, Link, useParams, useRouteMatch} from "react-router-dom";

function App() {
    return (
        <div>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/topics" component={Topics}/>
                </Switch>
            </div>
        </div>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function Topics() {
    let match = useRouteMatch();
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
                <li><Link to={`${match.url}/components`}>Components</Link></li>
                <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
            </ul>
            <Switch>
                <Route exact path={match.path}><h3>Please select a topic.</h3></Route>
                <Route  path={`${match.path}/:topicId`} component={Topic}/>
            </Switch>
        </div>
    );
}

function Topic() {
    let {topicId} = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}

export default App;