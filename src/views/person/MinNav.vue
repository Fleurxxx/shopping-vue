<template>
    <div class="detail-wrap">
        <div class="detail-left">
            <div class="product-board">
                <img src="../../assets/images/vectorgraph/天猫10.png" alt="" style="height: 70px">
                <ul>
                    <router-link v-for="(item,index) in detailsNav"
                                 :key="index"
                                 :to="'/home/mine/'+item.id">
                        <li>
                            {{item.title}}
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Details",
        data(){
            return{
                detailsNav:[
                    {
                        title:"个人中心",
                        id:""
                    },{
                        title:"我的购物车",
                        id:"cart"
                    }, {
                        title:"已买到的宝贝",
                        id:"finish"
                    }, {
                        title:"购买过的店铺",
                        id:"store"
                    },  {
                        title:"我的收藏",
                        id:"collect"
                    }, {
                        title:"评价管理",
                        id:"comment"
                    }

                ]
            }
        }
    }
</script>

<style scoped>
    .detail-wrap {
        /*width: 1200px;*/
        margin: 0 auto;
        overflow: hidden;
        padding-top: 20px;
    }
    .detail-left {
        float: left;
        width:200px;
        text-align: center;
    }
    .detail-right {
        float: left;
        width: 980px;
        margin-left:20px;
    }

    .detail-right {
        float: left;
        width: 980px;
        margin-left: 20px;
    }
    .product-board{
        background:#fff;
        padding: 20px 0;
    }
    .product-board ul {
        margin-top:20px;
    }
    .product-board li {
        text-align: left;
        padding: 10px 15px;
        cursor: pointer;
        color: #241818;
    }
    .product-board li:hover {
        background-color: #b21e0b;
        color: #f9f9f9;
    }
    .product-board li a {
        display: block;
    }
    .sales-board {
        background:#fff;
    }
    .sales-board-form {}
    .sales-board-intro h2 {
        font-size: 20px;padding: 20px;
    }
    .sales-board-intro p {
        background:#f7fcff;
        padding: 10px 20px;
        color:#999;
        line-height: 1.8;
    }
    .sales-board-form {
        padding: 10px 20px;
        font-size: 14px;
    }
    .sales-board-line {
        clear: both;
        padding-bottom: 20px;
    }

    .sales-board-line-left {
        display : inline-block;
        /*width: 100px;*/
    }
    .sales-board-line-right {
        display: inline-block;
        width:75%;
    }
    .sales-board-des {
        border-top:20px solid #f0f2f5;
        padding: 15px 20px;
    }
    .sales-board-des p {
        line-height: 1.6;
    }
    .sales-board-des h2 {
        font-size: 20px;
        padding-bottom: 15px;
    }

    .sales-board-des h3 {
        font-size: 18px;
        font-weight: bold;
        padding: 20px 0 10px 0;
    }
    T
    .sales-board-des li {
        padding: 5px 0;
    }
    .sales-board-table {
        width: 100%;
        margin-top: 20px;
    }
    .sales-board-table th {
        background: #4fce8d;
        color: #fff;
    }
    .sales-board-table td {
        border: 1px solid #f0f2f5;
        padding: 15px;
    }
</style>
