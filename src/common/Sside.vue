<template>
    <div>
        <!--        左侧选项栏-->
        <el-row class="tac">
            <el-col :span="12">
                <el-aside width="200px">
                    <el-menu router
                             :default-active="this.$router.path"
                             active-text-color="#ffd04b"
                             background-color="#ccd3e8"
                             class="el-menu-vertical-demo"
                             default-active="2"
                             text-color="#334157"
                             @open="handleOpen"
                             @close="handleClose"
                    >
                        <div class="a-title-box">
                            <img class="a-title" src="../assets/images/vectorgraph/logo5.png">
                        </div>

                        <el-menu-item index="/shop">
                            <el-icon><HomeFilled /></el-icon>
                            <span>{{"\xa0\xa0"}}首页</span>
                        </el-menu-item>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><GoodsFilled /></el-icon>
                                <span>{{"\xa0\xa0"}}商品</span>
                            </template>
                            <el-menu-item index="/shop/goodsManage">我的商品</el-menu-item>
<!--                            <el-menu-item index="/shop/addGoods">添加商品</el-menu-item>-->
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon><List /></el-icon>
                                <span>{{"\xa0\xa0"}}交易</span>
                            </template>
                            <el-menu-item index="/shop/orderManage">订单管理</el-menu-item>
                            <el-menu-item index="/shop/logisticsManage">物流管理</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="4">
                            <template #title>
                                <el-icon><Shop /></el-icon>
                                <span>{{"\xa0\xa0"}}店铺</span>
                            </template>
                            <el-menu-item index="/shop/shopInfo">店铺信息</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
    export default {
        name: "Sside",
        data(){
            // const handleOpen = (key: string, keyPath: string[]) => {
            //     console.log(key, keyPath)
            // }
            // const handleClose = (key: string, keyPath: string[]) => {
            //     console.log(key, keyPath)
            // }
            return {
                // isCollapse: false, //侧边栏展开
                menuData:[
                    {
                        path:"admin/adminHome",
                        label:"首页",
                        icon:"s-home",
                        url:"admin/AdminHome"
                    }
                ]
            }
        },
        method:{

        }
    }
</script>

<style lang="less" scoped>
    /*左侧导航栏*/
    .el-menu-vertical-demo {
        width: 200px;
        border: 0 !important; /*垂直时，去除右侧白边*/
    }
    .a-title-box{
        background-color: #ccd3e8;
    }
    .a-title{
        margin-top: 45px;
        width: 50px;
    }
    .el-menu{
        height: 147vh;
    }
    .el-aside::-webkit-scrollbar {
        display: none;
    }
    /deep/.el-menu-item.is-active {
        color: #0025aa;
    }
</style>
