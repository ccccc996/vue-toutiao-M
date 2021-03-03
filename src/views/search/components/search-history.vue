<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <!-- isDeleteShow 默认为 false，即默认显示 v-else 的删除按钮 -->
      <div v-if="isDeleteShow">
        <span @click="clearSearchHistories">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',

  // props 如果是普通数据，不能修改
  // 如果是引用类型数据，可以修改，但不能重新赋值
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  },

  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        // 删除状态，删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态，直接进入搜索
        this.$emit('search', item)
      }
    },

    clearSearchHistories() {
      this.searchHistories.splice(0)
    }
  }
}
</script>

<style lang="less" scoped></style>
