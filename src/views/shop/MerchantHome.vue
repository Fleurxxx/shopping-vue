<template>
    <div>
        <el-row>
            <!--            左侧-->
            <el-col :span="8"><div class="grid-content ep-bg-purple" />
                <el-card class="box-card">
                    <div class="user">
                        <img src="../../assets/images/img/羊羊.jpg" alt="">
                        <div class="userinfo">
                            <p class="name">Shop</p>
                            <p class="ac">商家</p>
                        </div>
                    </div>
                </el-card>
                <div class="graph2">
                    <el-card style="margin-top: 20px;">
                        <el-table :data="TableData" style="width: 100%">
                            <!-- 这里的val,key对应的是对象里的 -->
                            <el-table-column v-for="(value, key) in TableLabel" :prop="key" :label="value">
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </el-col>
            <!--            右侧-->
            <el-col :span="16" ><div class="grid-content ep-bg-purple-light" />
                <div class="home-right-box">
                    <el-card v-for="item in CountData" :key="item.name" :body-style="{ display:'flex', padding:'15px' }">
                        <el-icon class="icons" :style="{ background: item.color }">
                            <component :is="item.icon"/>
                        </el-icon>
                        <div class="detail">
                            <p class="price">{{ item.value }}</p>
                            <p class="desc">{{ item.name }}</p>
                        </div>
                    </el-card>
                </div>
                <div class="graph1">
                    <!-- 折线图 -->
                    <el-card style="height:260px">
                        <div id="charts1" style="height:270px"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { Money,ShoppingCart,Tickets,User } from '@element-plus/icons-vue';
    import CountData from '../../api/data/CountData';
    import TableLabel from '../../api/mockData/tableLabel'
    import {personReq} from "@/api/request";
    import * as echarts from 'echarts';
    import {ref, onMounted} from 'vue'

    // echarts的配置数据
    import order from '../../api/echartsData/order'
    import user from '../../api/echartsData/user'
    import video from '../../api/echartsData/video'

    export default {
        name: "MerchantHome",
        components:{

        },
        data(){
            return{
                TableData: [],
                TableLabel,
                CountData
            }
        },
        mounted(){
            personReq.getData().then((res)=>{
                console.log(res);
                this.TableData=res.data.tableData

                // echarts图表
                // 折线图
                // 基于准备好的dom，初始化echarts实例
                var echarts1 = echarts.init(document.getElementById("charts1"))
                var echarts1Option = order
                // ES6解构语法
                const { orderData, userData, videoData } = res.data;

                // 获取x轴:要求是一个对象
                const xAxis = Object.keys(orderData.data[0])
                // console.log(xAxis)
                const xAxisData = {
                    data: xAxis
                }

                // 配置
                echarts1Option.legend = xAxisData
                echarts1Option.xAxis = xAxisData
                echarts1Option.yAxis = {}
                echarts1Option.series = []

                // 配置series
                xAxis.forEach(key => {
                    echarts1Option.series.push({
                        name: key,
                        type: 'line',
                        // key对应的orderData的所有值
                        data: orderData.data.map(item => item[key])
                    })
                })
                // console.log(echarts1Option)

                // 使用刚指定的配置项和数据显示图表。
                echarts1.setOption(echarts1Option);


            }).catch(err => console.log(err))

            this.getShopInfo();
        },
        methods: {
            getShopInfo(){
                let data = {
                    uid: window.sessionStorage.getItem("uid")
                }
                window.sessionStorage.setItem('merchantId', 1) //图个方便
                // personReq.getShopInfo(data).then((res) => {
                //     console.log("查询店铺信息为：")
                //     console.log(res)
                //     window.sessionStorage.setItem('merchantId', res.data.merchantId)
                // }).catch(err => console.log(err))
            },
        },
    }
</script>

<style lang="less" scoped>
    .user{
        display: flex;
        align-items: center;
        img{
            width: 155px;
            /*border-radius: 50%;*/
            margin-right: 40px;
        }
        .userinfo{
            .name{
                font-size: 32px;
                margin-bottom: 10px;
            }
            .ac{
                color: #999999;
            }
        }
    }
    .home-right-box{
        display: flex;
        flex-wrap: wrap;
        margin-left: 10px;
        justify-content: space-between;
        .icons{
            width: 60px;
            height: 60px;
            font-size: 25px;
            text-align:center;
            line-height:80px;
            color: #fff;
        }
        .detail{
            margin-left: 15px;
            display: flex;
            flex-direction:column;
            justify-content: center;
            .price{
                font-size: 30px;
                margin-bottom: 10px;
                line-height: 25px;
                height: 25px;
                margin-top: 3px;
            }
            .desc{
                font-size: 14px;
                color: #999;
            }
        }
        .el-card{
            width: 48%;
            margin-bottom: 10px;
        }
    }
    .graph1 {
        display: flex;
        margin-left:10px;
        .el-card {
            width: 100%;
        }
    }
    .graph2 {
        display: flex;
        margin-top:-10px;
        .el-card {
            width: 100%;
        }
    }
</style>
