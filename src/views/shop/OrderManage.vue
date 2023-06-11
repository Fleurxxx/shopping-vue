<template>
    <div class="main">
<!--        <h2>订单管理</h2>-->
        <el-menu
                :default-active="$router.path"
                router
                class="el-menu-demo"
                mode="horizontal"
                style="height: 60px"
                :ellipsis="false"
        >
            <el-menu-item index="/shop/orderManage/all">所有订单</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="/shop/orderManage/notPaid">未付款</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="/shop/orderManage/refund">退款处理</el-menu-item>
            <div class="flex-grow" />
        </el-menu>
    </div>
    <div>
        <router-view class="main"></router-view>
    </div>
</template>

<script>
    import AllShopOrder from '../order/AllShopOrder.vue'
    export default {
        name: "OrderManage",
        components:{
            AllShopOrder
        }
    }
</script>

<style lang="less" scoped>
    .main{
        padding: 0 40px 0 20px;
    }
</style>
