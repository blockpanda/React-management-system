import React from 'react'
import MenuConfig from '../../config'
import * as icon from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {selectMenuList} from '../../store/reducers/tab'
//这里的useNavigate的作用是实现路由跳转
//调用useNavigate来获取一个导航函数
const { Header, Sider, Content} = Layout;

//动态获取icon
const iconToElement = (name) => React.createElement(icon[name])
//处理菜单的数据,下面的icon.最好写成item

const items = MenuConfig.map((icon) => {
    //没有子菜单
    const child = {
        key: icon.path,
        icon: iconToElement(icon.icon),
        label: icon.label
    }
    //有子菜单的情况
    if (icon.children) {
        child.children = icon.children.map(item => {
            return {
                key: item.path,
                label: item.label
            }
        })
    }
    return child

})


const CommonAside = ({collapsed}) => {
    //跳转的实例，返回的是一个路径
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    //添加数据到store
    const setTabList = (val) => {
        dispatch(selectMenuList(val))
    }
    console.log(collapsed, 'commonAside')
    //点击菜单
    //这里的e是react的特定组件库传递的一个对象
    // e.key是特定的一个属性
    const selectMenu = (e) => {
        console.log(e)
        let data
        MenuConfig.forEach(item => {
            //找到当前数据
            if (item.path === e.keyPath[e.keyPath.length-1]) {
                data = item
                //如果有二级菜单
                if (e.keyPath.length > 1) {
                    item.children.find(child => {
                        return child.path == e.key
                    })
                }
            }
        })
        setTabList({
            path: data.path,
            name: data.name,
            label: data.label
        })
        navigate(e.key)
    }
    return(
        <Sider trigger={null} collapsed={collapsed} >
        <h3 className='app-name'>{collapsed ? '后台' : '通用后台管理系统'}</h3>

        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={items}
            style={{
                height: '100%'
            }}
            onClick={selectMenu} //将selectMenu函数绑定到某个元素的单击事件上，来选择key
        />
    </Sider>
    )
}
export default CommonAside