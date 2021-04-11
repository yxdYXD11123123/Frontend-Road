<template>
	<!-- 商品列表项 -->
	<view class="goods-item" @click="_click">
		<!-- 商品是否勾选 start -->
		<radio v-if="showCheckbox" :checked="item.goods_checked" color="#c00000" @click="handleChangeChecked" />
		<!-- 商品是否勾选 end -->

		<!-- 商品图片 start -->
		<image class="goods-img" :src="item.goods_small_logo || defaultImg " mode="aspectFit"></image>
		<!-- 商品图片 end -->

		<!-- 商品信息 start -->
		<view class="goods-infos">
			<!-- 商品名称 -->
			<view class="goods-name">
				{{item.goods_name}}
			</view>
			<!-- 商品价格 -->
			<view class="goods-bottom">
				<text class="goods-price">&yen; {{priceFixed}}</text>
				<uni-number-box class="goods-count" v-if="showNumChanger" :min="1" :value="item.goods_count" @change="handleChangeCount"></uni-number-box>
			</view>
		</view>
		<!-- 商品信息 end -->
	</view>
</template>

<script>
	export default {
		name: "goods-item",
		props: {
			// 商品项
			item: {
				type: Object,
				default: {}
			},
			// 显示复选框
			showCheckbox: {
				type: Boolean,
				default: false
			},
			// 显示数字框
			showNumChanger: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认图片
				defaultImg: "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png"
			};
		},
		created() {
		},
		methods: {
			// 点击事件
			_click() {
				// 触发自定义的点击事件
				this.$emit("click");
			},
			// 改变选中状态
			handleChangeChecked() {
				// 触发自定义改变选择状态事件
				this.$emit("changeChecked", {
					goods_id: this.item.goods_id,
					goods_checked: !this.item.goods_checked
				});
			},
			/**
			 * 改变选购数量 (注意：uni-number-box在渲染第一遍时，会执行此函数)
			 * @param {String} val 默认参数为输入框当前值
			 */
			handleChangeCount(val) {
				// 触发自定义的改变选购数量事件
				this.$emit("changeCount", {
					goods_id: this.item.goods_id,
					goods_count: +val
				})
			}
		},
		computed: {
			// 代替过滤器
			// 将商品价格保留俩位小数
			priceFixed() {
				return this.item.goods_price.toFixed(2);
			}
		}
	}
</script>

<style lang="scss">
	/* 商品项 start */
	.goods-item {
		display: flex;
		align-items: center;
		height: 242rpx;
		padding: 20rpx 8rpx;
		border-bottom: 1px solid #f5f5f5;
		box-sizing: border-box;
	}

	/* 商品项 end */

	// 商品图片
	.goods-img {
		width: 200rpx;
		height: 100%;
	}

	// 商品信息
	.goods-infos {
		flex: 1;
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10rpx;
		font-size: 26rpx;
	}

	.goods-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	// 商品价格
	.goods-price {
		color: #c10909;
		font-size: 32rpx;
		font-weight: 600;
	}
</style>
