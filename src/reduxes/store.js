import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "../counter/counterSlice";
//counterSlice传递进来的只有reducer属性及其值有用
//参数说明
//reducer:函数或Object对象，为对象时redux-toolkit会调用redux.combineReducers合并reducer对象并返回一个函数
//preloadedState:
//middleware:函数或数组
//enhancers:函数或数组
//configureStore调用createStore(rootReducer, preloadedState, composedEnhancer)返回一个store对象
var storeOptions = {reducer: counterSlice.reducer}
export default configureStore(storeOptions);


// var storeOptions2 = {
//     reducer: {
//         counterSliceReducer: function () {
//
//         },
//         taskSliceReducer: function () {
//
//         },
//         instanceSliceReducer: function () {
//
//         }
//     },
//     preloadedState: {},
//     middleware: [],
//     enhancers: []
// }