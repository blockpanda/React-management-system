import React, {useEffect, useState} from 'react'
import {Col, Row, Card, Table} from 'antd'
import './home.css'
import {getData} from '../../api'
import * as Icon from "@ant-design/icons";
import * as echarts from 'echarts'
import MyEcharts from '../../components/Echarts'

/* useState:

用于在函数组件中添加状态
返回一个状态值和更新它的函数
可以保存任何类型的值(数字、字符串、对象等)
当状态更新时,组件会重新渲染

useEffect:

用于处理副作用,如数据获取、订阅或手动修改DOM
在组件渲染后执行
可以通过第二个参数控制执行时机
可以返回一个清理函数,在组件卸载时执行 

componment：
组件*/


const columns = [
    {
      title: '课程',
      dataIndex: 'name'
    },
    {
      title: '今日购买',
      dataIndex: 'todayBuy'
    },
    {
      title: '本月购买',
      dataIndex: 'monthBuy'
    },
    {
      title: '总购买',
      dataIndex: 'totalBuy'
    }
  ]
  const countData = [
    {
      "name": "今日支付订单",
      "value": 1234,
      "icon": "CheckCircleOutlined",
      "color": "#2ec7c9"
    },
    {
      "name": "今日收藏订单",
      "value": 3421,
      "icon": "ClockCircleOutlined",
      "color": "#ffb980"
    },
    {
      "name": "今日未支付订单",
      "value": 1234,
      "icon": "CloseCircleOutlined",
      "color": "#5ab1ef"
    },
    {
      "name": "本月支付订单",
      "value": 1234,
      "icon": "CheckCircleOutlined",
      "color": "#2ec7c9"
    },
    {
      "name": "本月收藏订单",
      "value": 3421,
      "icon": "ClockCircleOutlined",
      "color": "#ffb980"
    },
    {
      "name": "本月未支付订单",
      "value": 1234,
      "icon": "CloseCircleOutlined",
      "color": "#5ab1ef"
    }
  ]

//动态获取icon
//定义了iconToElement的常量函数，----箭头函数， ----传入name参数， ----调用React中的createElement的方法
// 用于创建React元素， 调用了antd中的Icon方法
const iconToElemment = (name) => React.createElement(Icon[name])

const Home = () => {
    //require 函数用于在 JavaScript 文件中导入其他模块、文件或资源
    const userImg = require("../../assets/images/user.png")
    //创建echart的响应数据
    //这里的 useState中的{} 是一个空对象，赋值给echartData，作为 useState 的参数，表示状态的初始值
    // useState 返回一个数组，使用数组解构来获取其中的值。
    const [echartData, setEchartData] = useState({})

    //这里useEffect的作用是在组件挂载后执行一次数据获取和处理操作
    // 这个 useEffect 会在组件首次渲染后执行。
    // 空数组 [] 作为第二个参数，表示这个效果只在组件挂载时运行一次。
    useEffect(() => {
        // .then() 是 JavaScript Promise 对象的一个方法，用于处理异步操作
        // .then() 用于指定 Promise 成功时（即 resolved 状态）的回调函数
        // getData()执行成功后才会执行.then()，该函数接收 getData() 返回的结果作为参数
        getData().then(({data}) => {
            // console.log(data, 'res')
            const {tableData, orderData, userData, videoData} = data.data
            
            setTableData(tableData)
            //对于echarts数据的组装
            const order = orderData
            //x轴的数据
            const xData = order.date
            //series数据的组装Object.keys--把传入对象的KEY转为数组
            const keyArray = Object.keys(order.data[0])
            const series = []
            // 遍历keyArray，对里面的每一个key，执行一次箭头函数
            keyArray.forEach(key => {
                series.push({
                    name: key,
                    // 根据key取出数值，组成一个数组
                    data: order.data.map(item => item[key]),
                    type: 'line'
                })
            })
            
            setEchartData({
                order: {
                    xData,
                    series
                },
                user: {
                    xData: userData.map(item => item.date),
                    series: [
                        {
                            name: '新增用户',
                            data: userData.map(item => item.new),
                            type: 'bar'
                        },
                        {
                            name: '活跃用户',
                            data: userData.map(item => item.active),
                            type: 'bar'
                        }
                    ]
                },
                video: {
                    series: [
                        {
                            data:videoData,
                            type: 'pie'
                        }
                    ]
                }
            })
        })

    }, [])
    //定义table数据
    const [tableData, setTableData, userData, videoData] = useState([])
    
    return (
        //row代表当前的每一行 ，col代表其中的每一个单元格
        <Row className='home'>
            <Col span={8}>            
            <Card hoverable>
                <div className='user'>
                    <img src={userImg}/>
                    <div className='userinfo'>
                        <p className='name'>Admin</p>
                        <p className='access'>超级管理员</p>
                    </div>
                </div>
                <div className='login-info'>
                    <p>上次登录时间：<span>2021.11.15</span></p>
                    <p>上次登录地点：<span>济南</span></p>
                </div>
            </Card>
            <Card>
                
                {/* Todo:数据是怎么传进来的 */}
                <Table rowKey={'name'}columns={columns} dataSource={tableData} pagination={false}/>
            </Card>
            
            </Col>
            <Col span={16}>
                <div className="num">
                    {
                        countData.map((item, index) => {
                            return (
                                <Card key={index}>
                                    <div className='icon-box' style={{background: item.color}}>
                                        {iconToElemment(item.icon)}
                                    </div>
                                    <div className='detail'>
                                        <p className='num'>￥{item.value}</p>
                                        <p className='txt'>{item.name}</p>
                                    </div>

                                </Card>

                            )
                        })
                    }
                </div>
                {echartData.order &&< MyEcharts chartData={echartData.order} style={{height: '280px'}}/>}
                <div className='graph'>
                    {echartData.user && <MyEcharts chartData={echartData.user} style={{height:'240px', width:'50%'}}/>}
                    {echartData.video && <MyEcharts chartData={echartData.video} isAxisChart={false} style={{height:'260px', width:'50%'}}/>}

                </div>
            </Col>
        </Row>
    )
}
export default Home