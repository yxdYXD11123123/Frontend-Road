<template>
	<!-- 登录页 -->
	<view class="login">
		<!-- 默认头像 -->
		<uni-icons class="avatar" type="contact-filled" size="100" color="#999"></uni-icons>
		<!-- 登录按钮 -->
		<view class="login-btn" @click="login">
			一键登录
		</view>
		<text class="login-tips">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			// 映射需要返回的上一个页面信息
			...mapState("storeUserInfo",['needNavBackPage'])
		},
		methods:{
			// 点击一键登录
			login() {
				// 获取用户信息
				wx.getUserProfile({
					desc: "需要您的个人信息进行登录",
					success: async(userProfile) => {
						// 成功获取用户信息后, 存储到本地
						this.$store.commit("storeUserInfo/updateUserProfile", userProfile)
						// 发起登录
						const [err,success] = await uni.login();
						// 登录失败
						if(err||success.errMsg!=='login:ok') return uni.$showMsg("登录失败");
						// 整合信息
						const params = {
							code: success.code,
							encryptedData: userProfile.encryptedData,
							iv: userProfile.iv,
							rawData: JSON.stringify(userProfile.rawData),
							signature: userProfile.signature
						}
						// 发起登录请求，换取token
						const res = await uni.$http.post("/users/wxlogin", params);
						// 登录成功后
						// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUzLCJpYXQiOjE2MTc5NTQyMTYsImV4cCI6MTAwMTYxNzk1NDIxNX0.wpJqjziOCXcPMBX-RNC-uobzTQjif7dU0mwvtNi-sYU
						// 将token存储到本地 (使用假token代替)
						let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUzLCJpYXQiOjE2MTc5NTQyMTYsImV4cCI6MTAwMTYxNzk1NDIxNX0.wpJqjziOCXcPMBX-RNC-uobzTQjif7dU0mwvtNi-sYU";
						this.$store.commit("storeUserInfo/updateToken", token);
						
						
						// 如果有需要跳回的前一个页面
						if (JSON.stringify(this.needNavBackPage)!=="{}") {
							// 使用对应API 跳回
							uni[this.needNavBackPage.openType]({
								// 回到记录的路由
								url: this.needNavBackPage.url
							})
						};
					},
					fail(err) {
						if (err.errMsg== "getUserProfile:fail auth deny") {
							uni.$showMsg("您已拒绝登录")
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.avatar {
		margin-top: 160rpx;
	}
	
	.login-btn {
		margin-top: 40rpx;
		width: 600rpx;
		line-height: 90rpx;
		background-color: #c00000;
		text-align: center;
		color: #fff;
		border-radius: 45rpx;
	}
	
	.login-tips {
		margin-top: 34rpx;
		color: #999;
		font-size: 26rpx;
	}
</style>
