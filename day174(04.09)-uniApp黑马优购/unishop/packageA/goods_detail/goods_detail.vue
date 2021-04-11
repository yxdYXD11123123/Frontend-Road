<template>
	<!-- 商品详情页 -->
	<view v-if="goods_details">
		<!-- 轮播图 start -->
		<swiper class="swiper" indicator-dots autoplay circular :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in goods_details.pics" :key="item.pics_id">
				<!-- 商品图片 -->
				<image :src="item.pics_mid_url" mode="aspectFit" @click="previewImages(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图 end -->

		<!-- 商品信息 start -->
		<view class="infos">
			<!-- 价格 -->
			<view class="infos-price">
				&yen; {{goods_details.goods_price}}
			</view>
			<!-- 商品名、收藏 -->
			<view class="infos-name">
				<view>
					{{goods_details.goods_name}}
				</view>
				<view class="infos-collect">
					<uni-icons type="star" size="16" color="#999"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 快递服务 -->
			<view class="infos-express">
				快递：免运费
			</view>
		</view>
		<!-- 商品信息 end -->

		<!-- 商品详情介绍 start -->
		<view class="introduce">
			<rich-text :nodes="goods_details.goods_introduce"></rich-text>
		</view>
		<!-- 商品详情介绍 end -->

		<!-- 购物导航 start -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="goodsNavOptions" :button-group="buttonGroup"
				@buttonClick="buyButtonGroup" @click="navToCartOrShop" />
		</view>
		<!-- 购物导航 end -->
	</view>
</template>

<script>
	// 导入获取数据的方法
	import {
		getDatasAndSave
	} from "../../utils/getDatasAndSave.js";
	// 导入共享数据的映射方法
	import {
		mapState,
		mapGetters,
		mapMutations
	} from "vuex";


	export default {
		data() {
			return {
				// 声明商品详情信息
				goods_details: null,
				// 购物导航选项
				goodsNavOptions: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					// 购物车数量
					info: ''
				}],
				// 购物按钮组
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			// 获取商品详情
			getDatasAndSave("/api/public/v1/goods/detail?goods_id=" + options.goods_id, this, "goods_details", () => {
				// 解决商品介绍的图片显示问题
				this.goods_details.goods_introduce = this.goods_details.goods_introduce.replace(/<img/g,
					'<img style="vertical-align: middle;"').replace(/.webp/g, '.jpg')
			});
		},
		methods: {
			...mapMutations("storeCart", ["addToCart"]),
			// 预览图片
			previewImages(index) {
				// 预览图片
				uni.previewImage({
					// 图片数组，使用map方法，将图片地址组成一个新数组
					urls: this.goods_details.pics.map(value => value.pics_big_url),
					// 传入图片索引
					current: index
				})
			},
			/**
			 * 点击 加入购物车、购买
			 * @param {Object} e 被点击的按钮信息
			 */
			buyButtonGroup(e) {
				// 如果是加入购物车
				if (e.content.text === "加入购物车") {
					// 取出商品信息
					const {
						goods_id, // 商品id
						goods_name, // 商品名称
						goods_price, // 商品价格
						goods_small_logo // 商品图片
					} = this.goods_details;
					const goods = {
						goods_id,
						goods_name,
						goods_price,
						goods_small_logo,
						goods_count: 1, // 商品数量
						goods_checked: true // 商品是否被选中
					}
					// 添加到购物车数据中
					this.addToCart(goods);
				}
			},
			/**
			 * 导航到店铺或购物车页面
			 * @param {Object} e
			 */
			navToCartOrShop(e) {
				// 点击购物车
				if(e.content.text==="购物车") {
					// 跳转到购物车页面
					uni.switchTab({
						url: "../../pages/cart/cart"
					})
				}
			}
		},
		computed: {
			// ...mapState({num: (state)=>state.storeCart.count})
			// 或者 在对应module开启命名空间（namespaced: true）的条件下，这样获取数据
			...mapGetters("storeCart", ['cart_total'])
		},
		watch: {
			// 监听 购物车中商品的总数
			cart_total: {
				// 立即执行
				immediate:true,
				handler(newVal) {
					// 找到购物车索引
					const index = this.goodsNavOptions.findIndex(val=>val.text==='购物车')
					// 更新购物车徽章
					this.goodsNavOptions[index].info = newVal;
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 轮播图 start */
	.swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	/* 轮播图 end */

	/* 商品信息 start */
	.infos {
		padding-left:24rpx;
	}
	
	// 商品价格
	.infos-price {
		color: #c00000;
		font-size: 38rpx;
		font-weight: 700;
		line-height: 80rpx;
	}
	
	// 商品名称
	.infos-name {
		display: flex;
		> view:first-child {
			flex: 1;
			font-size: 26rpx;
		}
	}
	
	// 收藏
	.infos-collect {
		display: flex;
		width: 130rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #999999;
		border-left: 1px solid #eee;
	}
	// 快递
	.infos-express {
		color: #999999;
		font-size: 22rpx;
		line-height: 70rpx;
		padding-bottom: 10rpx;
	}

	/* 商品信息 end */

	/* 购物导航 start */
	.goods-nav {
		position: sticky;
		bottom: 0;
	}

	/* 购物导航 end */
</style>
