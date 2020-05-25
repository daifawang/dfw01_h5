<template>
    <div id="aa">
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
#aa {
  height: 100%;
}
</style>
