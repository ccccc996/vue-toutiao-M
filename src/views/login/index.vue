<template>
  <div class="login-container">
    <!-- 标题 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field name="用户名" placeholder="请输入手机号" v-model="user.mobile">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="密码" placeholder="请输入验证码" v-model="user.code">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button round size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'loginIndex',

  data() {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },

  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user)
        console.log(res, '登陆成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败', err)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 20px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
