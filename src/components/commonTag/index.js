//命名规范
// 类名、组件名、构造函数名--用大驼峰
// 变量名、函数名、对象名--用小驼峰

import React from 'react'
import { Tag, Space} from 'antd'
import './index.css'
import {useLocation, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {closeTab, setCurrentMenu} from  '../../store/reducers/tab'

const CommonTag = () => {
    const tabsList = useSelector(state => state.tab.tabList)
    const currentMenu = useSelector(state => state.tab.currentMenu)
    const dispatch = useDispatch()
    const action = useLocation()
    const navigate = useNavigate()
    const handleClose = (tag, index) => {
        let length = tabsList.length - 1
        dispatch(closeTab(tag))
        //关闭的不是当前的tag
        if (tag.path !== action.pathname) {
            return
        }
        if (index === length) {
            //设置点前的数据
            const curData = tabsList[index - 1]
            dispatch(setCurrentMenu(curData))
            //路由跳转
            navigate(curData.path)
        dispatch(setTag(tag))
        } else {
            //如果tag存在一个数据，则选中后一个tag
            if (tabsList.length > 1) {
                //跳转到下一个tag
                const nextData = tabsList[index + 1]
                dispatch(setCurrentMenu())
                navigate(nextData.path)
            }
        }

    }
    //点击Tag函数
    const handleChange = (tag) => {
        dispatch(setCurrentMenu(tag))
        //路由跳转
        navigate(tag.path)

    }
    //处理tag显示的函数
    const setTag = (flag, item, index) => {
        return (
            flag ? 
            <Tag color='#55acee' closeIcon onClose={() => handleClose(item, index)}>{item.label} </Tag>
            : 
            <Tag onClick={() => handleChange(item)} key={item.name}>{item.label}</Tag>
        )
    }
    return (
        <Space className='common-tag' size={[0,8]} wrap>
            {/* <Tag>首页</Tag>
            <Tag color='#55acee' closeIcon onClose={() => handleClose() }>
                用户列表
            </Tag> */}
            {
                currentMenu.name && tabsList.map((item, index) => (setTag(item.path === currentMenu.path, item, index)))
            }
        </Space>
    )
}

export default CommonTag