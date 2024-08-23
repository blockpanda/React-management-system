import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
import {useSelector} from 'react-redux'
import CommonTag from '../components/commonTag';
import { RouterAuth } from '../router/routerAuth';

const { Header, Sider, Content} = Layout;

const Main = () => {
    // 跨组件通讯，先去掉
    // const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    //获取展开收起的状态
    //useSelector 是React Redux提供的一个hook，用于从Redux store中选择和读取状态。
    const collapsed = useSelector(state => state.tab.isCollapse)
    console.log('main collapsed：', collapsed)//这里传入的collapsed就是未定义
    return (
        <RouterAuth>
        <Layout className='main-container'>
            <CommonAside collapsed={collapsed}/>
            <Layout>
                    <CommonHeader collapsed={collapsed}/>
                        <CommonTag/>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
        </RouterAuth>
    );
};
//设置为默认导出，其他文件可以使用import Main导入

export default Main