<template>
    <div style="padding-top: 50px">
        <div style="padding-bottom: 30px">
                <el-steps :active="1" align-center>
                    <el-step title="1. 确认订单信息" description="" />
                    <el-step title="2. 付款到支付宝"  />
                    <el-step title="3. 确认收货"  />
                    <el-step title="4. 双方互评"  />
                </el-steps>
        </div>
        <h2 class="order-text" >确认收货地址</h2>
        <div class="order-address">
            <el-radio-group v-model="AuthoCheck" @change="handleChange">
                <el-radio v-for="item in authTypeList"
                          :key="item.id" :label="item.value">
                    {{item.value}}
                </el-radio>
            </el-radio-group>
        </div>
        <h2 class="order-text">确认订单信息</h2>
        <div style="padding-top: 20px">
            <el-table :data="tableData" stripe style="width: 98%" height="90%" @select="select">
                <el-table-column align="center" prop="image" label="图片" width="180">
                    <template #default="scope" >
                        <img :src="`http://localhost:8088/static/${scope.row.goodsImg}`" alt="" width="90" height="90">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="goodsTitle" label="名称" width="250">
                </el-table-column>
                <!--            <el-table-column align="center" prop="isSpec" label="规格" width="100">-->
                <!--            </el-table-column>-->
                <el-table-column align="center" prop="cartNum" label="数量" >
                </el-table-column>
                <el-table-column align="center" prop="sumPrice" label="金额" >
                    <template #default="scope">
                        <span style="color: orangered">￥ {{scope.row.sumPrice}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 10px 0; text-align:right;padding-right: 50px">
                <div style="text-align:right;margin: 10px 0;padding-right: 30px"> 实付款：<span style="color: orangered">￥ {{totalPrice}}</span></div>
                <el-button style="color: white;background-color: orangered; height:40px" size="medium" @click="settleAccount()"><i class="el-icon-coin"> 提交订单</i></el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    export default {
        name: "ConfirmInfo",
        data () {
            return {
                AuthoCheck: '', //单选选中的值
                authTypeList: [{
                    id:1,value:'北京'
                },{
                    id:1,value:'湖南'
                }],
                orderData:'',
                totalPrice:'',
                tableData: [],
                goodsMoney:'',
                needPay:'',
                addId:'',
                address:'',
            }
        },
        mounted() {
            this.orderData = JSON.parse(this.$route.query.row)
            console.log(JSON.parse(this.$route.query.row))
            this.tableData = this.orderData.goods
            this.total = this.tableData.length || 0
            this.totalPrice=this.orderData.totalPrice
            //初始化收货地址
            this.load()
        },
        methods:{
            load(){
                let data={
                    uid: window.sessionStorage.getItem("uid")
                }
                personReq.findAddress(data).then((res)=>{
                    console.log(res)
                    if(res.state === 200){
                        console.log("查询地址成功！")
                        for(let i=0; i<res.data.length; i++){
                            console.log(res.data[i].addId)
                            this.authTypeList[i].id = res.data[i].addId
                            this.authTypeList[i].value = res.data[i].address
                        }
                    }else{
                        this.$message.error("后台出现故障");
                    }
                }).catch(err => console.log(err))
            },
            handleChange(val) {
                console.log(val)
                this.address = val
                for(let i=0; i<this.authTypeList.length; i++){
                    if(this.authTypeList[i].value === val){
                        console.log(this.authTypeList[i].id)
                        this.addId = this.authTypeList[i].id
                    }
                }
            },
            settleAccount(){
                let data = {
                    goodsMoney : this.totalPrice,
                    needPay : this.totalPrice,
                    addId:this.addId,
                    address:this.address,
                    uid: window.sessionStorage.getItem("uid"),
                    goods:JSON.parse(this.$route.query.row).goods
                }
                console.log(data)
                personReq.submitOrder(data).then((res)=>{
                    console.log(res)
                    if(res.state === 200){
                        this.$message.success('锁单成功！请尽快支付')
                    }else{
                        this.$message.error("后台出现故障");
                    }
                }).catch(err => console.log(err))

            }
        }

    }
</script>

<style lang="less" scoped>
    /deep/.el-input-number{
        width: 150px;
        .el-input__inner{
            padding-left: 20px;
            padding-right: 20px;
        }
    }
    .order-text{
        text-align: left;
        padding-left: 20px;
        font-weight: bold;
        font-size:16px;
    }
    .order-address{
        text-align: left;
        padding-left: 90px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
</style>
