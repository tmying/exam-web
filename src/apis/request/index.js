// 引入axios模块
import axios from 'axios'

// 配置axios实例
const instance = axios.create({
    baseURL: 'http://localhost:3000', //后端服务器地址
    timeout: 5000 //请求超时的最大时间
})

// 导出axios模块
export default instance;