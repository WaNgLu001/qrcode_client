<template>
<div>
      <van-nav-bar :title="title" />
    <router-view></router-view>
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item  icon="home-o" to="/Home">
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item  icon="bar-chart-o" to="/look"
        ><span>查看</span>
      </van-tabbar-item>
    </van-tabbar>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: '首页',
      active: 0,
      icon: {
        active: './assets/home.png',
        inactive: './assets/home_select.png'
      }
    }
  },
  methods: {
    change(index) {
      if (!index) {
        this.title = '首页'
      } else {
        this.title = '查看'
      }
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
}
.van-nav-bar {
  background-color: #3ea1e8;
}
</style>
