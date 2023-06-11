<template>
    <div class="home">
<!--        <h2>首页</h2>-->
        <!-- 轮播图-->
        <div class="showImg" >
            <img  @mouseover="changeInterval(true)"
                  @mouseleave="changeInterval(false)"
                  v-for="(item) in imgArr"
                  :key="item.id"
                  :src="item.url"
                  alt="暂无图片"
                  v-show="item.id===currentIndex"
            >
            <!--    左侧按钮     -->
            <div  @click="clickIcon('up')"   class="iconDiv icon-left">
                <i class="el-icon-caret-left"></i>
            </div>
            <!--     右侧按钮    -->
            <div  @click="clickIcon('down')"  class="iconDiv icon-right">
                <i class="el-icon-caret-right"></i>
            </div>
            <!--    控制圆点     -->
            <div class="banner-circle">
                <ul>
                    <li @click="changeImg(item.id)"
                        v-for="(item) in imgArr"
                        :key="item.id"
                        :class="item.id===currentIndex? 'active': '' "
                    ></li>
                </ul>
            </div>
        </div>
        <!--    商品图    -->
        <div style="margin: 10px 0">
            <el-row :gutter="10">
                <el-col :span="6" v-for="item in tableData" :key="item.id" style="margin-bottom: 10px">
                    <div style="border: 1px solid #ccc; padding-bottom: 10px; border-radius: 10px; overflow: hidden">
                        <img :src="`${$store.getters.getUser.name}${item.goodsImage}`" alt="" style="width: 100%; height: 200px; cursor: pointer" @click="this.$router.push('/home/detail?id='+item.goodsId)">
                        <div style="color: #666; padding: 5px; font-size: 18px; font-weight:bold; cursor: pointer" @click="this.$router.push('/home/detail?id='+item.goodsId)">{{item.goodsTitle}}</div>
                        <div style="color: #666; padding: 5px; font-size: 14px">{{item.goodsDetail}}</div>
                        <div style="color: orangered; padding: 5px; font-size: 14px">￥ {{item.goodsPrice}}</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {personReq} from "@/api/request";
    import {ym} from "@/api/ym";

    export default {
        name:'Home',
        data(){
            return {
                currentIndex :0,//当前所在图片下标
                timer:null,//定时轮询
                imgArr:[
                    {	id:0,
                        url:require("../../assets/images/img/banner1.png"),
                    },{
                        id:1,
                        url:require("../../assets/images/img/banner2.png"),
                    },{
                        id:2,
                        url:require("../../assets/images/img/banner3.png"),
                    },{
                        id:3,
                        url:require("../../assets/images/img/banner2.png"),
                    },
                ],
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
            this.startInterval()//进入页面后启动定时轮询
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
                personReq.recommendGoods().then((res)=>{
                    console.log(res)
                    if(res.code === 200){
                        for(let i = 0; i<res.data.length; i++){
                            // res.data[i].goodsImage = res.data[i].goodsId+res.data[i].goodsImage
                        }

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
            //开启定时器
            startInterval(){
                // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
                clearInterval(this.timer);
                this.timer = setInterval(()=>{
                    this.currentIndex++;
                    if(this.currentIndex > this.imgArr.length-1){
                        this.currentIndex = 0
                    }
                },3000)
            },
            // 点击左右箭头
            clickIcon(val){
                if(val==='down'){
                    this.currentIndex++;
                    if(this.currentIndex===this.imgArr.length){
                        this.currentIndex = 0;
                    }
                }else{
                    /* 第一种写法
                    this.currentIndex--;
                    if(this.currentIndex < 0){
                        this.currentIndex = this.imgArr.length-1;
                    } */
                    // 第二种写法
                    if(this.currentIndex === 0){
                        this.currentIndex = this.imgArr.length;
                    }
                    this.currentIndex--;
                }
            },
            // 点击控制圆点
            changeImg(index){
                this.currentIndex = index
            },
            //鼠标移入移出控制
            changeInterval(val){
                if(val){
                    clearInterval(this.timer)
                }else{
                    this.startInterval()
                }
            }
        },

    }

</script>
<style lang="less"  scoped>
    .el-input__wrapper {
        padding: 0;
    }
    .home {
        display: flex;
        flex-direction: column;
    }
    * {
        padding: 0;
        margin: 0;
    }
    /* 清除li前面的圆点 */
    li {
        list-style-type: none;
    }
    .showImg{
        position: relative;
        width: 98%;
        height: 420px;
        margin: 50px auto;
        overflow: hidden;
    }
    /* 轮播图片 */
    .showImg img{
        width: 100%;
        height: 100%;
    }

    /* 箭头图标 */
    .iconDiv{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 30px;
        height: 30px;
        border: 1px solid #666;
        border-radius: 15px;
        background-color: rgba(125,125,125,.2);
        line-height: 30px;
        text-align: center;
        font-size: 25px;
        cursor: pointer;
    }
    .iconDiv:hover{
        background-color: white;
    }
    .icon-left{
        left: 10px;
    }
    .icon-right{
        right: 10px;
    }

    /* 控制圆点 */
    .banner-circle{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 20px;
    }
    .banner-circle ul{
        margin: 0 50px;
        height: 100%;
        text-align: right;
    }
    .banner-circle ul li{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin: 0 5px;
        border-radius: 7px;
        background-color: rgba(125,125,125,.8);
        cursor: pointer;
    }
    .active{
        background-color: black !important;
    }

</style>
