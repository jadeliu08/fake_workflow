import React from "react";
import {Link} from "react-router-dom";
import {userSidebarDataSource} from "./data";

function UserSidebar() {
    return <nav className="nav">
        {userSidebarDataSource.map((item) => (<li key={item.key}><Link to={item.path}>{item.text}</Link></li>))}
    </nav>;
}

export default UserSidebar;