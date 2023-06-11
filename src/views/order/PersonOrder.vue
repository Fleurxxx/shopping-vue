<template>
    <div>
<!--        <h2>订单管理</h2>-->
        <div >
            <el-menu
                    :default-active="$router.path"
                    router
                    class="el-menu-demo"
                    mode="horizontal"
                    style="height: 60px"
                    :ellipsis="false"
            >
                <el-menu-item index="/home/mine/personOrder/all">所有订单</el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="/home/mine/personOrder/notPaid">待付款</el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="/home/mine/personOrder/paid">待发货</el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="/home/mine/personOrder/receive">待收货</el-menu-item>
                <div class="flex-grow" />
            </el-menu>
        </div>
        <div>
            <router-view class="main"></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PersonOrder",
    }
</script>

<style scoped>

</style>
