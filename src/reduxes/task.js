import {createSlice} from "@reduxjs/toolkit";

const TASK_ACTION = {
    TASK_ROW_CLICK: "task_row_click"
}

const initialState = {
    rowDataItem: {}
}

const taskReducer = function (state = initialState, action) {
    if (action.type === TASK_ACTION.TASK_ROW_CLICK) {
        return {...state, rowDataItem: action.rowDataItem};
    }
    return state;
};

const gridRowItemSelector = (state) => (state.task.rowDataItem);

export {taskReducer, TASK_ACTION, gridRowItemSelector};

// const taskSlice = createSlice({
//     name: "task",
//     reducers: {
//         "row_click": function (state, action) {
//             return {...state, rowDataItem: action.rowDataItem}
//         },
//         "row_remove": function () {
//
//         }
//     },
//     initialState: {
//         rowDataItem: {}
//     }
// });