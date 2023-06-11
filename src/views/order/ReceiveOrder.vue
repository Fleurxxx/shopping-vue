<template>
    <div>
<!--        <h2>待收货</h2>-->
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
                <el-table-column prop="goodsPrice" align="center" label="实付" width="110">
                    <template #default="scope">
                        <span style="color: #000000">￥ {{scope.row.goodsMoney}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderState" align="center" label="订单状态">
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column align="center" label="操作">
                    <template #default="scope" >
                        <el-button type="primary" style="height: 38px" @click="handleReceive(scope.row)">确认收货</el-button>
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
        name: "ReceiveOrder",
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
                goodsImage:'',//商品图
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
                personReq.getLogistics(data).then((res) => {
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
            handleReceive(index){
                ElMessageBox.confirm(
                    '是否确认收到商品？',
                    '提示',
                    {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                )
                    .then(() => {
                        let data = {
                            orderId:index.orderId
                        }
                        personReq.confirmReceipt(data).then((res) => {
                            console.log(res)
                            ElMessage({
                                type: 'success',
                                message: '已确认收货',
                            })
                            this.getOrders();
                        }).catch(err => console.log(err))

                    })
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '已取消',
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
