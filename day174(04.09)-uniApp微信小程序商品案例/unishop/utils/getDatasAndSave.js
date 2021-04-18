/**
 * 获取数据并保存
 * @param {Object} getUrl 获取数据的接口
 * @param {Object} whichData 存储到哪个data中
 * @param {Object} _this this指针
 * @param {Object} successCallback 成功的回调
 */
export function getDatasAndSave(getUrl, _this ,whichData, successCallback) {
	// 发起请求
	uni.$http.get(getUrl).then((res) => {
		let {
			meta,
			message
		} = res.data;
		// 获取成功时
		if (meta.status == 200) {
			// 保存数据
			_this[whichData] = message;
			// 成功时的回调
			successCallback&&successCallback();
		} else { // 失败时，提示用户
			uni.showToast({
				title: "数据获取失败",
				icon: "none"
			})
		}
	});
}
