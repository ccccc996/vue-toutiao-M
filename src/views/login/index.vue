<template>
  <div class="login-container">
    <!-- 标题 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        name="用户名"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="密码"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
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
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3578]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },

  methods: {
    async onSubmit() {
      const user = this.user
      // 自定义加载图标
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await login(user)
        // console.log(res, '登陆成功')
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          // console.log('手机号或验证码错误', err)
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log('登陆失败请稍后重试', err)
          this.$toast.fail('登录失败，请稍后重试')
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
