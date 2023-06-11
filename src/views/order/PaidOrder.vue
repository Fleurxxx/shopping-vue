<template>
    <div>
<!--        <h2>已付款</h2>-->
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
<!--                        <el-button type="danger" v-if="scope.row.orderState='退款中'" style="height: 38px" @click="handleEdit(scope.row)">退款中</el-button>-->
<!--                        <el-button type="danger" v-else-if="scope.row.orderState='已退款'" style="height: 38px" @click="handleEdit(scope.row)">已经退款</el-button>-->
                        <el-button type="danger"  style="height: 38px" @click="handleEdit(scope.row)">退款</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    import { ElMessage, ElMessageBox } from 'element-plus'
    export default {
        name: "PaidOrder",
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
                expressNov:'',//快递号
                deliverMoney:'',//运费
                userName:'',//收货人
                userPhone:'',//联系电话
                userAddress:'',//收货地址
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
                personReq.findPersonPaidOrder(data).then((res) => {
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
                            res.data[i].orderState = '退款中'
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
            //退款
            handleEdit(index){
                ElMessageBox.confirm(
                    '是否确认退款？',
                    '提示',
                    {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: '提示',
                    }
                ).then(() => {
                        let data={
                            orderId:index.orderId,
                            goodsId:index.goodsId
                        }
                        console.log(data)
                        personReq.refund(data).then((res) => {
                            console.log(res)
                            if (res.code === 200) {
                                this.getOrders();
                                ElMessage({
                                    type: 'success',
                                    message: '申请退款成功，待商家进行处理',
                                })
                            } else {
                                if(res.message===null){
                                    this.$message.error("后台出现故障")
                                }else{
                                    this.$message.error(res.message)
                                }
                            }
                        }).catch(err => console.log(err))
                    })
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '退款失败',
                        })
                    })

            }

        }

    }
</script>

<style scoped>
    .order-table{
        padding-top: 10px;
    }
</style>
