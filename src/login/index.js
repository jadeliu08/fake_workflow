import {useState} from "react";
import {useHistory} from "react-router-dom";
import "./index.css";

function Login() {
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const history = useHistory();

    function handleBtnClick(e) {
        if (e.type === "click" || e.keyCode === 13) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            localStorage.setItem("logged", "true");
            history.push("/");
        }
    }

    return (
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

export default Login;