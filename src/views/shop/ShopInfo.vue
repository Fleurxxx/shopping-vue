<template>
    <div>
        <!--        <h2>修改店铺信息</h2>-->
        <el-row>
            <!--    左侧   -->
            <el-col :span="13"><div class="grid-content ep-bg-purple" />
                <el-card class="box-card">
                    <div class="shop-left-info">
                        <img src="../../assets/images/img/店铺.png" alt="">
                        <div class="shopInfo">
                            <p class="name">{{merchantName}}</p>
                            <div class="txt-left">
                                <p class="txt1">淘宝账号名:</p>
                                <p class="txt2">t_1505520778064_0686</p>
                                <p class="txt1">首次开店时间：</p>
                                <p class="txt2">{{createdTime}}</p>
                                <p class="txt1">店铺类型：</p>
                                <p class="txt2">{{merchantType}}</p>
                            </div>
                            <div class="txt-right">
                                <p class="txt1">绑定支付宝：</p>
                                <p class="txt2">{{phone}}</p>
                                <p class="txt1">联系地址：</p>
                                <p class="txt2">{{address}}</p>
                                <p class="txt2">{{detailed}}</p>
                            </div>
                            <div class="txt-right" style="padding-top:10px;" >店铺ID:{{"\xa0"}}{{merchantId}}{{"\xa0\xa0"}}<el-icon style="cursor: pointer;" @click="copyOrderId2(shopId)"><DocumentCopy /></el-icon></div>
                        </div>
                    </div>
                    <div class="shop-left-but">
                        <el-button @click="pageJumps"> 修改资料 </el-button>
                    </div>
                </el-card>
            </el-col>
            <!--    右侧   -->
            <el-col :span="10" ><div class="grid-content ep-bg-purple-light" />
                <div class="shop-right">
                    <el-card class="box-card">
                        <div class="user">
                            <div class="shopInfo">
                                <img style="width: 440px" src="../../assets/images/img/淘宝开店.png" />
<!--                                <p class="name">Shop</p>-->
<!--                                <p class="txt1">淘宝账号名</p>-->
<!--                                <p class="txt1">{{}}</p>-->
<!--                                <p class="txt1">首次开店时间：</p>-->
<!--                                <p class="txt1">{{}}</p>-->
<!--                                <p class="txt1">店铺类型：</p>-->
<!--                                <p class="txt1">{{}}</p>-->
<!--                                <p class="txt2">绑定支付宝：</p>-->
<!--                                <p class="txt2">{{}}</p>-->
<!--                                <p class="txt2">联系地址：</p>-->
<!--                                <p class="txt2">{{}}</p>-->
<!--                                <div class="copy-btn" >店铺ID:{{"\xa0"}}{{shopId}}{{"\xa0\xa0"}}<el-icon style="cursor: pointer;" @click="copyOrderId2(shopId)"><DocumentCopy /></el-icon></div>-->
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    export default {
        name: "ShopInfo",
        data() {
            return {
                merchantId:'1234',
                merchantName:'旺旺小铺',
                merchantImage:'../../assets/images/img/店铺.png',
                merchantStatus:'个人店铺',
                merchantType:'正常',
                address:'天津市和平区滨江道与十字街交口',
                detailed:'什么都卖',
                createdTime:'2020-09-12',
                uid:'',
                phone:'18123635279',

            }
        },
        mounted() {
            this.getShopInfo();
        },
        methods:{
            getShopInfo(){
                let data = {
                    uid: window.sessionStorage.getItem("uid")
                }
                console.log(data.uid)
                // personReq.getShopInfo(data).then((res) => {
                //     console.log("查询店铺信息为：")
                //     console.log(res)
                //     this.merchantId = res.data.merchantId
                //     this.merchantName = res.data.merchantName
                //     this.merchantImage = 'http://localhost:8088/static/'+res.data.merchantImage
                //     this.address = res.data.address
                //     this.detailed = res.data.detailed
                //     this.phone = res.data.phone
                //     this.createdTime = res.data.createdTime
                //     if(res.data.merchantType === 0){
                //         this.merchantType = '个人店铺'
                //     }else if(res.data.merchantType === 1){
                //         this.merchantType = '企业店铺'
                //     }else if(res.data.merchantType === 2){
                //         this.merchantType = '商城店铺'
                //     }
                //     if(res.data.merchantStatus === 0){
                //         this.merchantStatus = '正常'
                //     }else if(res.data.merchantStatus === 1){
                //         this.merchantStatus = '关店'
                //     }
                //
                // }).catch(err => console.log(err))
            },
            pageJumps(){
                console.log("什么啊")
                this.$router.push('modifiedShop')
            },
            //复制按钮
            copyOrderId2(orderId) {
                var input = document.createElement("input"); // 创建input对象
                input.value = orderId; // 设置复制内容
                document.body.appendChild(input); // 添加临时实例
                input.select(); // 选择实例内容
                document.execCommand("Copy"); // 执行复制
                document.body.removeChild(input); // 删除临时实例
                this.$message.success('复制成功！');
            },
        }
    }
</script>

<style lang="less" scoped>
    .shop-left-info{
        display: flex;
        align-items: center;
        img{
            width: 155px;
            /*border-radius: 50%;*/
            margin-right: 40px;
            margin-top: -30px;
        }
        .shopInfo{
            height: 220px;
            .name{
                position:relative;
                font-size: 32px;
                top:20px;
                margin-bottom: 10px;
            }
            .txt-left{
                position:relative;
                top:44px;
                left: -10px;
                color: #000000;
                text-align:left;
                font-size: 14px;
            }
            .txt-right{
                position:relative;
                top:-100px;
                left: 160px;
                text-align:left;
            }
            .txt1{
                color: #999;
            }
        }
    }
    .shop-left-but{
        text-align: right;
        position:relative;
        top: -200px;
        right: 25px;
    }
    .shop-right{
        padding-left: 25px;
    }
</style>
