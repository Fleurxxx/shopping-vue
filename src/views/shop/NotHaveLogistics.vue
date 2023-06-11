<template>
    <div>
<!--        未发货-->
        <div>
            <el-dialog
                    v-model="dialogVisible"
                    title="填写邮递信息"
                    width="30%"
                    :before-close="closeDialog">
                <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="115px" >
                    <el-form-item label="快递单号" prop="expressNo" style="text-align:left;">
                        <el-input placeholder="请输入快递单号" v-model="form.expressNo"></el-input>
                    </el-form-item>
                    <el-form-item label="快递公司" prop="expressName" :required="true" style="text-align:left;">
                        <el-select v-model="form.expressName" placeholder="请选择快递公司">
                            <el-option label="顺丰" :value="0"></el-option>
                            <el-option label="韵达" :value="1"></el-option>
                            <el-option label="申通" :value="2"></el-option>
                            <el-option label="圆通" :value="3"></el-option>
                            <el-option label="中通" :value="4"></el-option>
                            <el-option label="百世" :value="5"></el-option>
                            <el-option label="德邦" :value="6"></el-option>
                            <el-option label="天天" :value="7"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
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
                        <el-button type="primary" style="height: 38px" @click="handleReceive(scope.row)">发货</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    export default {
        name: "NotHaveLogistics",
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
                form:{
                    expressNo:'',//快递单号
                    expressName:''//快递名
                },
                // 表单验证规则
                rules: {
                    expressNo: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                    expressName: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
                },
            };
        },
        mounted() {
            this.getOrders();
        },
        methods:{
            getOrders(){
                let data = {
                    merchantId: window.sessionStorage.getItem("merchantId"),
                    orderState: 0,
                    goodsState: 0
                }
                personReq.findShopNotPaidOrder(data).then((res) => {
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
                            res.data[i].orderState = '顾客已下单，请及时发货哦~'
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
            // 表单提交（发货）
            submit() {
                // 要用箭头函数,若用function会报错,不知道为什么
                this.$refs.form.validate((valid) => {
                    // 符合校验
                    if (valid) {
                        if(this.form.expressName===0){
                            this.form.expressName = "顺丰"
                        }else if(this.form.expressName===1){
                            this.form.expressName = "韵达"
                        }else if(this.form.expressName===2){
                            this.form.expressName = "申通"
                        }else if(this.form.expressName===3){
                            this.form.expressName = "圆通"
                        }else if(this.form.expressName===4){
                            this.form.expressName = "中通"
                        }else if(this.form.expressName===5){
                            this.form.expressName = "百世"
                        }else if(this.form.expressName===6){
                            this.form.expressName = "德邦"
                        }else if(this.form.expressName===7){
                            this.form.expressName = "天天"
                        }
                            let formData = {
                            expressNo:this.form.expressNo,
                            expressName:this.form.expressName,
                            orderId:this.orderId
                        }
                        console.log(formData)
                        personReq.deliverGoods(formData).then((res) => {
                            console.log(res)
                            if (res.code === 200) {
                                this.getOrders();
                                this.$message.success('发货成功')
                            } else {
                                if(res.message===null){
                                    this.$message.error("发货失败")
                                }else{
                                    this.$message.error(res.message)
                                }
                            }
                        }).catch(err => console.log(err))
                        // 清空,关闭
                        this.closeDialog()

                    }
                })
            },
            handleReceive(index){
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
</style>
