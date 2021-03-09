<template>
  <div id="app">
    <keep-alive :include="cacheComponents">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: mapState(['cacheComponents'])
}
</script>

<style lang="less">
.box {
  width: 375px;
  height: 375px;
  background-color: pink;
}
</style>
