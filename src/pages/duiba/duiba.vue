<template>
    <div id="duiba">
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
#duiba {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
