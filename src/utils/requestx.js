/****   request.js   ****/
// 导入axios
import axios from 'axios';
// 使用element-ui Notification做消息提醒
import {ElNotification} from 'element-plus'
let baseURL = 'http://localhost:8088';
let baseURL2 = '/testIp';
//1. 创建新的axios实例，
const service = axios.create({
    // 超时时间 单位是ms，这里设置了8s的超时时间
    timeout: 8 * 1000,
});
// 2.请求拦截器
service.interceptors.request.use(
    (config) => {

        //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
        // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
        const qs = require('qs');
        config.data = qs.parse(config.data)//qs转换

        console.log('config', config.data);
        config.headers = {
            'Content-Type': 'application/json', //配置请求头
            // 'Content-Type':'multipart/form-data; boundary=ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC'
        };
        config.contentType = 'application/json' //'application/x-www-form-urlencoded'
        console.log(baseURL2)
        switch (baseURL2) {
            case 'api1':
                config.url = baseURL + config.url;
                break;
            case 'api2':
                config.url = baseURL2 + config.url;
                break;
            default:
                config.url = baseURL + config.url;
        }
        //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
        // const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
        // if(token){
        //   config.params = {'token':token} //如果要求携带在参数中
        //   config.headers.token= token; //如果要求携带在请求头中
        // }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// 3.响应拦截器
service.interceptors.response.use(
    (response) => {
        //接收到响应数据并成功后的一些共有的处理，关闭loading等

        return response;
    },
    (error) => {
        /***** 接收到异常响应的处理开始 *****/
        if (error && error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
            if (error.response.code != 10000) {
                ElNotification.error({
                    title: error.response.data.message,
                    duration: 5000
                })
            }
        } else {
            // 超时处理
            if (JSON.stringify(error).includes('timeout')) {
                ElNotification.error('服务器响应超时，请刷新当前页');
            }
            error.message = '连接服务器失败';
        }
        ElNotification.error(error.message);
        /***** 处理结束 *****/
        //如果不需要错误处理，以上的处理过程都可省略
        return Promise.resolve(error.response);
    },
);
//4.导入文件
export default service;
