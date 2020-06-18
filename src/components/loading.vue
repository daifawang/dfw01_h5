<template>
    <div class="loading-box">
        <img src="../assets/images/task/loading.gif">
    </div>
</template>
<script>
export default {
    name:'loading'
}
</script>
<style lang="less" scoped>
    .loading-box{
        width: 100%;
        height: 100vh;
        &>img{
            display: block;
            margin: 0 auto;
            max-width: 50%;
        }
    }
</style>