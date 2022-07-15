import {legacy_createStore, combineReducers} from "redux";
import {taskReducer} from "./task";

const rootReducer = combineReducers({
    task: taskReducer
});
var store = legacy_createStore(rootReducer, {});

export default store;