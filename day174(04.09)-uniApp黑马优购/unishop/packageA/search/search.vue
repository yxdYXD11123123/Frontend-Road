<template>
	<!-- 搜索页 -->
	<view>
		<!-- 搜索框 start -->
		<view class="search-box">
			<!-- 给searchBar添加自定义属性boxBgColor控制组件背景 -->
			<uni-search-bar :radius="100" :autoFocus="true" boxBgColor="#c00000" cancelButton="none"
				@input="inputSearch"></uni-search-bar>
		</view>
		<!-- 搜索框 end -->

		<!-- 搜索历史 start -->
		<view class="search-history" v-if="searchResult.length==0">
			<view class="search-history-title">
				<text>搜索历史</text>
				<!-- 清除搜索历史 -->
				<uni-icons type="trash" :size="18" @click="clearSearchHistory"></uni-icons>
			</view>
			<!-- 搜索历史记录 推荐词 -->
			<view class="search-history-content">
				<!-- 给uni-tag里添加自定义属性nobg，将其没有背景色 -->
				<uni-tag :text="item" v-for="(item,index) in searchHistory" :key="index" nobg="true"
					@click="navToGoodsList(item)"></uni-tag>
			</view>
		</view>
		<!-- 搜索历史 end -->

		<!-- 搜索结果列表 start -->
		<view class="search-result">
			<navigator v-for="(item, index) in searchResult" :key="item.goods_id"
				:url="'/packageA/goods_detail/goods_detail?goods_id='+item.goods_id">
				<text>{{item.goods_name}}</text>
				<uni-icons type="arrowright"></uni-icons>
			</navigator>
		</view>
		<!-- 搜索结果列表 end -->
	</view>
</template>

<script>
	// 导入获取数据的方法
	import {
		getDatasAndSave
	} from "../../utils/getDatasAndSave.js";

	export default {
		data() {
			return {
				// 搜索关键字
				keyWords: "",
				// 记录定时器编号
				timer: null,
				// 搜索结果列表
				searchResult: [],
				// 搜索的历史记录
				searchHistory: []
			};
		},
		// 页面加载时
		onLoad() {
			// 从本地取搜索历史记录
			this.searchHistory = uni.getStorageSync('searchHistory') || [];
		},
		methods: {
			/**
			 * 输入搜索关键字
			 * @param {Object} e
			 */
			inputSearch(e) {
				// 防抖处理
				// 清楚上次用来赋值的定时器，取消赋值
				clearTimeout(this.timer);
				// 启动一个新的定时器，准备赋值
				this.timer = setTimeout(() => {
					// 500ms后，用户暂停输入时，进行赋值keyWords
					this.keyWords = e.value;
					this.getSearchResult();
				}, 500)
			},
			/**
			 * 获取搜索结果
			 */
			getSearchResult() {
				// 判断关键字是否为空
				if (this.keyWords.trim().length == 0) {
					// 没有输入内容时，清空搜索结果列表
					return this.searchResult = [];
				};
				// 发请求
				getDatasAndSave('/api/public/v1/goods/qsearch?query=' + this.keyWords, this, "searchResult", () => {
					// 搜索成功后，将本次关键字添加到数组前
					this.searchHistory.unshift(this.keyWords);
					// 去重
					this.searchHistory = Array.from(new Set(this.searchHistory));
					// 记录到本地 
					uni.setStorageSync("searchHistory", this.searchHistory);
				});
			},
			/**
			 * 清除历史搜索记录
			 */
			clearSearchHistory() {
				// 清空
				this.searchHistory = [];
				// 记录到本地
				uni.setStorageSync("searchHistory", this.searchHistory);
			},
			/**
			 * 跳转到商品列表
			 * @param {Object} keywords 关键字
			 */
			navToGoodsList(keywords) {
				uni.navigateTo({
					url: '../goods_list/goods_list?query=' + keywords
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 搜索历史 start */
	.search-history-title {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		line-height: 70rpx;
		padding: 0px 10rpx 0px;
	}

	.search-history-content {
		display: flex;
		flex-wrap: wrap;
		border-top: 1px solid #f6f6f6;
		margin: 0px 20rpx 0px;

		.uni-tag {
			margin: 0 10rpx;
		}
	}

	/* 搜索历史 end */

	/* 搜索结果列表 start */
	.search-result navigator {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0px 12rpx;
		line-height: 87rpx;
		font-size: 25rpx;
		border-bottom: 1px solid #f5f5f5;

		text {
			flex: 1;
			margin-right: 10rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	/* 搜索结果列表 start */
</style>
