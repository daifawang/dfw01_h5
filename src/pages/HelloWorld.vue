<template>
    <div id="hello">
        欢迎来到好运宝任务
        <br />
        <router-link to="/task/taskIndex" tag="a">任务首页</router-link><br>
        <router-link to="/task/taskVideoList" tag="a">新手攻略</router-link><br>
        <router-link to="/task/myCurrency" tag="a">我的元宝</router-link><br>
        <router-link to="/task/dailyTask" tag="a">每日任务</router-link><br>
        <router-link to="/task/myCurrencyRule" tag="a">规则</router-link><br>
        <router-link to="/duiba/coinDuiba" tag="a">元宝商城</router-link><br>
        <div @click="a">1111111111</div>
        <router-link to="https://activity.m.duiba.com.cn/autoLogin/https%3A%2F%2Factivity.m.duiba.com.cn%2Fmobile%2FappItemDetail%3FappItemId%3D2230363%26dbnewopen?from=login&spm=71222.1.1.1">地址</router-link>
    </div>
</template>
<script>
export default {
    created() {
        
    },
    methods: {
        a(){
            window.location.href="https://activity.m.duiba.com.cn/autoLogin/https%3A%2F%2Factivity.m.duiba.com.cn%2Fmobile%2FappItemDetail%3FappItemId%3D2230363%26dbnewopen?from=login&spm=71222.1.1.1"
        }
    },
}
</script>