<template>
	<view class="my">
		<!-- 个人信息页 start -->
		<my-userinfo v-if="token"/>
		<!-- 个人信息页 end -->
		
		<!-- 登录页 start -->
		<my-login v-else />
		<!-- 登录页 end -->
	</view>
</template>

<script>
	// 导入购物车混入
	import mixinCart from "../../mixins/mixinCart.js";
	
	// 导入映射方法
	import {mapState} from "vuex";
	
	export default {
		mixins: [mixinCart],
		computed: {
			...mapState('storeUserInfo', ['token']),
		}
	}
</script>

<style lang="scss">
	page,
	.my {
		height: 100%;
	}
</style>
