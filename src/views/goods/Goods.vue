/**
* 全部商品
*/
<template>
    <div>
        <!--    商品图    -->
        <div style="margin: 10px 0">
            <el-row :gutter="10">
                <el-col :span="6" v-for="item in tableData" :key="item.id" style="margin-bottom: 10px">
                    <div style="border: 1px solid #ccc; padding-bottom: 10px; border-radius: 10px; overflow: hidden">
                        <img :src="`http://localhost:8088/static/${item.goodsImage}`" alt="" style="width: 100%; cursor: pointer" @click="this.$router.push('/home/detail?id='+item.goodsId)">
                        <div style="color: #666; padding: 5px; font-size: 18px; font-weight:bold; cursor: pointer" @click="this.$router.push('/home/detail?id='+item.goodsId)">{{item.goodsTitle}}</div>
                        <div style="color: #666; padding: 5px; font-size: 14px">{{item.goodsDetail}}</div>
                        <div style="color: orangered; padding: 5px; font-size: 14px">￥ {{item.goodsPrice}}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 分页组件 -->
        <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
        <!-- 编辑界面 -->

    </div>
</template>

<script>
    import {personReq} from '@/api/request'
    export default {
        name: "Goods",
        data() {
            return {
                goodsImage:'',
                tableData:[],
                total:0,
                pageNum:1,
                pageSize:10,
                goodsId:"",
                goodsTitle:"",
                goodsDetail:"",
                goodsPrice:""
            }
        },
        //初始化数据
        mounted(){
            this.load();//获取后台的商品数据
        },
        methods:{
            search: function(event) {
                event.preventDefault(); //取消事件的默认行为
                let data = this.searchForm.key;
            },
            //商品显示
            load(){
                let params = {
                    goodsTitle: this.goodsTitle,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                }
                personReq.getGoods().then((res)=>{
                    console.log(res)
                    if(res.state === 200){
                        this.tableData = res.data
                    }else{
                        this.$message.error("后端获取参数失败");
                    }
                }).catch(err => console.log(err))
            },
            handleSizeChange(pageSize){
                console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            handleCurrentChange(pageNum){
                console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },
        },

    }
</script>

<style lang="less"  scoped>

</style>


