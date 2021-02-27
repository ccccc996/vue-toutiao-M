<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',

  components: {
    ArticleItem
  },

  props: {
    channel: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 是否加载失败
      isRefreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功'
    }
  },

  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticle({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 模拟随机失败的状态
        // if (Math.random() > 0.5) {
        //   JSON.parse('sdgjhgsdajhgds')
        // }
        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // loading 关闭以后才能触发下一次的加载更多
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 如果没有数据了，把 finished 设置为 true，之后不再触发加载更多
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },

    async onRefresh() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 模拟随机失败的状态
        // if (Math.random() > 0.5) {
        //   JSON.parse('sdgjhgsdajhgds')
        // }
        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false
        // 4. 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        // 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
