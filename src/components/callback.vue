<template>
  <div class="callback">
    <van-nav-bar
          :title=sign
          left-text="返回"
          fixed
          left-arrow
          @click-left="onClickLeft"
          placeholder 
    />

    <div class="message">
      <div class="mesg">
      {{username}}   {{sign}}成功!
      <br/>
      {{nowTimer}}
      </div>
       <p class="timer" v-show = isShow >{{msg}}小时</p>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username:"",
      nowTimer:"",
      sign:'',
      msg:'',
      isShow:false
    }
  },
  created() {
    this.getUsermessage()
  },
  methods: {
    onClickLeft(){
      this.$router.push({path:'/home'})
    },
    getUsermessage(){
      let userObj = JSON.parse(localStorage.getItem("userObj"))//用户对象 
      this.username = userObj.name
      let time = new Date();
      this.nowTimer = time.toLocaleTimeString()//获取当前时间
      let clickSign = sessionStorage.getItem("click")
      if(clickSign === "1"){
        this.sign = "签到"
        this.isShow = false
      }else if(clickSign === "2"){
        this.sign = "签退"
        this.msg = sessionStorage.getItem("timerlonger")
        this.isShow = true
      }
    }
  },
}
</script>
<style scoped>
p{
  font-size: 16px !important;
  color: grey !important;
}
  .timer{
    line-height: 30px;
    font-size: 18px;
    color: #6b9fafb3;
  }
  .mesg{
    line-height: 30px;
    font-size: 18px;
    color: #36a152;
  }
 
  .message{
    
    text-align: center;
    margin-top: 50%;
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