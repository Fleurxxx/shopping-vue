<template>
    <div class="mine-warp">
        <!--    个人信息展示    -->
        <div class="mine-header">
            <div class="mine-info">
                <div class="info-list1">
                    <router-link to="/home/mine/modifiedData">
                        <img v-bind:src="image" alt="">
                        <div class="info" v-show="true">
                            <p style="font-size:18px;width: 50px">{{nickname}}</p>
                            <p class="m-txt">{{introduce}}</p>
                        </div>
                    </router-link>
                    <div class="info-other">
                        <el-menu background-color="#e5e5e5"
                                :default-active="activeIndex"
                                class="el-menu-demo1"
                                mode="horizontal"
                                :ellipsis="false"
                                @select="handleSelect"
                        >
                            <el-menu-item index="0">
                                <router-link to="/home/mine/address">
                                    我的收货地址
                                </router-link>
                            </el-menu-item>
                            <div class="flex-grow" />
                            <el-sub-menu index="2">
                                <template #title>我的优惠信息</template>
                                <el-menu-item index="2-1">红包</el-menu-item>
                                <el-menu-item index="2-2">店铺优惠券</el-menu-item>
                                <el-menu-item index="2-3">天猫积分:</el-menu-item>
                            </el-sub-menu>
                            <div class="flex-grow" />
                            <el-menu-item index="1">
                                <router-link to="/home">
                                    我的支付宝
                                </router-link>
                            </el-menu-item>
                        </el-menu>
                    </div>
                </div>
                <div class="info-list2">
                    <el-menu
                            :default-active="activeIndex"
                            class="el-menu-demo2"
                            mode="horizontal"
                            :ellipsis="false"
                            @select="handleSelect"
                    >
                        <el-menu-item index="0">待付款</el-menu-item>
                        <div class="flex-grow" />
                        <el-menu-item index="1">待发货</el-menu-item>
                        <div class="flex-grow" />
                        <el-menu-item index="2">待收货</el-menu-item>
                        <div class="flex-grow" />
                        <el-menu-item index="3">待评价</el-menu-item>
                        <div class="flex-grow" />
                    </el-menu>
                </div>
            </div>
        </div>
        <!--     我的物流   -->
        <div class="mine-content">
            <div class="mine-logistics">
                <div class="logistics-top">
                    <img src="../../assets/images/vectorgraph/物流快递.png" alt="">
                    <p>我的物流</p>
                </div>
                <div class="logistics-list">
                    <el-table :data="tableData" stripe style="width: 98%" height="90%" @select="select">
                        <el-table-column align="center" prop="goods" label="图片" width="110">
                            <template #default="scope" >
                                <img :src="`${$store.getters.getUser.name}${scope.row.goodsImage}`" alt="" width="90" height="90">
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="orderState" label="状态" width="440">
                        </el-table-column>
                        <!-- 自定义列 -->
                        <el-table-column align="center" label="操作">
                            <template #default="scope" >
                                <el-button type="primary" style="height: 38px" @click="receiving(scope.row)">确认收货</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    import { ArrowDown } from '@element-plus/icons-vue'
    import {personReq} from '@/api/request'
    export default {
        name: "MinMain",
        data () {
            return {
                nickname:'香菜',
                image: require('../../assets/images/img/默认头像.png'),
                introduce: '123455',
                Show:true,
                nicknameInputShow:false,
                // 列表数据
                tableData: [],
                form:{
                    goodsImg:'',
                    orderState:'',
                }
            }
        },
        mounted() {
            this.getMinInfo();
            this.getLogistics();
        },
        methods: {
            //获取本人全部信息
            getMinInfo(){
                let data = {
                    uid: window.sessionStorage.getItem("uid")
                }
                // personReq.getUserInfo(data).then((res) => {
                //     console.log("查询全部个人信息：")
                //     console.log(res)
                //     console.log(res.data.image)
                //     this.images = res.data.image;
                //     this.nickname = res.data.username
                //     this.introduce = res.data.introduce
                // }).catch(err => console.log(err))
            },
            //获取全部物流信息
            getLogistics(){
                let data = {
                    uid: window.sessionStorage.getItem("uid")
                }
                console.log(data)
                personReq.getLogistics(data).then((res) => {
                    console.log("查询全部物流信息：")
                    console.log(res)
                    for(let i=0; i<res.data.length; i++){
                        if(res.data[i].orderState === 1){
                            res.data[i].orderState = '等待收揽中...'
                        }else if(res.data[i].orderState === 2){
                            res.data[i].orderState = '【代收点】您的包裹暂存菜鸟驿站，您可选择到站自提或送货上门,如有疑问请联系xxx'
                        }else if(res.data[i].orderState === 4){
                            res.data[i].orderState = '已签收'
                        }
                        res.data[i].goodsImage = "1.jpg"
                    }

                    this.tableData = res.data
                    console.log(this.tableData.length)
                    this.total = this.tableData.length || 0
                }).catch(err => console.log(err))
            },
            receiving(data){
                console.log("确认收货信息：")
                console.log(data)
                personReq.confirmReceipt(data).then((res) => {
                    console.log(res)
                    this.getLogistics();
                }).catch(err => console.log(err))
            }

        }
    }
</script>


<style lang="less" scoped>
    .m-txt{
        width: 50px;
        font-weight: lighter;
        font-size:12px;
        text-align: left;
        padding-top: 5px;
        padding-left: 10px;
    }
    .mine-warp{
        background-color: #f9f9f9;
        height: 100%;
    }
    .mine-header{
        padding-top: 20px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .mine-info{
        border:1px solid #d2cbcb;
        height: 156px;
    }
    .info-list1{
        height: 90px;
        background-color: #e5e5e5;
        border-bottom:1px solid #d2cbcb;
        img{
            border-radius: 50%;
            float: left;
            width:55px;
            padding: 20px;
        }
        .info{
            float: left;
            font-size: 16px;
            font-weight: bold;
            color: #3e3d3d;
            padding: 23px 20px 0 4px;
        }
        .info-other{
            display: inline-block;
            float: right;
            .info-other-address{
                display: inline-block;
                vertical-align: bottom;//默认基线对齐
            }
            .info-other-dropdown{
                display: inline-block;
                vertical-align: bottom
            }
        }
    }
    .info-list2{
        float: left;
        width: 100%;
    }
    .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
    .el-menu-demo1{
        height: 91px;
        .el-menu-item{
            height: 90px;
            background-color:#e5e5e5;
        }
    }
    /deep/.el-menu--horizontal>.el-menu-item {
        width: 180px;
    }


    .mine-content{
        padding: 20px 30px 20px 30px; //上右下左
    }
    .mine-logistics{
        border:1px solid #d2cbcb;
        height: 100vh;
    }
    .logistics-top{
        height:50px;
        padding: 10px 0 0 20px;
        background-color: #e5e5e5;
        border-bottom:1px solid #d2cbcb;
        img{
            width: 42px;
            float: left;
        }
        p{
            float: left;
            padding-left: 19px;
            padding-top: 10px;
            font-size:16px;
            font-width:blocked;
        }
    }
    .logistics-list{

    }
</style>
