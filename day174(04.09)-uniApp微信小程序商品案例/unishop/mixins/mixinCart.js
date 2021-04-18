// 共享 购物车总数的mixin
import {
	mapGetters,
	mapState
} from 'vuex';

export default {
	// 页面显示时
	onShow() {
		// 设置tabbar徽章
		this.setBadge();
	},
	methods: {
		setBadge() {
			// 如果总数为0时，需要removeTabBarBadge来清除
			if(this.cart_total===0) {
				return uni.removeTabBarBadge({
					index: 2
				})
			}
			// 设置徽章 ！！！（注意：在微信小程序中setTabBarBadge时，如果不在tabbar页面，不会有效果）
			// 所以为了弥补这一问题，我们将这步封装为一个方法，在页面onshow时，也执行一次
			uni.setTabBarBadge({
				index: 2,
				// 注意给字符串
				text: this.cart_total + ''
			})
		}
	},
	computed: {
		// 映射 购物车总数
		...mapGetters('storeCart', ['cart_total']),
		...mapState("storeCart", ['cart'])
	},
	watch: {
		// 让每个tabbar页面可以响应式的设置徽章
		'cart_total'() {
			this.setBadge()
		}
	}
}
