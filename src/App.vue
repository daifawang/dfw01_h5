<template>
    <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import Const from "@/config/const"
export default {
    name: 'app',
    data() {
        return {}
    }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  -webkit-user-select: auto!important;
  -khtml-user-select: auto!important;
  -moz-user-select: auto!important;
  -ms-user-select: auto!important;
  -o-user-select: auto!important;
  user-select: auto!important;
}
html,
body {
  width: 100vw;
}
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
body {
  background-color: #f5f5f5;
  line-height: 1.6;
  font-family: -apple-system-font, Helvetica Neue, sans-serif;
  box-sizing: border-box;
  #app {
    min-height: 100vh;
    user-select: none;
    font-size: 16px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    pointer-events: none;
    user-select: none;
  }
}
</style>
