<template>
    <div class="index-wrap">
        <div class="index-left">
            <div class="index-left-block">
                <h2>全部标签</h2>
                <div  v-for="(product,index) in productList" :key="index">
                    <h3>{{product.title}}</h3>
                    <ul>
                        <li v-for="(item,index) in product.list" :key="index">
                            <a :href="item.url">{{item.name}}</a>
                            <span class="hot-tag" v-if="item.hot">HOT</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Nav",
        data(){
            return{
                productList:[
                    {
                        title:"我的购物车",
                        list:[
                            {
                                id:1,
                                name:"来啦",
                                url:"",
                                hot:true
                            },
                            {
                                id:2,
                                name:"来啦",
                                url:"",
                                hot:true
                            },
                            {
                                id:3,
                                name:"来啦",
                                url:"",
                                hot:true
                            }
                        ]
                    },
                    {
                        title:"我的收藏夹",
                        list:[
                            {
                                id:1,
                                name:"来啦",
                                url:"",
                                hot:false
                            },
                            {
                                id:2,
                                name:"来啦",
                                url:"",
                                hot:true
                            },
                            {
                                id:3,
                                name:"来啦",
                                url:"",
                                hot:true
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .index-wrap {
        width:1200px;
        margin: 0 auto;
        overflow: hidden;
    }
    .index-left {
        float: left;
        width: 300px;
        text-align: left;
    }
    /*.index-right {*/
    /*    float: left;*/
    /*    width: 900px;*/
    /*}*/
    .index-left-block {
        margin: 15px;
        background:#fff;
        box-shadow: 0 0 1px #ddd;
    }

    .index-left-block .hr {
        margin-bottom:20px;
        height: 1px;
        width: 100%;
        background:#ddd;
    }
    .index-left-block h2 {
        background:#4fc08d;color:#fff;
        padding: 10px 15px;
        margin-bottom:20px;
    }
    .index-left-block h3 {
        padding: 0 15px 5px 15px;
        font-weight: bold;
        color:#222;
    }
    .index-left-block ul {
        padding: 10px 15px;
    }

.index-left-block li {
    padding: 5px;
}
.index-board-list {
    ioverflow: hidden;margin-top: 15px;
}
.index-board-item {
    float: left;
    width: 400px;
    background:#fff;
    box-shadow: 0 0 1px #ddd;padding: 20px;
    margin-right:20px;margin-bottom: 20px;
}
.index-board-item-inner{
    min-height: 125pX;
    padding-left: 120px;
}
.index-board-openproduct .index-board-item-inner{
    /*background:url( ../assets/images/1.png)no-repeat;*/
}
.index-board-logo .index-board-item-inner{
    /*background: url(../assets/images/2.png)no-repeat;*/
}
.index-board-golife .index-board-item-inner{
    /*background: url(../assets/images/3.png) no-repeat;*/
}
.index-board-heigh .index-board-item-inner{
    /*background: url(../assets/images/4.png)no-repeat;*/
}
.index-board-item h2 {
    font-size:18px;
    font-weight: bold;
    color:#000;
    margin-bottom: 15px;
}
.line-last {
    margin-right: 0;
}
.index-board-button {
    margin-top: 20px;
}
.lastest-news{
    min-height: 350px;
}
.hot-tag {
    background: red;
    color:#fff;
}


/****************************************/
.new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;white-space: nowrap;
}
.swiperimg{
    width: 100%;height: 350px;}
.swiper-size{
    margin-top: 15px;
}
.button{
    background: #4fc08d;
    color: #fff;
    display: inline-block;padding: 10px 20px;cursor: pointer;
}
</style>
