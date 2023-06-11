<template>
    <div class="home-box">
        <!-- 导航 子路由的出口 -->
        <m-header></m-header>

        <div class="constant">
            <router-view class="main"></router-view>
        </div>
        <m-footer></m-footer>
        <!--抛物图片-->
        <transition @after-enter='afterEnter' @before-enter="beforeEnter">
            <!--整张图片-->
            <div class="move_img" v-if="showMoveImg"
                 :style="{left:(cartPositionL-10) + 'px',top:(cartPositionT-10) + 'px'}">
                <div><img :src="moveImgUrl"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    import MHeader from '../../common/header';
    import MFooter from '../../common/footer';
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: "index",
        components:{
            MHeader,MFooter
        },
        mounted(){
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scope d>
    @import "src/assets/style/mixin";
    .home-box{
        width: 100%;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    #app,.box{
        height: 100%;
        width: 100%;
    }
    .main {
        min-height: calc(100vh - 454px);
        background: #ededed;
        overflow: hidden;
        /*width: 100%;*/
    }
    .constant{
        padding-left: 10%;
        padding-right: 10%;
    }
    .bn {
        border-style: none;
        border-width: 0;
        border: none;
    }
    .move_img {
        position: fixed;
        @include wh(40px);
        width: 45px;
        z-index: 29;
        height: 45px;
        div {
            @extend .bn;
        }
        img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            display: block;
            @extend .bn;
        }
    }
</style>
