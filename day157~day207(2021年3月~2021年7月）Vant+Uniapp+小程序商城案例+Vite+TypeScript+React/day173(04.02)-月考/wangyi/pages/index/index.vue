<template>
	<view>
		<!-- 轮播图banner栏 start -->
		<swiper class="swiper" indicator-dots autoplay :interval="3000" :duration="1000">
			<swiper-item class="swiper-item" v-for="item in swiperList" :key="item.bannerId">
				<image :src="item.pic"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图banner栏 end -->

		<!-- 图标导航区 start -->
		<view class="nav">
			<view v-for="(item,index) in navList" :key="index">
				<view class="nav-iconbg">
					<text :class="item.iconName"></text>
				</view>
				<view class="nav-text">
					{{item.navName}}
				</view>
			</view>
		</view>
		<!-- 图标导航区 end -->

		<!-- 推荐歌单 start -->
		<view class="recommend">
			<!-- 标题 -->
			<view class="recommend-title">
				<view>
					推荐歌单
				</view>
				<view>
					查看更多
				</view>
			</view>
			<!-- 内容 -->
			<scroll-view class="recommend-content" :scroll-x="true" :scroll-left="100">
				<view class="recommend-item" v-for="item in recommendList" :key="item.id">
					<image :src="item.picUrl"></image>
					<view class="">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐歌单 end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图列表
				swiperList: [],
				// 导航列表
				navList: [{
						iconName: "iconfont icon-rili",
						navName: "每日推荐"
					},
					{
						iconName: "iconfont icon-icon--",
						navName: "私人FM"
					},
					{
						iconName: "iconfont icon-gedan",
						navName: "歌单广场"
					},
					{
						iconName: "iconfont icon-paixingbang",
						navName: "排行榜"
					},
					{
						iconName: "iconfont icon-diantai",
						navName: "电台"
					},
				],
				// 推荐歌单
				recommendList: []
			}
		},
		onLoad() {
			// 获取轮播图数据
			this.getSwiperList();
			// 获取歌单列表数据
			this.getRecommendList();
		},
		methods: {
			// 获取轮播图数据
			getSwiperList() {
				// 发起请求
				uni.$http.get("/banner?type=2").then((res) => {
					let {
						banners,
						code
					} = res.data;
					// 如果数据获取成功
					if (code == 200) {
						// 保存数据
						this.swiperList = banners;
					}
				})
			},
			// 获取推荐歌单数据
			getRecommendList() {
				// 发起请求
				uni.$http.get("/personalized").then((res) => {
					let {
						result,
						code
					} = res.data;
					// 如果数据获取成功
					if (code == 200) {
						// 保存数据
						this.recommendList = result;
						console.log(this.recommendList)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 轮播图 start */
	.swiper {
		height: 300rpx;
		padding: 30rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.swiper-item {
		border-radius: 20rpx;
		overflow: hidden;
	}

	/* 轮播图 end */

	/* 图标导航区 start */
	.nav {
		display: flex;
		font-size: 22rpx;
		color: #999999;
		text-align: center;

		>view {
			flex: 1;
		}
	}

	.nav-iconbg {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		background-color: #ec4141;
		margin: 0 auto;

		.iconfont {
			font-size: 46rpx;
		}
	}

	.nav-text {
		margin-top: 10rpx;
	}

	/* 图标导航区 end */

	/* 推荐歌单 start */
	.recommend {
		margin-top: 50rpx;
		padding: 0 30rpx;
	}

	.recommend-title {
		display: flex;
		justify-content: space-between;

		view:nth-child(1) {
			font-size: 30rpx;
			font-weight: 700;
		}

		view:nth-child(2) {
			font-size: 22rpx;
			padding: 4rpx 40rpx;
			color: #999;
			border: 1px solid #999;
			border-radius: 20rpx;
		}
	}

	// 内容
	.recommend-content {
		width: 100%;
		white-space: nowrap;
		margin-top: 30rpx;
	}

	.recommend-item {
		display: inline-block;
		width: 200rpx;
		margin-right: 20rpx;

		image {
			width: 100%;
			height: 200rpx;
			border-radius: 20rpx;
		}

		view {
			white-space: normal;
			width: 100%;
			height: 60rpx; //高度不能乱写，你要自己去看你的两行文字占多少高度
			overflow: hidden; //一定要写
			text-overflow: ellipsis; //超出省略号
			display: -webkit-box; //一定要写
			-webkit-line-clamp: 2; //控制行数
			-webkit-box-orient: vertical;
			font-size: 22rpx;
			color: #999;
		}
	}

	/* 推荐歌单 end */
</style>
