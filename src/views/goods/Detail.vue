<template>
    <div style="padding: 20px">
<!--        <h2>商品详情页</h2>-->
        <el-card>
            <div style="display: flex">
                <div style="width: 300px;padding: 10px">
                    <el-image :src="`http://localhost:8088/static/${goods.goodsImage}`" :preview-src-list="[`http://localhost:8088/static/${goods.goodsImage}`]" style="width: 100%"></el-image>
                </div>
                <div style="flex: 1;padding:15px 0 15px 80px;">
                    <div class="item1" style="font-size: 24px;font-weight:bold">{{goods.goodsTitle}}</div>
                    <div class="item1" style="font-size: 14px">{{goods.goodsDetail}}</div>
                    <div class="item1" style="color: orangered">价格：￥ {{goods.goodsPrice}}</div>
                    <div class="item1" style="font-size: 14px">库存：{{goods.stocks}}{{"\xa0\xa0"}}件</div>
                    <div class="item1">
                        <el-input-number v-model="form.num" :min="1" :max="9999" @change="handleChange" />
                        <a>{{"\xa0\xa0\xa0"}}件</a>
                    </div>
                    <div class="item1" style="margin-top: 40px">
                        <el-button size="medium" class="det-but" style=""><i class="el-icon-wallet">直接购买</i></el-button>
                        <el-button size="medium" class="det-but" style=""><i class="el-icon-shopping-cart-2" v-on:click="addCart">加入购物车</i></el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    export default {
        name: "Detail",
        components:{

        },
        data(){
            return{
                goods:{},
                form:{
                    num: ''
                },
                user: this.$route.query.id
            }
        },
        //初始化数据
        mounted(){
            this.load();//获取后台的商品数据

        },
        methods:{
            load(){
                let data={
                    goodsId: this.$route.query.id
                }
                console.log("该商品的id为："+ data.goodsId)
                personReq.goodsDetail(data).then((res)=>{
                    console.log(res)
                    if(res.state === 200){
                        this.goods = res.data
                    }else{
                        this.$message.error("后端获取参数失败");
                    }
                }).catch(err => console.log(err))
            },
            handleChange(){
                console.log("加购数量："+this.form.num)
            },
            addCart(){
                if(!this.user){
                    this.$message.warning("请登录后操作");
                }else{
                    let data={
                        uid: window.sessionStorage.getItem("uid"),
                        goodsId: this.$route.query.id,
                        num:this.form.num
                    }
                    personReq.addCart(data).then((res)=>{
                        console.log(res)
                        if(res.state === 200){
                            this.$message.success('添加成功')
                        }else{
                            this.$message.error("后台出现故障");
                        }
                    }).catch(err => console.log(err))
                }

            },

        }
    }
</script>

<style lang="less" scoped>
    /*/deep/ .el-input-number .el-input__inner {*/
    /*    !*位置居左*!*/
    /*    text-align: left;*/
    /*}*/
    /deep/.el-input-number{
        width: 150px;
        .el-input__inner{
            padding-left: 20px;
            padding-right: 20px;
        }
    }
    .item1{
        padding: 5px;
        color: #666;
        text-align: left;
    }
    .det-but{
        background-color: red;
        color: white;
        height: 40px;
        width: 130px;
    }
</style>
