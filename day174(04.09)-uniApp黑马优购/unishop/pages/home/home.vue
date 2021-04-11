<template>
	<!-- 首页 -->
	<view class="home">
		<!-- 搜索组件 start -->
		<my-search/>
		<!-- 搜索组件 end -->
		
		<!-- 顶部轮播图 start -->
		<swiper class="banner" indicator-dots autoplay circular :interval="3000" :duration="1000">
			<!-- 循环渲染列表 -->
			<swiper-item v-for="(item, index) in bannerList" :key="item.goods_id">
				<!-- 导航 -->
				<navigator :url="'/packageA/goods_detail/goods_detail?goods_id='+item.goods_id"
					:open-type="item.open_type">
					<!-- 内容图片 -->
					<image :src="item.image_src" mode="aspectFill"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 顶部轮播图 end -->

		<!-- 分类导航栏 start -->
		<view class="nav">
			<view v-for="(item,index) in navList" :key="index" @click="navTo(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 分类导航栏 end -->

		<!-- 楼层推荐 start -->
		<view class="floors">
			<view v-for="(item, index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image class="floor-title" :src="item.floor_title.image_src" mode="widthFix"></image>
				<!-- 楼层内容 -->
				<view class="floor-content">
					<navigator v-for="(t, i) in item.product_list" :key="i" :style="'width:'+t.image_width+'rpx'"
						:url="'/packageA/goods_list/goods_list?'+t.navigator_url">
						<image :src="t.image_src" :mode="i==0?'widthFix':'heightFix'"></image>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 楼层推荐 end -->

	</view>
</template>

<script>
	// 导入获取数据的方法
	import {
		getDatasAndSave
	} from "../../utils/getDatasAndSave.js";
	// 导入购物车混入
	import mixinCart from "../../mixins/mixinCart.js";

	export default {
		mixins: [mixinCart],
		data() {
			return {
				// 轮播图列表
				bannerList: [],
				// 分类导航栏列表
				navList: [],
				// 楼层列表
				floorList: []
			};
		},
		// 页面加载时
		onLoad() {
			// 获取轮播图数据
			getDatasAndSave('/api/public/v1/home/swiperdata', this, "bannerList");
			// 获取导航栏数据
			getDatasAndSave('/api/public/v1/home/catitems', this, "navList");
			// 获取楼层数据
			getDatasAndSave('/api/public/v1/home/floordata', this, "floorList", () => {
				// 对楼层数据特殊处理
				this.floorList.forEach((v, i) => {
					v.product_list.forEach((value, index) => {
						// 截取url ? 后半部分
						value.navigator_url = value.navigator_url.split('?')[1];
					})
				})
			})
			
		},
		methods: {
			// 导航到其他页面
			navTo(navInfo) {
				if (navInfo.open_type == "switchTab" && navInfo.name == "分类") {
					uni.switchTab({
						url: "/pages/cates/cates"
					});
				}
			},
		},
	}
</script>

<style lang="scss">
	/* 轮播图栏 start */
	.banner {
		height: 340rpx;

		navigator,
		image {
			width: 100%;
			height: 100%;
		}
	}

	/* 轮播图栏 end */

	/* 分类导航栏 start */
	.nav {
		display: flex;
		margin: 28rpx 0;

		view {
			flex: 1;
		}

		image {
			display: block;
			width: 128rpx;
			height: 140rpx;
			margin: 0 auto;
		}
	}

	/* 分类导航栏 end */

	/* 楼层推荐 start */
	.floor-title {
		display: block;
		padding-top: 10rpx;
		width: 100%;
	}

	.floor-content {
		padding: 0 16rpx;
		margin: 0 auto;
		overflow: hidden;

		navigator {
			float: left;

			&:nth-last-child(-n+4) {
				margin-left: 10rpx;
				margin-bottom: 10rpx;
				height: 188rpx;
			}

			&:nth-last-child(-n+2) {
				margin-bottom: 0;
			}
		}

		image {
			display: block;
			height: 100%;
			max-width: 100%;
		}
	}

	/* 楼层推荐 end */
</style>
