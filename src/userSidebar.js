import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {userSidebarDataSource} from "./data";

function UserSidebar() {
    const [taskCounter, setTaskCount] = useState(0);
    useEffect(function () {
        var worker = new Worker("workers/tasks_worker.js");
        worker.addEventListener("message", function (ev) {
            setTaskCount(ev.data);
        });
        worker.postMessage("");
    }, []);
    return <nav className="nav">
        {
            userSidebarDataSource.map(function (item) {
                if (item.key === "inbox") {
                    return <li key={item.key}><Link to={item.path}>{item.text}</Link><span className="k-badge k-badge-md !k-rounded-md k-bg-warning">{taskCounter}</span></li>
                } else {
                    return <li key={item.key}><Link to={item.path}>{item.text}</Link></li>
                }
            })
        }
    </nav>;
}

export default UserSidebar;