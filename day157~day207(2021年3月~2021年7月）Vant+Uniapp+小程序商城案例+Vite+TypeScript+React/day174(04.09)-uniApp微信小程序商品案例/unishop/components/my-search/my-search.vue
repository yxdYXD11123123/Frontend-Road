<template>
	<view class="search" @click="navToSearch">
		<view class="search-content">
			<uni-icons type="search" color="#999"></uni-icons>
			<text style="margin-left: 16rpx;">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		methods:{
			/**
			 * 导航到搜索页
			 */
			navToSearch() {
				uni.navigateTo({
					url:'../../packageA/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		position: sticky;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		z-index: 999;
		height: 100rpx;
		background-color: #c00000;
	}

	.search-content {
		width: 700rpx;
		height: 72rpx;
		text-align: center;
		line-height: 72rpx;
		font-size: 30rpx;
		color: #999999;
		background-color: #ffffff;
		border-radius: 36rpx;
	}
</style>
