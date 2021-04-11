export default {
	// 开启namespaced 
	namespaced: true,
	state() {
		return {
			// 收获地址
			address: uni.getStorageSync('address') || {},
			// 用户令牌
			token: uni.getStorageSync("token") || '',
			// 用户信息
			userProfile: uni.getStorageSync("userProfile") || {},
			// 需要 返回的上一个页面路由
			needNavBackPage: {}
		}
	},
	getters: {
		// 完整地址信息
		addressStr(state) {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo
			} = state.address;
			return provinceName + cityName + countyName + detailInfo
		}
	},
	mutations: {
		/**
		 * 获取收获地址
		 */
		updateAddress(state, payload) {
			// 设置
			state.address = payload;
			// 并保存到本地
			uni.setStorageSync("address", payload);
		},
		/**
		 * 存储用户token
		 */
		updateToken(state, payload){
			// 设置
			state.token = payload;
			// 保存到本地
			uni.setStorageSync("token", payload);
		},
		/**
		 * 存储用户信息
		 */
		updateUserProfile(state, payload) {
			state.userProfile = payload;
			uni.setStorageSync("userProfile", payload);
		},
		/**
		 * 更新需要返回的上一个页面信息
		 */
		updateNavBackPage(state, payload) {
			state.needNavBackPage = payload;
		}
	}
}
