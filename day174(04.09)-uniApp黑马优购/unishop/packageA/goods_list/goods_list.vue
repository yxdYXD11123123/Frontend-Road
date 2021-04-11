<template>
	<!-- 商品列表 页面 -->
	<view>
		<view>
			<!-- 商品项 -->
			<goods-item v-for="(item,index) in goodsList" :key="item.goods_id" :item="item" @click="navToDetail(item.goods_id)"></goods-item>
		</view>
		<!-- 沒有更多 -->
		<view class="no-more" v-if="goodsList.length!=0 && goodsList.length >= total">
			没有更多了~
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				params: {
					// 搜索关键字
					query: "",
					// 商品分类id
					cid: "",
					// 页码
					pagenum: 1,
					// 每页条数
					pagesize: 10
				},
				// 商品总数
				total: 0,
				// 商品列表
				goodsList: [],
				// 是否正在加載--节流阀
				isLoading: false
			};
		},
		onLoad(options) {
			// 接收条件
			this.params.query = options.query || '';
			this.params.cid = options.cat_id || '';
			// 获取数据
			this.getGoodsList();
		},
		methods: {
			/**
			 * 获取商品列表
			 * @param {Boolean} refresh 是否下拉刷新
			 */
			getGoodsList(refresh = false) {
				if (!this.isLoading) {
					// 开启加载状态
					this.isLoading = true;
					// 发起请求
					uni.$http.get('/api/public/v1/goods/search', this.params).then((res) => {
						let {
							meta,
							message
						} = res.data;
						// 获取失败时
						if (meta.status != 200) return uni.showToast({
							title: "数据获取失败",
							icon: "none"
						});
						// 如果是在刷新数据，就进行替换，否则 就是加入新数据
						this.goodsList = refresh ? [...message.goods] : [...this.goodsList, ...message.goods];
						// 记录总数
						this.total = message.total;
						// 结束加载状态
						this.isLoading = false;
						refresh && uni.stopPullDownRefresh();
					});
				}
			},
			/**
			 * 导航到商品详情
			 */
			navToDetail(goods_id) {
				uni.navigateTo({
					url:"../goods_detail/goods_detail?goods_id="+goods_id
				})
			}
		},
		/**
		 * 触底时
		 */
		onReachBottom() {
			// 检查是否已经加载所有商品
			if (this.goodsList.length < this.total && !this.isLoading) {
				// 增加页码数
				this.params.pagenum += 1;
				// 请求更多商品
				this.getGoodsList();
			}
		},
		/**
		 * 下拉时
		 */
		onPullDownRefresh() {
			if (this.isLoading) return uni.stopPullDownRefresh();
			// 重置页码
			this.params.pagenum = 1;
			// 发起请求
			this.getGoodsList(true);
		}
	}
</script>

<style lang="scss">
	.no-more {
		height: 80rpx;
		background-color: $uni-bg-color-grey;
		font-size: 32rpx;
		line-height: 80rpx;
		text-align: center;
	}
</style>
