import Mock from 'mockjs';
import homeApi from './mockServeData/home';

/**
 * mock模拟后端数据
 * @type {string}
 */

let api = 'http://localhost:8088';

//定义mock请求拦截
Mock.mock(api+'/home/getData',homeApi.getStatisticalData)

// 定义mock请求拦截
// Mock.mock(api+'/home/getData',function () {
//     //拦截到请求后的处理逻辑
//     console.log('拦截到了');
//     return []
// })
