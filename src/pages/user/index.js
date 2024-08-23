import React, {useEffect, useState} from 'react'
import {Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker} from 'antd'
import './user.css'
import {getUser, addUser, editUser, delUser} from '../../api'
import dayjs from 'dayjs'

const User = () => {

    const [listData, setListData] = useState({
        name: '',

    })
    const [tableData, setTableData] = useState([])
    //0代表新增，1代表编辑
    const [modalType, setModalType] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    // 创建Form实例
    const [form] = Form.useForm()


    //新增和编辑
    const handleClick = (type, rowData) => {
        setIsModalOpen(!isModalOpen)
        if (type == 'add') {
            setModalType(0)
        } else {
            
            //深拷贝
            const cloneData = JSON.parse(JSON.stringify(rowData))
            cloneData.birth = dayjs(cloneData.birth)
            setModalType(1)
            //form表单数据回填
            form.setFieldsValue(cloneData)
        }

    }
    //提交
    const handleFinish = (e) => {
        setListData({
            name: e.keyword
        })
        console.log(e,'dddddd')
    }
    useEffect(() => {
        getTableData()
    }, [listData])
    //删除
    const handleDelete = ({id}) => {
        delUser({id}).then(() => {
            getTableData()
        })
    }
    //请求列表
    const getTableData = () => {
        //这里的.then指的是，getUser（）执行成功后才会调用的函数
        getUser(listData).then(({data}) => {
            setTableData(data.list)
        }) 
    }
    //弹窗确定
    const handleOk = () => {
        // 表单校验form.validateFields()将验证表单字段，然后处理数据 
        form.validateFields().then((val) => {
            //日期参数处理
            val.birth = dayjs(val.birth).format('YYYY-MM-DD')
            // console.log(val, 'val')
            //调用后端接口,modalType 存在说明是编辑。不存在就是新增
            if (modalType) {
                editUser(val).then(() => {
                    //关闭弹窗
                    handleCancel()
                    //更新列表数据
                    getTableData()
                    })
            } else {
                //这里的addUser的作用是向后端传递参数
                addUser(val).then(() => {
                    //关闭弹窗
                    handleCancel()
                    //更新列表数据
                    getTableData()
                })
            }
        }).catch((err) => {
            console.log(err)
        })

    }
    //弹窗取消
    const handleCancel = () => {
        setIsModalOpen(false)
        //清空表单
        form.resetFields()
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',          
        },
        {
            title: '年龄',
            dataIndex: 'age',          
        },
        {
            title: '性别',
            dataIndex: 'sex',
            render: (val) => {
                return val ? '女' : '男'
            }          
        },
        {
            title: '出生日期',
            dataIndex: 'birth',          
        },
        {
            title: '地址',
            dataIndex: 'addr',          
        },
        {
            title: '操作',
            render: (rowData) => {
                return (
                    <div className='flex-box'>
                        <Button style={{marginRight:'5px'}} onClick={() => handleClick('edit', rowData)}>编辑</Button>
                        <Popconfirm
                        title='提示' 
                        description='此操作将删除用户，是否继续'
                        okText='确认'
                        cancelText='取消'
                        onConfirm={() => handleDelete(rowData)}>
                        <Button type='primary' danger>删除</Button>
                            </Popconfirm>
                    </div>
                )
            }        
        },
    ]

    //页面首次加载,空数组表示首次加兹安
    useEffect(() => {
        //调用后端接口，获取用户列表数据
        getTableData()

    },[])
    return (
        <div className='user'>
            <div className='flex-box space-between'>
                <Button type='primary' onClick={() => handleClick('add')}>+新增</Button>
                <Form
                layout='inline'
                onFinish={handleFinish} >
                    <Form.Item name='keyword'>
                        <Input placeholder='请输入用户名'></Input>
                    </Form.Item>
                    <Form.Item>
                        {/* submit表示点击按钮时会触发表单的提交操作
                        primary为主按钮 */}
                        <Button htmlType='submit' type='primary'>搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table style={{maiginTop: '10px'}} columns={columns} dataSource={tableData} rowKey={'id'}></Table>
            <Modal
                open={isModalOpen}
                title={modalType ? '编辑用户' : '新增用户'}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='确定'
                cancelText='取消'              
                >
                    <Form
                        form={form}
                        labelCol={{
                            span: 6
                        }}
                        wrapperCol={{
                            span: 18
                        }}
                        labelAlign='left'
                        >
                        {/* 手动获取ID */}
                        {
                            modalType ==1 && 
                            <Form.Item
                            name='id'
                            hidden 
                            >
                                <Input/>
                            </Form.Item>                         
                        }
                        
                        <Form.Item
                            label='姓名'
                            name='name'
                            rules={[{
                                required: true,
                                message: '请输入姓名'
                            }]} 
                        >
                            <Input placeholder='请输入姓名' />
                        </Form.Item>
                        <Form.Item
                            label='年龄'
                            name='age'
                            rules={[{
                                required: true,
                                message: '请输入年龄'
                            },
                            {
                                type: 'number',
                                message: '年龄必须是数字'
                            }
                        ]} 
                        >
                            <InputNumber placeholder='请输入年龄' />
                        </Form.Item>
                        <Form.Item
                            label='性别'
                            name='sex'
                            rules={[{
                                required: true,
                                message: '性别是必选'
                            }                           
                        ]} 
                        >
                            <Select
                            placeholder='请选择性别'
                                options={[
                                    {value: 0, label: '男'},
                                    {value: 1, label: '女'}
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label='出生日期'
                            name='birth'
                            rules={[{
                                required: true,
                                message: '请选择出生日期'
                            }                           
                        ]} 
                        >
                            <DatePicker placeholder='请选择' format='YYYY/MM/DD'/>
                        </Form.Item>
                        <Form.Item
                            label='地址'
                            name='addr'
                            rules={[{
                                required: true,
                                message: '请填写地址'
                            }                           
                        ]} 
                        >
                            <Input placeholder='请填写地址' />
                        </Form.Item>
                    </Form>

            </Modal>
        </div>
    )
}
export default User