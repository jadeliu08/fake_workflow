import React, {useContext, useState} from "react";
import {Redirect, withRouter} from "react-router-dom";
import {authContext} from "../contexts";
import "./index.css";

function Login(props) {
    const [username, setUsername] = useState(sessionStorage.getItem("username") || "");
    const [password, setPassword] = useState(sessionStorage.getItem("password") || "");
    const context = useContext(authContext);


    function handleBtnClick(e) {
        if (e.type === "click" || e.keyCode === 13) {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("logged", "true");
            context.logged = true;
            props.history.push("/");
        }
    }

    return context.logged ? <Redirect to="/"/> : (
        <div className="login-wrapper" onKeyUp={handleBtnClick}>
            <div className="login-item">
                <span className="label">用户名：</span>
                <div className="content">
                    <input type="input" name="username" value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>
            </div>
            <div className="login-item">
                <span className="label">密码：</span>
                <div className="content">
                    <input type="password" name="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>
            </div>
            <div className="login-item">
                <span className="label"> </span>
                <div className="content">
                    <button className="btn" onClick={handleBtnClick}>登录</button>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);