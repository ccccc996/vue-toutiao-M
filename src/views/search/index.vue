<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" />
    <!-- 搜索历史 -->
    <search-history v-else />
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
      searchText: '',
      isResultShow: false // 控制搜索结果的展示
    }
  },

  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },

  methods: {
    onSearch(val) {
      // 展示搜索结果
      this.isResultShow = true
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
