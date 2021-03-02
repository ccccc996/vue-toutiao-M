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

    <!-- 搜索结果 -->
    <search-result />
    <!-- 联想建议 -->
    <search-suggestion />
    <!-- 搜索历史 -->
    <search-history />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'

export default {
  name: 'searchIndex',

  data() {
    return {
      value: ''
    }
  },

  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
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
