<template>
  <div class="register">
    <!-- 注册表单 start -->
    <van-form ref="registerForm" :show-error="false" @submit="onSubmit">
      <van-field
        v-model="registerForm.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="validator.usernameRules"
      />
      <van-field
        v-model="registerForm.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="validator.passwordRules"
      />
      <van-field
        v-model="registerForm.repeat_password"
        type="surePassword"
        name="surePassword"
        label="确认密码"
        placeholder="确认密码"
        :rules="validator.passwordSureRules(registerForm.password)"
      />
      <van-field
        v-model="registerForm.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="validator.mobileRules"
      />
      <van-field
        v-model="registerForm.sms"
        name="sms"
        label="短信验证码"
        placeholder="短信验证码"
        :rules="validator.smsRules"
      >
        <!-- 发送验证码 start -->
        <template #button>
          <van-button
            size="small"
            type="primary"
            :disabled="smsBtnDisabled"
            @click="getSms"
            >{{ smsBtnText }}</van-button
          >
        </template>
        <!-- 发送验证码 end -->
      </van-field>
      <!-- 注册按钮 start -->
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >点击注册</van-button
        >
      </div>
      <!-- 注册按钮 end -->
    </van-form>
    <!-- 注册表单 end -->
  </div>
</template>

<script>
// 导入校验器
import { validator } from "~/utils/validator";
import { Toast } from "vant";

export default {
  data() {
    return {
      // 注册表单
      registerForm: {
        username: "",
        password: "",
        repeat_password: "",
        mobile: "",
        sms: "",
      },
      // 校验器
      validator,
      // 发送验证码按钮文本
      smsBtnText: "发送验证码",
      smsBtnDisabled: false,
    };
  },
  methods: {
    // 注册
    async onSubmit(values) {
      // 注册用户
      const { status, message } = await this.$api.UserRegister(values);
      // 成功时
      if (status === 200) {
        Toast.success(message);
        // 跳转登录页
        this.$router.push("login");
      }
    },
    // 获取验证码
    async getSms() {
      // 校验手机号
      try {
        await this.$refs.registerForm.validate("mobile");
      } catch (error) {
        if (error) {
          return Toast(error.message);
        }
      }
      // 禁用
      this.disableByTime(60);
      // 发送短信
      const { status, data } = await this.$api.GetSms(this.registerForm.mobile);
      if (status !== 200) return;
      Toast.success(data.message);
    },
    // 一定时间内禁用
    disableByTime(seconds) {
      // 禁用
      this.smsBtnDisabled = true;
      this.smsBtnText = `${seconds}秒后点击`;
      // 定时改变
      const id = setInterval(() => {
        seconds -= 1;
        this.smsBtnText = `${seconds}秒后点击`;
        // 关闭禁用
        if (seconds === 0) {
          this.smsBtnDisabled = false;
          this.smsBtnText = `发送验证码`;
          clearInterval(id);
        }
      }, 1000);
    },
  },
};
</script>

<style>
</style>