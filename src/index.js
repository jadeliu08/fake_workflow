import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import './index.css';
import App from './App';
import Expenses from "./expense";
import Invoices, {Invoice} from "./invoice";


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="expenses" element={<Expenses/>}/>
                <Route path="invoices" element={<Invoices/>}>
                    <Route path=":id" element={<Invoice/>}/>
                    {/* index route共享父路径 */}
                    <Route index element={<main style={{padding: "1rem"}}><p>Select an invoice</p></main>}/>
                </Route>
                <Route path="*" element={<main style={{padding: "1rem"}}><p>There is nothing here!</p></main>}/>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);


