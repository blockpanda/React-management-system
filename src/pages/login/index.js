import React from 'react'
import {Form, Input, Button, message} from 'antd'
import './login.css'
import {getMenu} from '../../api'
//Navigate的作用是重定向
import { useNavigate, Navigate } from 'react-router-dom'

//以组件的形式写，所以首字母必须大写
const Login = () => {
    //navigate的作用是跳转？
    const navigate = useNavigate()
    //在登录状态下，需要跳转到home页面
    if (localStorage.getItem('token')) {
        return <Navigate to='/home' replace/>
    }
    const handleSubmit = (val) => {
        if (!val.password || !val.username) {
            return message.open({
                type: 'warning',
                content: '请输入用户名和密码'
            })
        }
        getMenu(val).then((data) => {
            console.log(data)
            //设置缓存
            localStorage.setItem('token', data.data.token)
            navigate('/home')
        })
    }
    return (
        <Form className='login-container' onFinish={handleSubmit}>
           <div className='login-title'>
        系统登录
           </div>
           <Form.Item
           label='账号'
           name='username'
           >
                <Input placeholder='请输入账号'/>

           </Form.Item>
           <Form.Item
           label='密码'
           name='password'
           >
                <Input.Password placeholder='请输入密码'/>

           </Form.Item>
           <Form.Item className='login-button'>
                <Button type='primary' htmlType='submit'> 登录</Button>
           </Form.Item>

        </Form>
    )
}

export default Login