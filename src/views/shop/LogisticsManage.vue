<template>
    <div class="main">
<!--        <h2>物流管理</h2>-->
        <el-menu
                :default-active="$router.path"
                router
                class="el-menu-demo"
                mode="horizontal"
                style="height: 60px"
                :ellipsis="false"
        >
            <el-menu-item index="/shop/logisticsManage/unfinished">未发货</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="/shop/logisticsManage/finished">已发货</el-menu-item>
            <div class="flex-grow" />
        </el-menu>
    </div>
    <div>
        <router-view class="main"></router-view>
    </div>
</template>

<script>
    export default {
        name: "LogisticsManage"
    }
</script>

<style lang="less" scoped>
    .main{
        padding: 0 40px 0px 20px;
    }
    /deep/.demo-tabs > .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }
</style>
