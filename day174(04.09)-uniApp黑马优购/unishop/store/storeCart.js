export default {
	// 开启namespaced 
	// 如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
	// 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
	// https://vuex.vuejs.org/zh/guide/modules.html#带命名空间的绑定函数
	// 开启命名空间，可以帮助分离不同模块中的同名muations和actions
	namespaced: true,
	state() {
		return {
			// 购物车
			cart: uni.getStorageSync('cart') || []
		}
	},
	getters: {
		// 购物车商品总数
		cart_total(state) {
			let total = 0;
			// 统计商品数量，累加
			state.cart.forEach(val => {
				total += val.goods_count
			});
			return total;
		},
		// 是否全选
		selectAllFlag(state) {
			// 每一项都是 true时，返回true;
			return state.cart.length>0 ? state.cart.every(val=>val.goods_checked): false;
		},
		// 合计
		totalPrice(state) {
			let totalPrice = 0;
			// 统计商品价格，累加
			state.cart.forEach(val => {
				if (val.goods_checked) {
					totalPrice += val.goods_price * val.goods_count;
				}
			});
			// 或者使用 reduce 方法
			// totalPrice = state.cart.reduce((sum, val)=>val.goods_checked?sum+val.goods_price*val.goods_count:sum+0,0)
			return totalPrice;
		},
		// 选中商品数量
		checkedCount(state) {
			let count = 0;
			state.cart.forEach(val => {
				if (val.goods_checked) {
					count += val.goods_count;
				}
			});
			// return count;
			return state.cart.reduce((sum, val)=>val.goods_checked?sum+val.goods_count:sum+0,0);
		}
	},
	mutations: {
		/**
		 * 添加到购物车
		 * @param {Object} state 共享数据
		 * @param {Object} payload 传来的商品信息 
		 */
		addToCart(state, payload) {
			// 如果购物车中已有此商品
			// find 方法在找到元素时，会返回元素本身，否则返回undefined
			const findRes = state.cart.find(val => val.goods_id === payload.goods_id);
			if (findRes) {
				// 已有的话
				findRes.goods_count += 1;
				
			} else {
				// 没有的话，添加
				state.cart.unshift(payload);
			}
			// 同步购物车信息到本地
			this.commit("storeCart/saveToStorage");
		},
		/**
		 * 修改其中商品的选择状态
		 */
		changeGoodsChecked(state, payload) {
			// 通过id找到对应商品索引
			const index = state.cart.findIndex(val=>val.goods_id===payload.goods_id);
			// 修改选择状态
			state.cart[index].goods_checked = payload.goods_checked;
			// 本地同步
			this.commit("storeCart/saveToStorage");
		},
		/**
		 * 修改其中商品的选购数量
		 * @param {Object} state
		 * @param {Object} payload
		 */
		changeGoodsCount(state,payload){
			// 通过id找到对应商品索引
			const index = state.cart.findIndex(val=>val.goods_id===payload.goods_id);
			// 修改商品数量
			state.cart[index].goods_count = payload.goods_count;
			// 本地同步
			this.commit("storeCart/saveToStorage");
		},
		/**
		 * 从购物车中删除 某个商品
		 */
		delOneFromCart(state, payload) {
			// 通过id找到对应商品索引
			const index = state.cart.findIndex(val=>val.goods_id===payload.goods_id);
			// 删除商品
			state.cart.splice(index, 1);
			// 本地同步
			this.commit("storeCart/saveToStorage");
		},
		/**
		 * 选中 / 取消选中 全部商品
		 * @param {Object} state
		 */
		selectAllInCart(state){
			let flag = state.cart.every(val=>val.goods_checked);
			// 选中每个
			state.cart.forEach(val=>{val.goods_checked=!flag;});
			// 本地同步
			this.commit("storeCart/saveToStorage");
		},
		/**
		 * 将购物车中的信息持久化
		 */
		saveToStorage(state) {
			uni.setStorageSync("cart", state.cart);
		}
	}
}
