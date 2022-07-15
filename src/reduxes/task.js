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