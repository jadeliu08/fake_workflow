import {createSlice} from "@reduxjs/toolkit";

//createSlice 返回一个object
// {
//     name: "counter",
//     reducer: function (state, action) {//作用是把store传过来的state、action再传递给
//             return function(state, action) {
//
//             }
//     },
//     actions: {
//         increment: function () {
//             return {type: "counter/increment", payload: arguments[0]};
//         },
//         decrement: function () {
//             return {type: "counter/decrement", payload: arguments[0]};
//         }
//     },
//     caseReducers: {
//         "increment": function (state) {
//             state.value += 1;
//         },
//         "decrement": function (state) {
//             state.value += 1;
//         }
//     },
//     getInitialState: function () {
//
//     }
// }

const counterSlice = createSlice({
    name: "counter",
    initialState: {value: 0},
    reducers: {
        increment: function (state, action) {
            debugger;
            state.value += 1;
        },
        decrement: function (state, action) {
            debugger;
            state.value -= 1;
        },
        incrementByAmount: function (state, action) {
            state.value += action.payload;
            debugger;
        }
    },
    // extraReducers
});

export default counterSlice;


export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(counterSlice.actions.incrementByAmount(amount));
    }, 1000);
}

export const selectCount = function (state) {
    debugger;
    return state.value;
};