<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">One</router-link> |
      <router-link to="/two">Two</router-link>|
      <router-link to="/three">Three</router-link>
    </div>
		<transition :name="transitionName">
			<router-view class="view"></router-view>
		</transition>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data(){
			return {
				transitionName: ''
			}
    },
    watch: {
      $route(to, from) {
        // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index != from.meta.index){
  	    	// 设置动画名称
          this.transitionName = 'slide-left';
        }
      }
    }
  }
</script>
<style scoped="scoped" >
 	.view {
  	width: 100%;
	  position: absolute;
	}
	
	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
	  will-change: transform;
	  transition: all 250ms;
	  position: absolute;
	}

	.slide-right-enter {
	  opacity: 0;
	  transform: translate3d(-100%, 0, 0);
	}

	.slide-right-leave-active {
	  opacity: 0;
	  transform: translate3d(100%, 0, 0);
	}

	.slide-left-enter {
	  opacity: 0;
	  transform: translate3d(100%, 0, 0);
	}

	.slide-left-leave-active {
	  opacity: 0;
	  transform: translate3d(-100%, 0, 0);
	}
</style>
