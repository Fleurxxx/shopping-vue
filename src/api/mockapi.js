import axios from "axios";
// import qs from 'qs'
import router from "@/router";
import { ElMessage } from "element-plus";


const api = axios.create({
    baseURL : 'http://localhost:8088',
    // baseURL : '/proxy_url',
    timeout: 20000,
    responseType: "json",
});



api.interceptors.request.use((request) => {
    /**
     * 全局拦截请求发送前提交的参数
     * 以下代码为示例，在请求头里带上 token 信息
     */
    // if (userStore.isLogin) {
    //     request.headers["token"] = userStore.token;
    // }
    // 是否将 POST 请求参数进行字符串化处理
    if (request.method === "post") {
        // request.data = qs.stringify(request.data, {
        //     arrayFormat: 'brackets'
        // })
    }

    return request;
});

api.interceptors.response.use(
    (response) => {
        /**
         * 全局拦截请求发送后返回的数据，如果数据有报错则在这做全局的错误提示
         * 假设返回数据格式为：{ status: 1, error: '', data: '' }
         * 规则是当 status 为 1 时表示请求成功，为 0 时表示接口需要登录或者登录状态失效，需要重新登录
         * 请求出错时 error 会返回错误信息
         */
        // if (response.data.status === 1) {
        //     if (response.data.error === "") {
        //         // 请求成功并且没有报错
        //         return Promise.resolve(response.data);
        //     } else {
        //         // 这里做错误提示
        //         // ElMessage.error(options)
        //         return Promise.reject(response.data);
        //     }
        // } else {
        //     toLogin();
        // }
        return Promise.resolve(response.data);
    },
    (error) => {
        let message = error.message;
        if (message == "Network Error") {
            message = "后端故障，请联系管理员";
        } else if (message.includes("timeout")) {
            message = "接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = error.response.data.msg;
        }
        ElMessage({
            message,
            type: "error",
            showClose: true,
            duration: 5000,
        });
        return Promise.reject(error);
    }
);

export default api;
