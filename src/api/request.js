import api from "./api";
import mockapi from "./mockapi";
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
    let res = await api.post("user/login", form);
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
    let res = await api.post("order/getLogistics?uid="+data.uid);
    return res;
};
//退款
personReq.refund = async (data) => {
    let res = await api.post("order/refund?orderId="+data.orderId);
    return res;
};
//确认收获
personReq.confirmReceipt = async (data) => {
    let res = await api.post("order/confirmReceipt?orderId="+data.orderId);
    return res;
};
// 查找个人全部订单
personReq.findPersonAllOrder = async (data) => {
    let res = await api.post("/order/findPersonAllOrder?uid="+data.uid);
    return res;
};
// 查找个人未付款订单
personReq.findPersonNotPaidOrder = async (data) => {
    let res = await api.post("/order/findPersonNotPaidOrder?uid="+data.uid);
    return res;
};
// 查找个人已付款
personReq.findPersonPaidOrder = async (data) => {
    let res = await api.post("/order/findPersonPaidOrder?uid="+data.uid);
    return res;
};

//首页搜索(商品)
personReq.searchGoods = async (key,num,len) => {
    let res =  await api.get('/goods/searchGoods?goodsKey='+key+'&pageNum='+num+'&size='+len);
    return res;
    // let res = await api.post("/goods/searchGoods",form);
    // return res;
};
// 首页获取推荐商品
personReq.recommendGoods = async () => {
    let res = await api.get("/goods/recommendGoods");
    return res;
};
// 获取商品详情页信息
personReq.goodsDetail = async (data) => {
    let res = await api.get("/goods/goodsDetail?id="+data);
    return res;
};
// 加入购物车
personReq.addCart = async (data) => {
    let res = await api.put("/goods/addCart?uid="+data.uid+'&goodsId='+data.goodsId+'&cartNum='+data.num);
    return res;
};
// 获取购物车列表
personReq.getCartList = async (data) => {
    let res = await api.get("/goods/getCartList?uid="+data.uid+'&goodsId='+data.goodsId+'&cartNum='+data.num);
    return res;
};
// 修改购物车内商品数量
personReq.updateGoodsNum = async (data) => {
    let res = await api.post("/goods/updateGoodsNum?uid=+"+data.uid+'&goodsId='+data.goodsId+'&cartNum='+data.num);
    return res;
};
// 删除购物车内的商品
personReq.deleteGoodsInCart = async (data) => {
    let res = await api.delete("/goods/deleteGoodsNum?uid="+data.uid+'&goodsId='+data.goodsId);
    return res;
};
// 查询用户的所有地址
personReq.findAddress = async (data) => {
    let res = await api.get("/address/findAddress?uid="+data.uid);
    return res;
};
// 添加地址
personReq.addAddress = async (data) => {
    let res = await api.put("/address/addAddress",data);
    return res;
};
// 修改地址
personReq.updateAddress = async (data) => {
    let res = await api.post("/address/updateAddress",data);
    return res;
};
// 删除地址
personReq.deleteAddress = async (data) => {
    let res = await api.delete("/address/deleteAddress?uid="+data.uid+'&addressId='+data.addId);
    return res;
};
// 提交订单
personReq.submitOrder = async (data) => {
    let res = await api.post("/order/submitOrder",data);
    return res;
};
// 购物车内删除商品
personReq.deleteCartGoods = async (data) => {
    let res = await api.post("/goods/deleteCartGoods",data);
    return res;
};
// 付款
personReq.payOrder = async (data) => {
    let res = await api.post("/order/payOrder?id="+data.orderId);
    return res;
};
// 取消订单
personReq.cancelOrder = async (data) => {
    let res = await api.post("/order/cancelOrder?id="+data.orderId);
    return res;
};
// 直接购买
personReq.outrightPurchase = async (data) => {
    let res = await api.post("/order/outrightPurchase",data);
    return res;
};



