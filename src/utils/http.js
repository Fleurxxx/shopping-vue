/****   http.js   ****/
// 导入封装好的axios实例
import request from './request';

const http = {
    /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
    get(url, params, type) {
        const config = {
            method: 'get',
            url: url,
            urlType: type,
        };
        if (params) {
            config.data = params;
        }
        return request(config);
    },
    post(url, params, type) {
        const config = {
            method: 'post',
            url: url,
            urlType: type,
        };
        if (params) config.data = params;
        return request(config);
    },
    put(url, params, type) {
        const config = {
            method: 'put',
            url: url,
            urlType: type,
        };
        if (params) config.data = params;
        return request(config);
    },
    delete(url, params, type) {
        const config = {
            method: 'delete',
            url: url,
            urlType: type,
        };
        if (params) config.data = params;
        return request(config);
    },
};
//导出
export default http;

