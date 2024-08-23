import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'


//拦截接口,拦截ajax请求
// 帮助在开发过程中模拟后端API的响应数据
// 以便测试和开发，无需实际后端服务器的支持
Mock.mock(/home\/getData/, homeApi.getStatisticalData)
Mock.mock(/user\/getUser/, userApi.getUserList)
Mock.mock(/user\/addUser/, 'post', userApi.createUser)
Mock.mock(/user\/editUser/, 'post', userApi.updateUser)
Mock.mock(/user\/delUser/, 'post', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)