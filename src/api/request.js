import api from "./api";
import qs from "qs";

let personReq = {};
//注册
personReq.reg = async (form) => {
    let res = await api.post("users/reg", form);
    return res;
};
//获取验证码
personReq.getCode = async (form) => {
    let res = await api.post("users/sendCode", form);
    return res;
};
//登录
personReq.login = async (form) => {
    let res = await api.post("users/login", form);
    return res;
};
//找回密码
personReq.changepwd = async (form) => {
    console.log(form);
    let res = await api.post("users/changepwd", form);
    return res;
};
//获取用户全部资料
personReq.getUserInfo = async (data) => {
    let res = await api.post("users/getUserInfo",data);
    return res;
};
//修改用户个人资料
personReq.changeInfo = async (form) => {
    let res = await api.post("users/changeInfo",form);
    return res;
};
//获取用户物流信息
personReq.getLogistics = async (data) => {
    let res = await api.post("order/getLogistics",data);
    return res;
};
//确认收获
personReq.confirmReceipt = async (data) => {
    let res = await api.post("order/confirmReceipt",data);
    return res;
};

//首页搜索(商品)
personReq.searchGoods = async (form) => {
    let res = await api.post("/goods/searchGoods",form);
    return res;
};
// 首页获取推荐商品
personReq.recommendGoods = async () => {
    let res = await api.post("/goods/recommendGoods");
    return res;
};
// 获取商品详情页信息
personReq.goodsDetail = async (data) => {
    let res = await api.post("/goods/goodsDetail",data);
    return res;
};
// 加入购物车
personReq.addCart = async (data) => {
    let res = await api.post("/cart/addCart",data);
    return res;
};
// 获取购物车列表
personReq.getCartList = async (data) => {
    let res = await api.post("/cart/getCartList",data);
    return res;
};
// 修改购物车内商品数量
personReq.updateGoodsNum = async (data) => {
    let res = await api.post("/cart/updateGoodsNum",data);
    return res;
};
// 获取购物车列表
personReq.deleteGoods = async (data) => {
    let res = await api.post("/cart/deleteGoods",data);
    return res;
};
// 查询用户的所有地址
personReq.findAddress = async (data) => {
    let res = await api.post("/address/findAddress",data);
    return res;
};
// 查询用户的所有地址
personReq.submitOrder = async (data) => {
    let res = await api.post("/order/submitOrder",data);
    return res;
};
// 直接购买
personReq.outrightPurchase = async (data) => {
    let res = await api.post("/order/outrightPurchase",data);
    return res;
};

//管理员页面获取数据
personReq.getData = async () => {
    return await api.post('/home/getData')
}
//用户管理(获取用户列表)
personReq.getUser = async () => {
    let res = await api.get('/admin/getUser');
    return res;
}
//用户管理(修改用户信息)
personReq.updateUser = async (data) => {
    return await api.post('/admin/updateUser',data)
}
//用户管理(删除用户信息)
personReq.deleteUser = async (data) => {
    return await api.post('/admin/deleteUser',data)
}
//搜索(用户)
personReq.searchUser = async (form) => {
    let res = await api.post("/admin/searchUser",form);
    return res;
};

//商品管理(获取商品列表)
personReq.getGoods = async () => {
    let res = await api.get('/admin/getGoods');
    return res;
}
//商品管理(添加商品)
personReq.addGoods = async (form) => {
    console.log(form);
    return await api.post('admin/addGoods',form)
}
//商品管理(编辑商品)
personReq.updateGoods = async (data) => {
    return await api.post('/admin/updateGoods',data)
}
//商品管理(上架/下架商品)
personReq.goodsStatus = async (form) => {
    return await api.post('/admin/goodsStatus',form)
}

personReq.getPeople4Select = async () => {
    let res = await api.get("people/option");
    return res;
};

export { personReq };
