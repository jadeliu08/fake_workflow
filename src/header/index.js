import {Link, useHistory} from "react-router-dom";

import "./index.css";

function Header() {
    const history = useHistory();
    return (
        <>
            <img src={process.env.PUBLIC_URL + "OceanXWorkflow.png"} alt="OceanXWorkflow" className="header-logo" onClick={() => (history.push("/"))}/>
            <ul className="header-menu nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tasks">Inbox</Link></li>
                <li><Link to="/workflow/admin">Workflow Admin</Link></li>
                <li><Link to="/language">Language</Link></li>
                <li><Link to="/version">Version</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li>Jade</li>
            </ul>
        </>
    );
}


export default Header;