import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";


import './index.css';
import {ParamsExample} from "./example";

ReactDOM.render(
    <BrowserRouter>
        <ParamsExample/>
    </BrowserRouter>
    ,
    document.getElementById('root')
);


