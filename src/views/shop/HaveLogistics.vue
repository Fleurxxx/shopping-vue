<template>
    <div>
<!--        已发货-->
        <div>
            <el-dialog
                    v-model="dialogVisible"
                    title="当前物流信息"
                    width="30%"
                    :before-close="closeDialog">
                <td style="padding-left: 80px">
                    订单号：<input type="text" v-model="orderId"/>
                </td>
                <div style="padding-left: 40px">
                    快递单号: {{"\xa0\xa0\xa0"}}<input type="text" v-model="expressNo"/><br/>
                    快递公司名称: {{"\xa0\xa0\xa0"}}<input type="text" v-model="expressName"/><br/>
                    收货人: {{"\xa0\xa0\xa0"}}<input type="text" v-model="userName"/><br/>
                    联系电话: {{"\xa0\xa0\xa0"}}<input type="text" v-model="userPhone"/><br/>
                    收货地址: {{"\xa0\xa0\xa0"}}<input type="text" v-model="userAddress"/><br/>
                    当前物流状态: {{"\xa0\xa0\xa0"}}<input type="text" v-model="deliverMoney"/><br/>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="formbt" @click="closeDialog">取 消</el-button>
                </div>
            </el-dialog>
        </div>
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
                <el-table-column prop="goodsPrice" align="center" label="实付" width="250">
                    <template #default="scope">
                        <span style="color: #000000">￥ {{scope.row.goodsMoney}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="orderState" align="center" label="订单状态">
                </el-table-column>
                <!-- 自定义列 -->
                <el-table-column align="center" label="操作">
                    <template #default="scope" >
                        <el-button type="primary" style="height: 38px" @click="handleReceive(scope.row)">查看物流信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    export default {
        name: "HaveLogistics",
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
                expressName:'顺丰',//快递公司名称
                expressNo:'3457234',//快递号
                deliverMoney:'10元',//运费
                userName:'王君月',//收货人
                userPhone:'18339548371',//联系电话
                userAddress:'山西省阳泉市城区杨村街道',//收货地址
            };
        },
        mounted() {
            this.getOrders();
        },
        methods:{
            getOrders(){
                let data = {
                    merchantId: window.sessionStorage.getItem("merchantId"),
                    orderState: 1,
                    goodsState: 0
                }
                personReq.getShopDeliverOrder(data).then((res) => {
                    console.log(res)
                    for(let i=0; i<res.data.length; i++){
                        if(res.data[i].orderState === 0){
                            res.data[i].orderState = '商品尚未发货'
                        }else if(res.data[i].orderState === 1){
                            res.data[i].orderState = '【已发货】等待快递员收揽中...'
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
                            res.data[i].orderState = '买家已签收'
                        }
                        res.data[i].goodsImage = "1.jpg"
                    }
                    this.tableData = res.data
                    console.log(this.tableData.length)
                    this.total = this.tableData.length || 0
                }).catch(err => console.log(err))
            },
            handleReceive(index){
                this.goodsName = index.goodsName
                this.goodsPrice = index.goodsPrice + '  元'
                this.goodsNum = index.goodsNum + '  个'
                this.goodsImg = index.goodsImg
                this.expressName = index.expressName
                this.expressNo = index.expressNo
                this.deliverMoney = '等待快递员揽收中..' //当前物流状态
                // this.userName = index.userName
                // this.userPhone = index.userPhone
                // this.userAddress = index.userAddress
                this.orderId = index.orderId
                this.openForm()
            },
            // 打开表单
            openForm() {
                this.dialogVisible = true
            },
            // 关闭对话框
            closeDialog() {
                // 后关闭
                this.dialogVisible = false
            },
            //分页
            currentChange() {

            }

        }
    }
</script>

<style scoped>
    .order-table{
        padding-top: 10px;
    }
    .dialog-footer{
        padding-top: 20px;
    .formbt{
        height: 38px;
    }
    }
</style>
