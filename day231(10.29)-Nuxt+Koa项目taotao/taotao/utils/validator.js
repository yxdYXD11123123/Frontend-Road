export const validator = {
  // 用户名规则
  usernameRules: [
    { required: true, message: '请填写用户名' },
    { pattern: /^[a-zA-Z0-9]{4,20}$/, message: "用户名长度必须是大于4位或者小于20位" }
  ],
  // 密码规则
  passwordRules: [
    { required: true, message: '请填写密码' },
    { pattern: /^[a-zA-Z0-9]{6,20}$/, message: "用户密码长度需要6到20位" }
  ],
  /**
   * 确认密码规则
   * @param {*} password 密码
   * @returns passwordSureRules
   */
  passwordSureRules(password) {
    return [
      { required: true, message: '请填写确认密码' },
      {
        validator(val) {
          return val === password;
        },
        message: "两次密码不一致"
      }
    ]
  },
  // 手机号规则
  mobileRules: [
    { required: true, message: '请填写手机号' },
    { pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, message: "手机号格式不正确" }
  ],
  // 短信验证码规则
  smsRules: [
    { required: true, message: '请填写短信验证码' },
    { pattern: /^[0-9]{4}$/, message: "验证码格式不正确" }
  ]
}