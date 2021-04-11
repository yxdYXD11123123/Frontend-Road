<template>
	<!-- 分类页面 -->
	<view class="cates">
		<!-- 搜索组件 start -->
		<my-search ref="search" />
		<!-- 搜索组件 end -->

		<!-- 分类列表 start -->
		<view class="content" style="height:calc(100vh - 100rpx)">
			<!-- 左侧滚动 start -->
			<scroll-view scroll-y="true" class="left-cates">
				<view v-for="(item,index) in catesList" :key="item.cat_id" :class="cateActive==index?'active':''"
					@click="changeCateActive(index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 左侧滚动 end -->

			<!-- 右侧滚动 start -->
			<scroll-view scroll-y="true" class="right-cates" :scroll-top="rightScrollTop">
				<!-- 二级分类 start -->
				<view v-for="(item,index) in catesList[cateActive].children" :key="item.cat_id">
					<view class="right-title">
						/ {{item.cat_name}} /
					</view>
					<view class="right-content">
						<!-- 三级分类 start -->
						<view v-for="(v, i) in item.children" :key="v.cat_id" @click="navToGoodsList(v.cat_id)">
							<!-- 分类icon -->
							<view>
								<image :src="v.cat_icon" mode="aspectFit"></image>
							</view>
							<!-- 分类名 -->
							<view class="right-names">
								{{v.cat_name}}
							</view>
						</view>
						<!-- 三级分类 start -->
					</view>
				</view>
				<!-- 二级分类 end -->
			</scroll-view>
			<!-- 右侧滚动 end -->

		</view>
		<!-- 分类列表 end -->
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
				// 窗口高度
				wh: 0,
				// 顶部搜索栏高度
				searchHeight: 0,
				// 分类数据
				catesList: [],
				// 当前一级分类
				cateActive: 0,
				// 右侧分类的滚动条位置
				rightScrollTop: 1
			};
		},
		/**
		 * 页面加载时
		 */
		onLoad() {
			// 获取屏幕高度
			this.wh = uni.getSystemInfoSync().windowHeight;
			// 由于 rpx 不能合适的计算出 窗口剩余高度
			// 所以，我们使用下面的方法去获取搜索框高度 来计算 窗口剩余高度
			// 创建一个selectQuery选择器对象，在search自定义组件中 寻找 .search Dom元素，指定获取 size信息
			uni.createSelectorQuery().in(this.$refs.search).select('.search').fields({size:true},(data) => {
				// 赋值
				this.searchHeight = data.height;
			}).exec();
			
			// 获取分类数据
			getDatasAndSave('/api/public/v1/categories', this, "catesList");
		},
		methods: {
			/**
			 * 切换当前一级分类
			 * @param {Number} index
			 */
			changeCateActive(index) {
				// 切换一级分类active
				this.cateActive = index;
				// 重置滚动条位置  
				// 这里需要注意，组件属性修改不生效的问题，可能是因为给组件修改的值和之前的旧值是一致的，所以不会同步到view层
				// 和props的单向数据流特性有关
				this.rightScrollTop = this.rightScrollTop == 0 ? 1 : 0;
			},
			/**
			 * 跳转商品列表页
			 * @param {Object} cat_id 商品分类id
			 */
			navToGoodsList(cat_id) {
				uni.navigateTo({
					url: '../../packageA/goods_list/goods_list?cat_id=' + cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
	}

	/* 左侧分类 start */
	.left-cates {
		width: 190rpx;
		height: 100%;
		background-color: #f6f6f6;

		view {
			position: relative;
			height: 134rpx;
			line-height: 134rpx;
			font-size: 28rpx;
			text-align: center;

			&.active {
				background-color: #fff;

				&::before {
					display: block;
				}
			}

			// 二级分类左侧红线
			&::before {
				content: "";
				position: absolute;
				display: none;
				width: 8rpx;
				height: 60rpx;
				background-color: #c00000;
				left: 0;
				top: 50%;
				margin-top: -30rpx;
			}
		}

	}

	/* 左侧分类 end */

	/* 右侧分类 start */
	.right-cates {
		flex: 1;
	}

	// 右侧二级分类标题
	.right-title {
		padding: 34rpx 0 20rpx;
		font-size: 28rpx;
		font-weight: 700;
		text-align: center;
	}


	.right-content {
		display: flex;
		flex-wrap: wrap;

		// 三级分类 
		>view {
			width: 33.33%;
			text-align: center;
			margin-bottom: 20rpx;

			>view:first-child {
				display: flex;
				align-items: center;
				min-height: 120rpx;
			}
		}

		// 商品分类图片
		image {
			display: block;
			margin: 0 auto;
			width: 120rpx;
			height: 120rpx;
		}
	}

	.right-names {
		font-size: 26rpx;
	}

	/* 右侧分类 end */
</style>
