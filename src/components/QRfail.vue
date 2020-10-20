<template>
  <div text-align = "center">
     <van-nav-bar
          title="警告"
          left-text="返回"
          fixed
          left-arrow
          @click-left="onClickLeft"
          placeholder 
    />

    <div class="message">
      <div class="mesg">
     <p class="p1">二维码已失效</p>
     <p>请返回首页重新扫码</p>

    </div>  
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowtimer:''
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push({path:'/home'})
    }
   
  }
}
</script>
<style scoped>
.p1{
  color: #2d9c51;
}
  p{
    font-size: 18px;
  }
  .mesg{
    line-height: 30px;
    font-size: 18px;
    color: grey;
  }
  .btn{
    margin-top: 40px;
  }
  .message{
    
    text-align: center;
    margin-top: 52%;
  }
   /deep/.van-nav-bar {
  background-color: #3ea1e8;
}
  
   /deep/.van-nav-bar__text {
    color: #fff !important;
  }
   /deep/.van-nav-bar .van-icon{
      color: #fff !important;
  }
</style>