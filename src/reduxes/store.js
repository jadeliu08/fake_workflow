import {legacy_createStore, combineReducers} from "redux";

const rootReducer = combineReducers({
    part1: function (state, action) {
        if (action.type === "dispatch_part1") {
            return action.hasOwnProperty("newValue") ? action.newValue : "part1_state";
        }
        return "part1";
    },
    part2: function (state, action) {
        return "part2_state";
    },
    part3: function (state, action) {
        return "part3_state";
    }
});
var store1 = legacy_createStore(rootReducer, {});

export default store1;