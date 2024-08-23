import React from "react"
import { Button, Layout, Avatar, Dropdown } from 'antd'
import './index.css'
import {MenuFoldOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import {collapseMenu} from '../../store/reducers/tab'
import { useNavigate } from "react-router-dom"


const { Header, Sider, Content} = Layout

//这里接收了collpased参数
const CommonHeader = ({collapsed}) => {
  const navigate = useNavigate()
    const logout = () => {
      //清楚token-登录凭证
      localStorage.removeItem('token')
      navigate('/login')
    }
    //这里是header的内容及样式
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" >
              个人中心
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a onClick={() => logout()} target="_blank" rel="noopener noreferrer" >
              退出
            </a>
          ),
        },
      ];
    // 创建dispatch
    const dispatch = useDispatch()
    // 这里是点击展开收起按钮
    const setCollapsed = () => {
        console.log('header collapsed：', collapsed) // 这里的collapsed应该是true or false
        dispatch(collapseMenu())

    }

    //返回所有的内容
    return(
        <Header className='header-containter'>
            <Button
                type="text"
                //后续需要做成动态的按钮
                icon={<MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor: '#fff'
                }}
                onClick={() => setCollapsed()}
            />
            {/*下拉式组件 */}
            <Dropdown menu={{items}}>  
                <Avatar size={36} src={<img src={require("../../assets/images/user.png")}/>}/>
            </Dropdown>
            
            </Header>
    )
}
export default CommonHeader