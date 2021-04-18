<template>
	<view class="my-info">
		<!-- 头部用户头像 start -->
		<view class="top">
			<!-- 用户头像 -->
			<image class="top-avatar" :src="userProfile.userInfo.avatarUrl"></image>
			<!-- 用户昵称 -->
			<view class="top-name">
				{{userProfile.userInfo.nickName}}
			</view>
		</view>
		<!-- 头部用户头像 end -->

		<!-- 导航栏 start -->
		<view class="nav">
			<view class="nav-item" v-for="(item,index) in navList" :key="index">
				<view>
					{{item.count}}
				</view>
				<!-- 导航标题 -->
				<view>
					{{item.title}}
				</view>
			</view>
		</view>
		<!-- 导航栏 end -->

		<!-- 订单栏 start -->
		<view class="orders">
			<view class="orders-top">
				我的订单
			</view>
			<view class="orders-content">
				<view class="orders-item">
					<image class="orders-icon" src="../../static/my-icons/icon1.png" mode="aspectFit"></image>
					<view class="orders-title">
						待付款
					</view>
				</view>
				<view class="orders-item">
					<image class="orders-icon" src="../../static/my-icons/icon2.png" mode="aspectFit"></image>
					<view class="orders-title">
						待收货
					</view>
				</view>
				<view class="orders-item">
					<image class="orders-icon" src="../../static/my-icons/icon3.png" mode="aspectFit"></image>
					<view class="orders-title">
						退款/退货
					</view>
				</view>
				<view class="orders-item">
					<image class="orders-icon" src="../../static/my-icons/icon4.png" mode="aspectFit"></image>
					<view class="orders-title">
						全部订单
					</view>
				</view>
			</view>
		</view>
		<!-- 订单栏 end -->
		
		<!-- 更多功能 start -->
		<view class="more">
			<view class="more-item">
				<text>收获地址</text> <uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="more-item">
				<text>联系客服</text> <uni-icons type="arrowright"></uni-icons>
			</view>
			<view class="more-item" @click="logout">
				<text>退出登录</text> <uni-icons type="arrowright"></uni-icons>
			</view>
		</view>
		<!-- 更多功能 end -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";

	export default {
		name: "my-userinfo",
		data() {
			return {
				// 导航栏列表
				navList: [{
					title: "收藏的店铺",
					count: 8
				}, {
					title: "收藏的商品",
					count: 14
				}, {
					title: "关注的商品",
					count: 18
				}, {
					title: "足迹",
					count: 84
				}],
			};
		},
		computed: {
			...mapState("storeUserInfo", ["userProfile"]),
		},
		methods: {
			...mapMutations("storeUserInfo", ['updateAddress','updateToken','updateUserProfile']),
			/**
			 * 退出登录
			 */
			async logout() {
				// 提示用户
				const [err, success] = await uni.showModal({
					title: "提示：",
					content: "确定退出登录吗"
				})
				if (err || !success.confirm) return uni.$showMsg('退出失败');
				this.updateAddress({});
				this.updateToken('');
				this.updateUserProfile({});
			}
		}
	}
</script>

<style lang="scss">
	.my-info {
		height: 100%;
		background-color: #f4f4f4;
	}

	/* 顶部头像 start */
	.top {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		background-color: #c00000;
	}

	.top-avatar {
		width: 160rpx;
		height: 160rpx;
		border: 2px solid #fff;
		border-radius: 50%;
		box-shadow: 0 1px 5px black;
	}

	.top-name {
		margin-top: 30rpx;
		color: #fff;
	}

	/* 顶部头像 end */

	/* 导航栏 start */
	.nav,
	.orders,
	.more{
		background-color: #FFFFFF;
		margin: 0 30rpx;
		border-radius: 8rpx;
	}

	.nav {
		position: relative;
		display: flex;
		top: -20rpx;
	}

	.nav-item {
		flex: 1;
		padding: 20rpx 0;
		text-align: center;
		font-size: 28rpx;
	}

	/* 导航栏 end */

	/* 订单栏 start */
	.orders-top {
		padding: 20rpx 0;
		padding-left: 18rpx;
		font-size: 32rpx;
		border-bottom: 1px solid #f4f4f4;
	}
	.orders-content {
		display: flex;
		text-align: center;
	}

	.orders-item {
		flex: 1;
		padding: 14rpx 0;
	}

	.orders-icon {
		width: 73rpx;
		height: 73rpx;
		vertical-align: middle;
	}

	.orders-title {
		line-height: 1;
		font-size: 25rpx;
		margin-top: 4rpx;
	}

	/* 订单栏 end */
	
	/* 更多功能 start */
	.more {
		margin-top: 20rpx;
	}
	.more-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
	}
	/* 更多功能 end */
</style>
