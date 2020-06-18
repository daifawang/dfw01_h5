<template>
    <div class="loading-box">
        <div>
            <img src="../assets/images/task/loading.gif">
        </div>
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
        &>div{
            width: 9.5rem;
            height: auto;
            margin: 0 auto;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            &>img{
                max-width: 100%;
            }
        }
    }
</style>