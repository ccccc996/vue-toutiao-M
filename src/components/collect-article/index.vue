<template>
  <van-icon
    color="#777"
    :name="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
  />
</template>

<script>
export default {
  name: 'CollectArticle',

  data() {
    return {}
  },

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.collected {
  color: #ffa500 !important;
}
</style>
