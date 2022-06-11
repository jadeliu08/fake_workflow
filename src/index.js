import React from 'react';
import ReactDOM from 'react-dom';
import {Router, } from "react-router-dom";
import {createBrowserHistory} from 'history';


import './index.css';
import App from "./App";

//第一种写法
const history = createBrowserHistory();
ReactDOM.render(
    <Router history={history}>
        <App/>
    </Router>,
    document.getElementById('root')
);
//第二种写法
// ReactDOM.render(
//     <BrowserRouter>
//         <App/>
//     </BrowserRouter>,
//     document.getElementById('root')
// );