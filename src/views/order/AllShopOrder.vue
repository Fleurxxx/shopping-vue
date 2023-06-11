<template>
    <div>
<!--        商家的所有订单-->
        <div>
            <el-dialog
                    v-model="dialogVisible"
                    title="订单详情页"
                    width="30%"
                    :before-close="closeDialog">
                <td style="padding-left: 80px">
                    订单号：<input type="text" v-model="orderId"/>
                </td>
                <div style="padding-left: 40px">
<!--                    商品名：{{"\xa0\xa0\xa0"}}<input type="text" v-model="goodsName"/><br/>-->
                    价格: {{"\xa0\xa0\xa0"}}<input type="text" v-model="goodsPrice"/><br/>
                    商品数量: {{"\xa0\xa0\xa0"}}<input type="text" v-model="goodsNum"/><br/>
                    快递公司名称: {{"\xa0\xa0\xa0"}}<input type="text" v-model="expressName"/><br/>
                    快递号: {{"\xa0\xa0\xa0"}}<input type="text" v-model="expressNo"/><br/>
                    运费: {{"\xa0\xa0\xa0"}}<input type="text" v-model="deliverMoney"/><br/>
                    收货人: {{"\xa0\xa0\xa0"}}<input type="text" v-model="userName"/><br/>
                    联系电话: {{"\xa0\xa0\xa0"}}<input type="text" v-model="userPhone"/><br/>
                    收货地址: {{"\xa0\xa0\xa0"}}<input type="text" v-model="userAddress"/><br/>
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
                        <el-button type="primary" style="height: 38px" @click="handleEdit(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="currentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    export default {
        name: "AllShopOrder",
        data() {
            return {
                // 表单是否打开
                dialogVisible: false,
                // 列表数据
                tableData: [],
                // 打开表单:新建0,编辑1
                modalType: 0,
                orderId: '',//订单号
                orderState: '',//订单状态
                goodsName: '',//商品名称
                goodsPrice: '110 元',//商品价格
                goodsNum: '2',//商品数量
                goodsImg: '',//商品图
                expressName: '顺丰',//快递公司名称
                expressNo: '134123114',//快递号
                deliverMoney: '10元',//运费
                userName: '王君月',//收货人
                userPhone: '12424446624',//联系电话
                userAddress: '天津市南开区南开大学老校区',//收货地址
            };
        },
        mounted() {
            this.getOrders();
        },
        methods: {
            getOrders() {
                let data = {
                    merchantId: window.sessionStorage.getItem("merchantId")
                }
                personReq.findShopAllOrder(data).then((res) => {
                    console.log(res)
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].orderState === 0) {
                            res.data[i].orderState = '商品尚未发货'
                        } else if (res.data[i].orderState === 1) {
                            res.data[i].orderState = '等待收揽中...'
                        } else if (res.data[i].orderState === 2) {
                            res.data[i].orderState = '已签收'
                        } else if (res.data[i].orderState === 3) {
                            res.data[i].orderState = '已退款'
                        } else if (res.data[i].orderState === -1) {
                            res.data[i].orderState = '订单已取消'
                        } else if (res.data[i].orderState === -2) {
                            res.data[i].orderState = '顾客尚未付款，如有需要请前往 “未付款” 进行处理'
                        } else if (res.data[i].orderState === -4) {
                            res.data[i].orderState = '买家正在申请退款，请及时处理。'
                        }else if(res.data[i].orderState === 4){
                            res.data[i].orderState = '买家已签收'
                        }
                        if(res.data[i].expressNo === 0){
                            res.data[i].expressNo = '暂无'
                        }
                        res.data[i].goodsImage = "1.jpg"
                    }
                    this.tableData = res.data
                    console.log(this.tableData.length)
                    this.total = this.tableData.length || 0
                }).catch(err => console.log(err))
            },
            handleEdit(index) {
                // this.goodsName = index.goodsName
                // this.goodsPrice = index.goodsPrice + '  元'
                // this.goodsNum = index.goodsNum + '  个'
                // this.goodsImg = index.goodsImg
                // this.expressName = index.expressName
                // this.expressNo = index.expressNo
                // this.deliverMoney = index.deliverMoney + '  元'
                // this.userName = index.userName
                // this.userPhone = index.userPhone
                // this.userAddress = index.userAddress
                // this.orderId = index.orderId
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

<style lang="less" scoped>
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
