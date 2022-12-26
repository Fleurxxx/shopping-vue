<template>
    <div id="app">
<!--        <router-link to="/login">登录</router-link>-->
        <router-view class="main"></router-view>
    </div>
</template>

<script setup>

</script>

<style lang="scss" rel="stylesheet/scss">
    @import "assets/style/index.scss";
    #app {
        height: 100%;
        width: 1500px;
    }
    .main {
        padding: 0;
        background: #ededed;;
    }
</style>
