import {authContext} from "./contexts";

function OceanXAuth(props) {
    return <authContext.Provider value={{logged: false}}>
        {props.children}
    </authContext.Provider>
}

export default OceanXAuth;

