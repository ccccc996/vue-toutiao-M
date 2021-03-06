<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'

export default {
  name: 'CommentPost',

  data() {
    return {
      message: ''
    }
  },

  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },

  methods: {
    async onPost() {
      try {
        const { data } = await addComment({
          target: this.target, // 评论的目标 ID（评论文章即为文章ID，对评论进行回复则为评论ID）
          content: this.message, // 评论内容
          art_id: null
        })
        // 关闭弹出层
        // 清空数据
        // 将评论的内容添加到list列表中
        this.message = ''
        this.$emit('post-success', data.data)
        console.log(data)
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
