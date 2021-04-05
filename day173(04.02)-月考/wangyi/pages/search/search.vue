<template>
	<view>
		<!-- 搜索框 start -->
		<uni-search-bar :placeholder="defaultPlaceHolder" @confirm="searchAndNavTo" />
		<!-- 搜索框 end -->
		
		<!-- 搜索历史 start -->
		<view class="history">
			<view>
				历史 <uni-icons type="trash" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-content">
				<uni-tag class="history-item" :text="item" :circle="true" size="small" v-for="(item,index) in searchHistory" :key="index"></uni-tag>
			</view>
		</view>
		<!-- 搜索历史 end -->
		
		<!-- 热搜 start -->
		<view class="hot">
			<!-- 标题 -->
			<view class="hot-title">
				<image src="../../static/icon/fire.png" mode="aspectFit"></image> 热搜榜
			</view>
			<!-- 内容 -->
			<view class="hot-content">
				<view :class="{'hot-item':true, 'blodfont': index<3 }" v-for="(item,index) in hotList" :key="index">
					<text :class="{'color-red': index<3}">{{index+1}}</text> {{item.searchWord}} <image :src="item.iconUrl" mode="aspectFit"></image>
				</view>
			</view>
			<!-- 更多热搜 -->
			<view v-if="hotList.length!=20" class="show-more-hot" @click="addMoreHot">
				展示更多热搜
			</view>
		</view>
		<!-- 热搜 end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 热搜
				hotList: [],
				// 更多热搜
				moreHotList: [],
				// 默认
				defaultPlaceHolder: "",
				// 搜索历史
				searchHistory: []
			};
		},
		onLoad() {
			this.getHotList()
			this.getDefaultKeyWord();
		},
		onShow() {
			// 获取搜索历史
			this.searchHistory = uni.getStorageSync('searchHistory');
			
		},
		methods: {
			// 获取热搜列表
			getHotList() {
				// 发起请求
				uni.$http.get("/search/hot/detail").then((res) => {
					let {
						data,
						code
					} = res.data;
					// 如果数据获取成功
					if (code == 200) {
						// 保存数据
						this.hotList = data.slice(0,10);
						this.moreHotList = data.slice(10, 20);
					}
				})
			},			
			// 获取大家都在搜
			getDefaultKeyWord() {
				// 发起请求
				uni.$http.get("/search/default").then((res) => {
					let {
						data,
						code
					} = res.data;
					// 如果数据获取成功
					if (code == 200) {
						this.defaultPlaceHolder = data.showKeyword;
					}
				})
			},
			// 添加更多热搜
			addMoreHot() {
				this.hotList = [...this.hotList, ...this.moreHotList];
			},
			// 点击搜索实现跳转
			searchAndNavTo(val) {
				// 跳转页面
				uni.switchTab({
					url:"../video/video?key="+val.value
				});
				// 记录搜索历史
				// 获取当前历史记录
				let cur = uni.getStorageSync("searchHistory") || [];
				cur.unshift(val.value)
				let newHistory = Array.from(new Set(cur));
				uni.setStorageSync("searchHistory", newHistory);
			},
			clearHistory() {
				this.searchHistory = [];
				uni.setStorageSync('searchHistory', [])
			}
		}
	}
</script>

<style lang="scss">
	.hot-title {
		padding-bottom: 10rpx;
		border-bottom: 1px solid #ddd;
		image {
			margin-left: 20rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}
	
	.hot-content {
		display: flex;
		flex-wrap: wrap;
	}
	
	.hot-item {
		width: 50%;
		line-height: 80rpx;
		text {
			margin: 0 20rpx;
		}
		image {
			width:50rpx;
			height: 20rpx;
		}
	}
	.blodfont {
		font-weight: 700;
	}
	.color-red {
		color: red;
	}
	.show-more-hot {
		border: 1px solid #333;
		color: #999;
		font-size: 22rpx;
		text-align: center;
	}
	/* 搜索历史 start */
	.history {
		padding: 0 30rpx;
	}
	.history-content {
		display: flex;
		margin: 30rpx 0;
	}
	.history-item {
		margin: 0 10rpx;
	}
	/* 搜索历史 end */
</style>
