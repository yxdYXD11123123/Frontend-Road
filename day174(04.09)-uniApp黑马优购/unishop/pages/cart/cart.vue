<template>
	<!-- 购物车页面 -->
	<view class="cart" v-if="cart.length!=0">
		<!-- 收货地址 start -->
		<my-address/>
		<!-- 收货地址 end -->
		<!-- 购物车列表标题 start -->
		<view class="title">
			<uni-icons type="shop"></uni-icons>
			<text>购物车</text>
		</view>
		<!-- 购物车列表标题 end -->

		<!-- 购物车列表 start -->
		<uni-swipe-action class="list">
			<uni-swipe-action-item :right-options="swipeOptions" v-for="(item,index) in cart" :key="item.goods_id" @click="swipeActionClick($event, item.goods_id)">
				<goods-item :item="item" :showCheckbox="true" :showNumChanger="true" @changeChecked="changeGoodsChecked" @changeCount="changeGoodsCount">
				</goods-item>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<!-- 购物车列表 end -->
		
		<!-- 结算栏 start -->
		<view class="checkout">
			<label class="select-all"><radio :checked="selectAllFlag" color="#c00000" @click="selectAllInCart" />全选</label>
			<text>合计：<text>&yen;{{totalPrice.toFixed(2)}} </text></text>
			<view @click="settlement">
				结算({{checkedCount}})
			</view>
		</view>
		<!-- 结算栏 end -->
	</view>
	
	<!-- 空的购物车页面 start -->
	<view class="empty-cart" v-else>
		<image src="../../static/cart_empty@2x.png" mode="aspectFit"></image>
		<text>空空如也~</text>
	</view>
	<!-- 空的购物车页面 end -->
</template>

<script>
	// 导入购物车混入
	import mixinCart from "../../mixins/mixinCart.js";
	
	// 导入共享数据的映射方法
	import {
		mapState,
		mapGetters,
		mapMutations
	} from "vuex";

	export default {
		// 挂载混入
		mixins: [mixinCart],
		data() {
			return {
				// 右滑配置
				swipeOptions: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}],
			};
		},
		computed: {
			// 映射 购物车共享库中的 购物车商品信息
			...mapState("storeCart", ['cart']),
			// 用户地址信息，token令牌
			...mapState('storeUserInfo', ['address','token']),
			// 映射 是否全选  总价合计  选中商品数 
			...mapGetters("storeCart", ["selectAllFlag", "totalPrice", "checkedCount"]),
			...mapGetters("storeUserInfo", ['addressStr'])
		},
		methods: {
			// 如下：俩种使用共享库中modules的mutation方法的方式
			// 映射改变选中状态的mutation方法
			...mapMutations("storeCart", ["changeGoodsChecked", "changeGoodsCount", "delOneFromCart","selectAllInCart"]),
			/**
			 * 点击滑动出来的按钮
			 * @param {Object} e
			 */
			swipeActionClick(e,goods_id) {
				// 如果是点击删除
				if(e.content.text === "删除") {
					this.delOneFromCart({goods_id});
				}
			},
			/**
			 * 点击结算
			 */
			async settlement() {
				// 如果没有选择商品，请用户至少选择一件商品
				if(!this.checkedCount) return uni.$showMsg('请选择至少一件商品');
				// 如果没有选择地址，请用户选择地址
				if(JSON.stringify(this.address)==='{}') return uni.$showMsg('请选择地址');
				// 如果没有token，说明用户没有登录，自动跳转到登录页登录
				if(!this.token) {
					// 记录此页面
					this.$store.commit("storeUserInfo/updateNavBackPage", {
						// 此处注意，要使用绝对路径
						url: "/pages/cart/cart",
						openType: "switchTab"
					});
					// 倒计时去登录
					return this.timeoutNavToMy();
				};
				// 整理订单信息
				const createOrderParams = {
					// 订单价格
					order_price: 0.01,
					// 订单地址
					consignee_addr: this.addressStr,
					// 订单商品列表 （goods_id, goods_number, goods_price）
					goods: this.cart.filter(item=>item.goods_checked).map(val => ({
						goods_id: val.goods_id,
						goods_number: val.goods_count,
						goods_price: val.goods_price
					}))
				};
				// 创建订单
				const createOrderRes = await uni.$http.post("/api/public/v1/my/orders/create",createOrderParams);
				const {message, meta} = createOrderRes.data;
				if (meta.status !== 200) return uni.$showMsg('创建订单失败');
				// 创建订单成功后
				// 使用订单编号 发起支付请求
				const payRes = await uni.$http.post("/api/public/v1/my/orders/req_unifiedorder", {order_number: message.order_number});
				const {message: message2, meta: meta2} = payRes.data;
				if (meta2.status !== 200) return uni.$showMsg("订单不可支付");
				// 发起微信支付
				const [err, success] = await uni.requestPayment(message2.pay);
				if (err) return uni.$showMsg("订单不可支付");
				// 查询支付结果
				const checkRes = await uni.$http.post("/api/public/v1/my/orders/chkOrder", {order_number: message2.order_number});
				const {message: message3, meta: meta3} = checkRes.data;
				if (meta3.status !== 200) return uni.$showMsg("订单未支付");
				// 订单支付成功
				uni.showToast({
					icon: 'success',
					title: "支付完成！"
				})
			},
			/**
			 * 倒计时跳转到我的页面 
			 */
			timeoutNavToMy() {
				// 倒计时3秒
				let seconds = 3;
				// 提示用户，即将跳转登录页
				uni.$showMsg('请登录后再结算，'+seconds+'秒后自动跳转到登录页')
				// 开始倒计时
				let timer = setInterval(()=>{
					seconds -= 1; 
					if (seconds==0) {
						// 清除定时器
						clearInterval(timer)
						// 跳转
						return uni.switchTab({
							url:"../my/my"
						})
					}
					uni.$showMsg('请登录后再结算，'+seconds+'秒后自动跳转到登录页')
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	// 购物车页面
	.cart {
		padding-bottom: 120rpx;
	}
	/* 购物车列表标题 start */
	.title {
		display: flex;
		align-items: center;
		height: 60rpx;
		padding-left: 10rpx;
		font-size: 28rpx;
		border-bottom: 1px solid #eee;

		text:nth-child(2) {
			margin-left: 20rpx;
		}
	}

	/* 购物车列表标题 end */
	
	/* 结算栏 start */
	.checkout {
		position: fixed;
		bottom: 0px;
		display: flex;
		justify-content: space-between;
		line-height: 120rpx;
		width: 100%;
		background-color: #fff;
		z-index: 2;
		> text {
			font-size: 34rpx;
			text {
				color: #c00000;
			}
		}
		// 结算按钮
		> view {
			font-size: 36rpx;
			color: #fff;
			padding: 0 80rpx;
			background-color: #c00000;
		}
	}
	.select-all {
		margin-left: 20rpx;
	}
	/* 结算栏 end */
	
	/* 空购物车 start */
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		image {
			width: 180rpx;
			height: 180rpx;
			margin-top: 200rpx;
			margin-bottom: 20rpx;
		}
		text {
			color: #999;
			font-size: 30rpx;
		}
	}
	/* 空购物车 end */
</style>
