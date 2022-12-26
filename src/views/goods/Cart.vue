<template>
    <div style="padding-top: 20px">
<!--        <h2>购物车</h2>-->
        <el-table :data="tableData" stripe style="width: 98%" height="90%" @select="select" @selection-change="handleSelectionChange"
        >
            <el-table-column align="center" type="selection" width="60">
            </el-table-column>
            <el-table-column align="center" prop="image" label="图片" width="160">
                <template #default="scope" >
                    <img :src="`http://localhost:8088/static/${scope.row.goodsImg}`" alt="" width="90" height="90">
                </template>
            </el-table-column>
            <el-table-column align="center" prop="goodsTitle" label="名称" width="200">
            </el-table-column>
<!--            <el-table-column align="center" prop="isSpec" label="规格" width="100">-->
<!--            </el-table-column>-->
            <el-table-column align="center" prop="onlyPrice" label="单价" width="100">
                <template #default="scope">
                    <span style="color: #000000">￥ {{scope.row.onlyPrice}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="cartNum" label="数量" width="250">
                <template #default="scope">
                    <el-input-number v-model="scope.row.cartNum" :min="1" :max="10" @change="changeNum(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column align="center" prop="sumPrice" label="金额" width="100">
                <template #default="scope">
                    <span style="color: orangered">￥ {{scope.row.sumPrice}}</span>
                </template>
            </el-table-column>
            <!-- 自定义列 -->
            <el-table-column align="center" label="操作">
                <template #default="scope" >
<!--                    <el-button type="primary" @click="handleEdit()">编辑</el-button>-->
                    <el-button style="height: 37px;width:79px" type="danger" @click="deleteGoods(scope.row)">移除 <i class="el-icon-remove-outline"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin: 10px 0; text-align:right;padding-right: 50px">
            <div style="text-align:right;margin: 10px 0;"> 当前已选商品总价：<span style="color: orangered">￥ {{totalPrice}}</span></div>
            <el-button style="color: white;background-color: orangered; height:40px" size="medium" @click="settleAccount()"><i class="el-icon-coin"> 结 算</i></el-button>
        </div>
    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    export default {
        name: "Cart",
        data(){
            return {
                tableData: [],
                imageUrl:'',
                form: {
                    goodsTitle: '',
                    goodsPrice: '',
                    isNew:'1',
                    isSpec: '0', //规格（判断）
                    models: [{
                        value:'',
                    }], //规格
                    stocks: '',//库存
                    goodsStatus: '', //是否上架 0待审核，1上架，2下架
                    audit_time: '', //上架时间
                    goodsImage: '',//上传图片
                    merchantId: '', //店铺id
                },
                multipleSelection:[],
                totalPrice:0,

            }
        },
        mounted() {
            this.getCartList();
        },
        methods:{
            getCartList(){
                let data={
                    uid: window.sessionStorage.getItem("uid")

                }
                personReq.getCartList(data).then((res) => {
                    console.log(res)
                    this.tableData = res.data
                    console.log(this.tableData.length)
                    this.total = this.tableData.length || 0
                }).catch(err => console.log(err))
            },
            changeNum(item){
                let data={
                    uid: window.sessionStorage.getItem("uid"),
                    goodsId: item.goodsId,
                    num: item.cartNum
                }
                console.log(data)
                personReq.updateGoodsNum(data).then((res)=>{
                    console.log(res)
                    if(res.state === 200){
                        console.log("修改数量成功！")
                    }else{
                        this.$message.error("后台出现故障");
                    }
                }).catch(err => console.log(err))
                this.totalPrice = 0
                //计算总价格
                this.multipleSelection.forEach(item=>{
                    this.totalPrice += item.cartNum*item.onlyPrice
                })
            },
            //计算选中商品总金额
            handleSelectionChange(val){
                this.multipleSelection = val
                this.totalPrice = 0
                console.log(val)
                //计算选中商品总价
                if(val && val.length){
                    val.forEach(item =>{
                        this.totalPrice += item.sumPrice
                    })
                }
            },
            //将商品移除购物车
            deleteGoods(item){
                console.log(item)
                let data={
                    uid: window.sessionStorage.getItem("uid"),
                    goodsId: item.goodsId,
                }
                personReq.deleteGoods(data).then((res)=>{
                    console.log(res)
                    if(res.state === 200){
                        console.log("移除成功！")
                        this.getCartList();
                    }else{
                        this.$message.error("后台出现故障");
                    }
                }).catch(err => console.log(err))
            },
            //结算
            settleAccount(){
                if(!this.multipleSelection || !this.multipleSelection.length) {
                    this.$message.error("请选择需要结算的商品")
                    return
                }
                let data = {
                    name: this.multipleSelection[0].goodsTitle,
                    totalPrice: this.totalPrice,
                    goods:[]
                }
                // this.multipleSelection.forEach(v=>{
                //     data.goods.push({goodId:v.goodsId,num:v.cartNum})
                // })
                this.multipleSelection.forEach(v=>{
                    data.goods.push({
                        goodId:v.goodsId,
                        goodsImg:v.goodsImg,
                        goodsTitle:v.goodsTitle,
                        sumPrice: v.sumPrice,
                        cartNum:v.cartNum})
                })
                console.log(data)
                this.$router.push({
                    // 跳转到的页面路径
                    path: '/home/confirmOrder',
                    // 传递的参数集合
                    query: {
                        row: JSON.stringify(data)
                    }
                })
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

</style>
