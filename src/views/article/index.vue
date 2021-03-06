<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>

          <!-- 用户关注按钮组件 -->
          <!-- class 会直接作用于组件的根节点上 -->
          <!-- <follow-user
            class="follow-btn"
            :is-followed="article.is_followed"
            :user-id="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          /> -->
          <!-- 当传递给子组件的数据，既要使用也要修改 -->
          <!-- value="article.is_followed" -->
          <!-- @input="article.is_followed=$event" -->
          <!-- 可以通过子组件的model属性自定义value和input 事件 -->
          <follow-user
            class="follow-btn"
            v-model="article.is_followed"
            :user-id="article.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content  markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论列表 -->
        <comment-list
          :source="article.art_id"
          @onload-success="totalCommentCount = $event.total_count"
        />
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <!-- 这里在 info 替换成 badge -->
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <collect-article
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          ></collect-article>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <like-article
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
          ></like-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论的弹层 -->
        <van-popup v-model="isPostShow" position="bottom">
          hello
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
// import { addFollow, deleteFollow } from '@/api/user'
import followUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list'
// 测试 => http://localhost:8080/#/article/140911
// 140006
export default {
  name: 'articleIndex',

  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },

  data() {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的状态
      errStatus: 0, // 失败的状态码
      followLoading: false, // 关注按钮的 loading 状态
      totalCommentCount: 0,
      isPostShow: false
    }
  },

  components: {
    followUser,
    CollectArticle,
    LikeArticle,
    CommentList
  },

  created() {
    this.loadArticle()
  },

  methods: {
    async loadArticle() {
      this.loading = true
      try {
        // const { data } = await getArticleById(this.articleId)
        // console.log(data)
        const { data } = await getArticleById(this.articleId.toString())
        this.article = data.data
        // 后端返回的可能是 null
        if (data.data.attitude === null) {
          data.data.attitude = -1
        }
        setTimeout(() => {
          this.previewImage()
        }, 0)
        console.log(data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取数据失败', err)
      }
      // 关闭 loading 状态
      this.loading = false
    },
    previewImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = function() {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }
    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }
    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }
  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    /deep/ .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
