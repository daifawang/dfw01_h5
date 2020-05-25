<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import Const from "@/config/const"
export default {
    name: 'App',
    data() {
        return {}
    }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
html,
body {
  width: 100vw;
  overflow-x: hidden;
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
