<template>
    <div id="task">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>

export default {
    data() {
        return {

        };
    }
};
</script>
<style scoped>
#task {
  height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
