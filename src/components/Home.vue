<template>
  <div class="HomeWrap">
    <div class="header">
      <img ref="image" src="../assets/rzqd.png" alt="签到" />
    </div>
    <div class="button">
      <!-- <div class="register" @click="test"> -->
        <div class="register" @click="register">
        <div class="icon">
          <img class="sign" src="../assets/sign.png" alt="" />
        </div>
        <div class="text">签到</div>
      </div>
      <div class="signOut" @click="signOut">
        <div class="icon">
          <img class="sign" src="../assets/signOut.png" alt="" />
        </div>
        <div class="text">签退</div>

      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const signOut = require('../assets/signOut.png')
    const sign = require('../assets/sign.png')
    return { 
      data: signOut, sign,
      successMsg:'' 
      }
    
  },
  methods: {
   
    // 签到的点击事件
    register() {
      sessionStorage.setItem("click","1")
      this.$router.push({path:'/saoma'})
    },
    // 签退的点击事件
    signOut() {
       sessionStorage.setItem("click","2")
       this.$router.push({path:'/saoma'})
    },
   

  }
}
</script>

<style lang="less" scoped>
.img {
  position: absolute;
  left: 0;
  top: 50px;
  width: 50px;
  height: 50px;
}
.header img {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 50px;
}
.register,
.signOut {
  height: 100px;
  margin: 0 20px;
  background-color: rgb(120, 199, 255);
  margin-bottom: 70px;
  border-radius: 30px;
  display: flex;
  box-shadow: 0 0 15px #aaa;
}
.icon {
  width: 100px;
}
.text {
  width: 225px;
  text-align: left;
  margin-left: 40px;
  font: 30px/100px '微软雅黑';
  color: white;
}
.sign {
  width: 70px;
  height: 70px;
  margin: 15px auto;
  display: block;
}
/* #canvas{
  display: none;
} */
</style>
