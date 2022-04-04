import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";

import './index.css';
import App from './App';
import Expenses from "./expense";
import Invoices, {Invoice} from "./invoice";


ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={App} />
        <Route path="/expenses" component={Expenses}/>
        <Route path="/invoices" component={Invoices} />
        <Route path="/invoices:id" component={Invoice}/>
    </BrowserRouter>,
    document.getElementById('root')
);


