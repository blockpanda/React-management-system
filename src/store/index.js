import {configureStore} from '@reduxjs/toolkit'
//configureStore 是 Redux Toolkit 提供的一个函数,
//它封装了创建 store 的过程,包括组合 reducers、添加中间件等
import TabReducer from './reducers/tab'
//TabReducer 指的就是 tabSlice.reducer，也就是 createSlice 为您的 tab slice 自动生成的 reducer 函数。


//configureStore是 Redux Toolkit 提供的一个函数，用于创建和配置 Redux store
export default configureStore({
    reducer: {tab: TabReducer}//定义了store树的根部
    //使用了对象来定义reducer
    //tab: TabReducer 表示 store 中有一个名为 tab 的 slice,
    //它由 TabReducer 来管理
})