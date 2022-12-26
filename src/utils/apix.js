import http from './http'
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
// let resquest = "/testIp/resquest"

export default{

    reg(params){ // post请求
        return http.post(`/users/reg`,{params},'api2');
    },
    login(params){ // post请求
        return http.post(`/users/login`,{params},'api2');
    },


    getListAPI(params){ // get请求
        return http.get(`${resquest}/getList.json`,params,'api2')
    },
    postFormAPI(params){ // post请求
        return http.post(`${resquest}/users/reg.json`,params,'api2')
    },
    putSomeAPI(params){ // put 请求
        return http.put(`${resquest}/putSome.json`,params,'api2')
    },
    deleteListAPI(params){ // delete 请求
        return http.delete(`${resquest}/deleteList.json`,params)
    }
}