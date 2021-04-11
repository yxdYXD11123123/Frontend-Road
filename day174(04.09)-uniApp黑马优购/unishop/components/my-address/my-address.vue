<template>
	<view>
		<!-- 收获地址 start -->
		<view class="choose">
			<!-- 选择收货地址 start -->
			<button v-if="JSON.stringify(address)=='{}'" class="choose-btn" type="primary" size="mini"
				@click="chooseAddress"> 请选择收货地址+ </button>
			<!-- 选择收货地址 end -->

			<!-- 默认收获地址信息 start -->
			<view v-else class="address-info" @click="chooseAddress">
				<view class="address-info-top">
					<view>收货人：{{address.userName}}</view>
					<view>电话：{{address.telNumber}}
						<uni-icons style="padding: 0 10rpx;" type="arrowright"></uni-icons>
					</view>
				</view>
				<view class="address-info-bottom">
					收获地址：{{addressStr}}
				</view>
			</view>
			<!-- 默认收获地址信息 end -->
		</view>
		<!-- 收获地址 start -->

		<!-- 边界线 start -->
		<view>
			<image class="border" src="../../static/cart_border@2x.png" mode="aspectFit"></image>
		</view>
		<!-- 边界线 end -->
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from "vuex";

	export default {
		name: "my-address",
		data() {
			return {

			};
		},
		methods: {
			// 点击选择收货地址
			chooseAddress() {
				const _this = this;
				// 先获取用户当前的设置信息
				uni.getSetting({
					success(res) {
						if (res.errMsg != "getSetting:ok") return uni.$showMsg('获取设置信息失败')
						// 检查用户是否开启地址权限
						// 如果开启了，那么直接让用户选择地址信息
						if (res.authSetting['scope.address']) return uni.chooseAddress({
							// 获取成功后
							success(res) {
								// 存到 共享库中
								_this.$store.commit("storeUserInfo/updateAddress", res);
							}
						})
						// 如果没有开启此权限
						// 提示用户未开权限
						uni.showModal({
							title: "您没有开启地址授权，是否前往开启",
							success(res) {
								// 如果用户点击取消，直接退出
								if (res.cancel) return uni.$showMsg('您取消了地址授权');
								// 打开设置窗口
								uni.openSetting({
									success(res) {
										// 如果设置后，还没有权限
										if (!res.authSetting['scope.address']) return uni
											.$showMsg('您取消了地址授权');
										// 开启权限后
										uni.$showMsg('您已开启地址权限，请选择地址')
									}
								})
							}
						})
					}
				})
			}
		},
		computed: {
			// 映射共享数据库中  地址信息
			...mapState('storeUserInfo', ['address']),
			...mapGetters("storeUserInfo", ['addressStr'])
		}
	}
</script>

<style lang="scss">
	.choose {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 180rpx;
	}

	// 边界线
	.border {
			display: block;
			width: 100%;
			height: 20rpx;
	}

	/* 默认收货地址信息 start */
	.address-info {
		width: 100%;
		font-size: 30rpx;
		padding: 0 20rpx;
	}

	.address-info-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	/* 默认收货地址信息 end */
</style>
