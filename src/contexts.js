import {createContext} from "react";
const authContext = createContext({logged: localStorage.getItem("logged") === "true"});
export {authContext};