<template>
    <div>
<!--        <h2>未付款</h2>-->
        <div class="order-table">
            <!-- 订单数据Table -->
            <el-table :data="tableData" stripe style="width: 100%" height="90%" @select="select">
                <el-table-column align="center" prop="goods" label="图片" width="140">
                    <template #default="scope" >
                        <img :src="`${$store.getters.getUser.name}${scope.row.goodsImage}`" alt="" width="90" height="90">
                    </template>
                </el-table-column>
<!--                <el-table-column prop="goodsName" align="center" label="商品名" width="150">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="goodsPrice" align="center" label="实付" width="110">-->
<!--                    <template #default="scope">-->
<!--                        <span style="color: #000000">￥ {{scope.row.goodsPrice}}</span>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="orderState" align="center" label="订单状态">
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column align="center" label="操作">
                    <template #default="scope" >
                        <el-button type="primary" style="height: 38px" @click="handleEdit(scope.row)">支付</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
    import { ElMessage, ElMessageBox } from 'element-plus'
    export default {
        name: "NotPaidOrder",
        data() {
            return {
                // 表单是否打开
                dialogVisible: false,
                // 列表数据
                tableData: [],
                // 打开表单:新建0,编辑1
                modalType: 0,
                orderId:'',//订单号
                orderState:'',//订单状态
                goodsName:'',//商品名称
                goodsPrice:'',//商品价格
                goodsNum:'',//商品数量
                goodsImg:'',//商品图
                expressName:'',//快递公司名称
                expressNo:'',//快递号
                deliverMoney:'',//运费
                userName:'',//收货人
                userPhone:'',//联系电话
                userAddress:'',//收货地址
                //支付
                psw: '',
                showBol: false,
                needPay:''
            };
        },
        mounted() {
            this.getOrders();
        },
        methods:{
            getOrders(){
                let data = {
                    uid: window.sessionStorage.getItem("uid")
                }
                personReq.findPersonNotPaidOrder(data).then((res) => {
                    console.log(res)
                    for(let i=0; i<res.data.length; i++){
                        if(res.data[i].orderState === 0){
                            res.data[i].orderState = '商品尚未发货'
                        }else if(res.data[i].orderState === 1){
                            res.data[i].orderState = '等待收揽中...'
                        }else if(res.data[i].orderState === 2){
                            res.data[i].orderState = '【代收点】您的包裹暂存菜鸟驿站，您可选择到站自提或送货上门,如有疑问请联系xxx'
                        }else if(res.data[i].orderState === 3){
                            res.data[i].orderState = '已退款'
                        }else if(res.data[i].orderState === -1){
                            res.data[i].orderState = '订单已取消'
                        }else if(res.data[i].orderState === -2){
                            res.data[i].orderState = '商品尚未付款，请及时付款'
                        }else if(res.data[i].orderState === -4){
                            res.data[i].orderState = '退款中..'
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
            //点击去支付
            handleEdit(){
                this.showBol = true
                setTimeout(() => {
                    this.$refs.psw.focus()
                }, 10);
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
                // let data={
                //     uid: window.sessionStorage.getItem("uid"),
                //     payPwd:this.psw,
                //     needPay:this.needPay,
                //     orderId:JSON.parse(this.$route.query.row).orderId
                // }
                this.$message.success('支付成功！')
                this.getOrders();
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

<style lang="scss" scoped>
    .order-table{
        padding-top: 10px;
    }


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
        z-index: 9;
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
