import {createSlice, current} from '@reduxjs/toolkit'


//这里的tabSlice是一个对象，由creatDSLice创建，里面的函数和其他都是该对象的属性
//其中，reducers也是一个对象，
const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false, //定义了这个 slice 的初始状态。
                           //这里初始状态是一个对象,包含一个 isCollapse 属性,初始值为 false。
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页'
            }
        ],
        currentMenu: {}

         },//调用 createSlice 函数来创建一个新的 slice。它接收一个配置对象作为参数。
    reducers: {
        //定义了这个 slice 的 reducer 函数。
        //collapseMenu用于修改当前状态
        collapseMenu: state => {
            state.isCollapse = !state.isCollapse //这里的是没问题的
        },
        selectMenuList: (state, {payload: val} )=> {
            if (val.name !== 'home') {
                state.currentMenu = val
                //如果已将存在的tag。就不需要添加去除掉
                const result = state.tabList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabList.push(val)
                }
            } else if (val.name === 'home' && state.tabList.length === 1) {
                state.currentMenu = {}
            }
        },
        closeTab: (state, {payload: val}) => {
            let res = state.tabList.findIndex(item => item.name === val.name)
            //实现删除逻辑，位置：res，数量：1个
            state.tabList.splice(res, 1)
        },
        setCurrentMenu: (state, {payload: val} ) => {
            if (val.name === 'home'){
                state.currentMenu = {}
            } else {
                state.currentMenu = val
            }
                
        } 


    }
})
export const {collapseMenu, selectMenuList, closeTab, setCurrentMenu} = tabSlice.actions
//这里使用 {collapseMenu} 的花括号是因为这是 JavaScript 的解构赋值语法
//tabSlice.actions 是一个对象，它包含了 createSlice 自动生成的所有 action creators。
//{collapseMenu} 的作用：
//它告诉 JavaScript 从 tabSlice.actions 对象中提取名为 collapseMenu 的属性。
//等价于export const collapseMenu = tabSlice.actions.collapseMenu;
export default tabSlice.reducer
