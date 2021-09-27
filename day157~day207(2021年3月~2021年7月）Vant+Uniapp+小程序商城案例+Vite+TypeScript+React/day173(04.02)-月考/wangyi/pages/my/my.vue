<template>
	<view>
		<!-- 顶部 start -->
		<view class="banner" style="background-image: url(../../static/picture/nahateaile.png);">
			<!-- 头像 -->
			<view class="avatar">
				<image src="../../static/picture/nahatenahte.png" mode="scaleToFill"></image>
				<view class="">
					点击头像登陆
				</view>
			</view>
		</view>
		<!-- 顶部 end -->
		<!-- 中间部分 start -->
		<view class="middle">
			<view class="middle-items">
				<text>听过</text>
				<text>歌单</text>
				<text>关注</text>
				<text>粉丝</text>
			</view>
			<view class="middle-listen">
				<view>
					<image src="../../static/icon/ranklist.png" mode=""></image>
					听歌排行
				</view>
				<view>
					<image src="../../static/icon/love.png" mode=""></image>
					听歌排行
				</view>
			</view>
		</view>
		<!-- 中间部分 end -->
		<view class="bottom">
			<view>
				<view class="bottom-title">
					我的歌单
				</view>
				<view>
					暂无歌单
				</view>
				<view class="bottom-title">
					我的歌单
				</view>
				<view>
					暂无歌单
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
		height: 500rpx;
		background-size: 100%;
	}

	.avatar {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #fff, $alpha: 0.5);

		image {
			margin-top: 100rpx;
			border: 10rpx solid rgba($color: #fff, $alpha: 0.5);
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
		}
	}
	
	/* 中间部分 start */
	.middle {
		position: relative;
		top: -50rpx;
		background-color: white;
		border-top-left-radius:60rpx;
		border-top-right-radius:60rpx;
	}
	.middle-items {
		display: flex;
		justify-content: space-around;
		padding-top: 100rpx;
		color: #999999;
		font-size: 28rpx;
	}
	.middle-listen {
		padding-left: 60rpx;
		view {
			line-height: 80rpx;
			padding: 20rpx 0;
		}
		image {
			width: 60rpx;
			height: 60rpx;
			vertical-align: text-top;
		}
	}
	/* 中间部分 end */
	.bottom-title {
		font-size: 30rpx;
		font-weight: 700;
		border-bottom: 1px solid #eee;
	}
</style>
