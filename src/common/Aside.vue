<template>
    <div>
        <!--        左侧选项栏-->
        <el-row class="tac">
            <el-col :span="12">
                <el-aside width="200px">
                    <el-menu router
                             :default-active="this.$router.path"
                             active-text-color="#ffd04b"
                             background-color="#333333"
                             class="el-menu-vertical-demo"
                             default-active="2"
                             text-color="#fff"
                             @open="handleOpen"
                             @close="handleClose"
                    >
                        <div class="a-title-box">
                            <img class="a-title" src="../assets/images/vectorgraph/logo6.png">
                        </div>

                        <el-menu-item index="/admin/adminHome">
                            <el-icon><HomeFilled /></el-icon>
                            <span>首页</span>
                        </el-menu-item>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon><GoodsFilled /></el-icon>
                                <span>商城管理</span>
                            </template>
                            <!--                    <el-menu-item-group title="主页">-->
                            <el-menu-item index="/admin/goodsManage">商品管理</el-menu-item>
                            <el-menu-item index="/admin/orderManage">订单管理</el-menu-item>
                            <el-menu-item index="2-5">评论管理</el-menu-item>
                            <el-menu-item index="2-3">库存管理</el-menu-item>
                            <el-menu-item index="2-2">类目管理</el-menu-item>
                            <el-menu-item index="2-6">轮播图管理</el-menu-item>
                            <el-menu-item index="2-7">营销管理</el-menu-item>
                            <el-menu-item index="2-8">我的帮助</el-menu-item>
                            <!--                    </el-menu-item-group>-->
                            <!--                        <el-sub-menu index="2-4">-->
                            <!--                            <template #title>item four</template>-->
                            <!--                            <el-menu-item index="1-4-1">item one</el-menu-item>-->
                            <!--                        </el-sub-menu>-->
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon><Tools /></el-icon>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item index="/admin/userManage">用户管理</el-menu-item>
                            <el-menu-item index="1-2">商家管理</el-menu-item>
                            <el-menu-item index="/admin/test">待开发..</el-menu-item>
                        </el-sub-menu>
<!--                        <el-menu-item index="/setting">-->
<!--                            <el-icon><setting /></el-icon>-->
<!--                            <span>设置</span>-->
<!--                        </el-menu-item>-->
                    </el-menu>
                </el-aside>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
    export default {
        name: "Aside",
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
        background-color:#333333;
    }
    .a-title{
        margin-top: 45px;
        width: 50px;
    }
    .el-menu{
        height: 100vh;
    }
    .el-aside::-webkit-scrollbar {
        display: none;
    }

</style>