//管理员页面获取数据
personReq.getData = async () => {
    return await mockapi.post('/home/getData')
}
//用户管理(获取用户列表)
personReq.getUser = async (data) => {
    let res = await api.post('/admin/getUser?key='+data.key+'&pageNum='+data.page+'&size='+data.limit);
    return res;
}
//用户管理(修改用户信息)
personReq.updateUser = async (data) => {
    return await api.post('/admin/updateUser',data)
}
//用户管理(删除用户信息)
personReq.deleteUser = async (data) => {
    return await api.post('/admin/deleteUser?uid='+data.uid)
}
//搜索(用户)
personReq.searchUser = async (form) => {
    let res = await api.post("/admin/searchUser",form);
    return res;
};

//商品管理(获取全部商品列表)
personReq.getGoods = async (data) => {
    let res = await api.post('/admin/getGoods?key='+data.key+'&pageNum='+data.page+'&size='+data.limit);
    return res;
}
//商品管理(获取上架商品列表)
personReq.getUpGoods = async (data) => {
    let res = await api.post('/admin/getUpGoods',data);
    return res;
}
//商品管理(获取下架商品列表)
personReq.getDownGoods = async (data) => {
    let res = await api.post('/admin/getDownGoods',data);
    return res;
}
//商品管理(添加商品)
personReq.addGoods = async (form) => {
    return await api.post('/admin/addGoods',form)
}
//商品管理(编辑商品)
personReq.updateGoods = async (data) => {
    return await api.post('/admin/updateGoods',data)
}
// 商品管理（删除商品）
personReq.deleteGoods = async (data) => {
    let res = await api.post("/admin/deleteGoods?goodsId="+data.goodsId);
    return res;
};
//商品管理(上架/下架商品)
personReq.goodsStatus = async (form) => {
    return await api.post('/admin/goodsStatus?goodsId='+form.goodsId+'&goodsStatus='+form.goodsStatus)
}
//搜索(商品)
personReq.searchGood = async (form) => {
    let res = await api.post("/admin/searchGoods",form);
    return res;
};



//商家(获取店铺信息)
personReq.getShopInfo = async (data) => {
    return await api.post('/store/getShopInfo',data)
}
//商家(修改店铺信息)
personReq.changeShopInfo = async (data) => {
    return await api.post('/store/updateShopInfo',data)
}
//商家(获取全部商品列表)
personReq.getGoodsInShop = async (data) => {
    let res = await api.post('/store/getGoodsInShop?uid='+data.uid+'&key='+data.key+'&pageNum='+data.page+'&size='+data.limit);
    return res;
}
//商家(获取上架商品列表)
personReq.getUpGoodsInShop = async (data) => {
    let res = await api.post('/store/getUpGoodsInShop',data);
    return res;
}
//商家(获取下架商品列表)
personReq.getDownGoodsInShop = async (data) => {
    let res = await api.post('/store/getDownGoodsInShop',data);
    return res;
}
// 商家(查询全部订单)
personReq.findShopAllOrder = async (data) => {
    let res = await api.post("/order/findShopAllOrder?merchantId="+data.merchantId);
    return res;
};
// 商家(查询未付款订单)
personReq.findShopNotPaidOrder = async (data) => {
    let res = await api.post("/order/findShopNotPaidOrder?merchantId="+data.merchantId);
    return res;
};
// 商家(查询退款订单)
personReq.findShopRefundOrder = async (data) => {
    let res = await api.post("/order/findShopRefundOrder?merchantId="+data.merchantId);
    return res;
};
//商家(退款处理)
personReq.dealWithRefund = async (data) => {
    let res = await api.post("/order/dealWithRefund?orderId="+data.orderId);
    return res;
};
//商家(发货)
personReq.deliverGoods = async (data) => {
    let res = await api.post("/order/deliverGoods?expressNo="+data.expressNo+'&expressName='+data.expressName+'&orderId='+data.orderId);
    return res;
};
//商家(已发货)
personReq.getShopDeliverOrder = async (data) => {
    let res = await api.post("/order/getShopDeliverOrder?merchantId="+data.merchantId);
    return res;
};
//商家三级分类
personReq.fetchCategoryListNoPage = async (data) => {
    return await api.post('/store/fetchCategoryListNoPage',data)
}

export { personReq };
