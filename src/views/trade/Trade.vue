<template>
    <div :class="{all:showBol}">
        <br> <br>
        <div class="pay-title">
            <p>确认支付信息</p>
        </div>
        <br><br>
        <div class="payCount">
            <h1>合计：￥{{needPay}}</h1>
        </div>
        <br> <br><br><br>
        <el-button style="color: #ffffff;background-color: #a5a5a5; height:40px" size="medium" @click="cancelOrder()"><el-icon><Paperclip /></el-icon>{{"\xa0"}}取消订单</el-button>
        <el-button style="color: white;background-color: orangered; height:40px" size="medium" @click="payPassword()"><el-icon><Money /></el-icon> {{"\xa0"}}确认支付</el-button>
<!--        <button class="mui-btn mui-btn-primary mui-btn-block" @click="payPassword">确认支付</button>-->
        <div v-if="showBol" class="showToast">
            <span class="payCountText">支付密码</span>
            <div class="payCountInput">
                <input unselectable="on"  ref="psw" v-model="psw" autofocus maxlength='6' @blur="onBlur"/>
                <ul class="pwd-wrap">
                    <li class="pswInput" >
                        <i v-if="psw.length > 0"></i>
                    </li>
                    <li class="pswInput" >
                        <i v-if="psw.length > 1"></i>
                    </li>
                    <li class="pswInput" >
                        <i v-if="psw.length > 2"></i>
                    </li>
                    <li class="pswInput" >
                        <i v-if="psw.length > 3"></i>
                    </li>
                    <li class="pswInput" >
                        <i v-if="psw.length > 4"></i>
                    </li>
                    <li class="pswInput" >
                        <i v-if="psw.length > 5"></i>
                    </li>
                </ul>
            </div>
            <div class="payCountBtn">
                <div  @click="cancelBtn">取消</div>
                <div class="sure" @click="sureBtn">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    export default {
        name: "pay",
        data() {
            return {
                psw: '',
                showBol: false,
                needPay:''
            }
        },
        destroyed(){
            this.showBol = false;
        },
        mounted() {
            let data = JSON.parse(this.$route.query.row)
            console.log(data)
            this.needPay = data.needPay
        },
        methods: {
            //点击去支付
            payPassword() {
                this.showBol = true
                setTimeout(() => {
                    this.$refs.psw.focus()
                }, 10);
            },
            //取消订单
            cancelOrder(){
                let data={
                    orderId:JSON.parse(this.$route.query.row).orderId
                }
                this.$message.success('订单取消成功！')
                this.$router.go(-2)
                // personReq.cancelOrder(data).then((res)=>{
                //     console.log(res)
                //     if(res.code === 200){
                //         this.$message.success('订单取消成功！')
                //         this.$router.go(-2)
                //     }else{
                //         this.$message.error("后台出现故障");
                //     }
                // }).catch(err => console.log(err))
            },
            //点击取消
            cancelBtn() {
                this.showBol = false;
                this.psw = ''
            },

            //点击支付
            sureBtn() {
                this.showBol = false
                console.log(this.psw)
                let data={
                    uid: window.sessionStorage.getItem("uid"),
                    payPwd:this.psw,
                    needPay:this.needPay,
                    orderId:JSON.parse(this.$route.query.row).orderId
                }
                this.$message.success('支付成功！')
                this.$router.go(-2)
                // personReq.payOrder(data).then((res)=>{
                //     console.log(res)
                //     if(res.code === 200){
                //         this.$message.success('支付成功！')
                //         this.$router.go(-2)
                //     }else{
                //         this.$message.error("后台出现故障");
                //     }
                // }).catch(err => console.log(err))
                this.psw = ''
            },

            //让焦点永远保持在input标签
            onBlur(){
                if(this.showBol){
                    this.$refs.psw.focus()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .all {
        background-color: rgb(125, 125, 125);
        height: 100vh;
    }
    .pay-title{
        text-align: left;
        padding-left: 100px;
        font-size:30px;
    }
    .payCount {
        text-align: center;
        font-size:80px;
    }

    .showToast {
        position: absolute;
        top: 240px;
        left: 398px;
        width: 433px;
        height: 267px;
        background-color: white;
        text-align: center;

        .payCountText {
            display: block;
            margin-top: 25px;
            font-weight: bold;
            font-size: 25px;
        }

        .payCountInput {
            position: absolute;
            top: 90px;
            left: -42px;
            display: flex;

            input {
                width: 0.1px;
                height: 0.1px;
                color: transparent;
                border: none;
                font-size: 18px;
                opacity: 0;
                z-index: -1;
            }

            .pswInput {
                font-size: 50px;
                width: 50px;
                height: 50px;
                border: 1px grey solid;
            }

            .pwd-wrap {
                display: flex;
                padding-left: 100px;
                li {
                    list-style: none;
                }

                i {
                    height: 12px;
                    width: 12px;
                    border-radius: 50%;
                    background: #000;
                    display: inline-block;
                }
            }
        }

        .payCountBtn {
            position: absolute;
            bottom: 0;
            width: 434px;
            display: flex;

            div {
                width: 50%;
                height: 50px;
                font-size: 24px;
                line-height: 50px;
                border: 1px grey solid;
            }

            .sure {
                color: blue;
            }
        }
    }
</style>
