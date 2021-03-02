<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'searchIndex',

  data() {
    return {
      value: ''
    }
  },

  methods: {
    onSearch(val) {
      console.log(val)
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
.van-search__action:active {
  background-color: transparent;
}
</style>
