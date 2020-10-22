<template>
   <div class="scan">
     <div class="topbar">
        <div class="left" @click="onClickLeft">
          <span class="j"><</span>
          <span class="f">返回</span>
        </div>
        <span class="title">二维码</span>
     </div>
    <div id="bcid">
      <div style="90%"></div>
    </div>
  </div>
</template>
<script>
 let scan = null;
export default {
 data() {
   return {
      codeUrl: '',
      Result:'',
      stunum:''
   }
 },
 mounted() {
   this.startRecognize()
   this.startScan()
 },
 methods: {
      //签到
      async QRSign() {
          const  {data}  = await this.$axios.get(`/QRSign?uid=${this.stunum}`);
          if(data.status === 0){
              this.$router.push({path:'/callback'})
          }else if(data.status === 1){
            this.$Toast.fail("请勿重复签到！")
            this.$router.push({path:'/home'})
          }else if(data.status === 3){
            this.$Toast.fail("学号不存在，请注册后再进行签到")
            localStorage.removeItem("admin")
            localStorage.removeItem("userObj")
            this.$router.push({path:'/'})
          }
        
    },
      //签退
        async QRSignOut() {
          
        const  {data}  = await this.$axios.get(`/QRSignOut?uid=${this.stunum}`);
        var datamsg = data.msg

        if(data.status === 0){
           this.$Toast.success(`${data.msg}小时`)
           sessionStorage.setItem("timerlonger",data.msg)
            this.$router.push({path:'/callback'}) 
          }else if(data.status === 3){
            this.$Toast.fail("学号不存在，请注册后再进行签到")
            this.$router.push({path:'/home'})
          }else if(data.status === 4){
           this.$Toast.fail("请先签到，再签退")
          this.$router.push({path:'/home'})
          }
    },
      //创建扫描控件
      startRecognize() {
        let that = this;
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid');
       scan.setStyle({background:"green"})

      var onmarked = (type, result, file)=>{
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
          result = result.replace(/\n/g, '');
         if(result.length != 36){
           this.$Toast.fail("请扫描正确的签到二维码!")
            this.$router.push({path:'/home'})
            this.cancelScan()
            this.closeScan()
            return 
         }
          
          var resultObj = JSON.parse(result)//扫码结果对象
          var userObj = JSON.parse(localStorage.getItem("userObj"))//用户对象 
          this.stunum = userObj.uid
          var resultTimer = Date.now()-resultObj.timer//时间差
        
            if(resultTimer>4000){
              //二维码失效
              this.$Toast.fail("二维码已失效，请重新扫码!")
              this.$router.push({path:'/QRfail'})
            }else if(resultTimer<4000){
              let clickValue = sessionStorage.getItem("click")
              if(clickValue === "1"){//签到
                this.QRSign()
              }else if(clickValue === "2"){//签退
                this.QRSignOut()
              }
              //  this.$router.push({path:'/home'})
            
          }
          
          that.closeScan();
        }
         scan.onmarked = onmarked;
      },
      //开始扫描
      startScan() {
        if (!window.plus) return;
        scan.start();
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return;
        scan.cancel();
      },
      //关闭条码识别控件
      closeScan() {
        if (!window.plus) return;
        scan.close();
      },
      onClickLeft() {
       this.$router.push({path:'/home'})
       this.cancelScan()
       this.closeScan()
    },
 },

}
</script>
<style scoped>
.title{
  padding-right: 52px;
}
.f{
  font-size: 15px;
  padding-left: 3px;
 padding-top: -5px;
}
.left{
  float: left;
  margin-left: 12px;
}

  .topbar{
    position: relative;
    width: 100%;
    height: 46px;
    background-color: black;
    z-index: 999;
    text-align: center;
    line-height: 46px;
    color: honeydew;
  }
  .scan {
    height: 100%;
     background-color: black;
   
  }
  /deep/.van-nav-bar__title{
    color:white !important;
  }
  /deep/.van-nav-bar{
    background-color: black ;
  }
   /deep/.van-nav-bar__text {
    color: white !important;
  }
   /deep/.van-nav-bar .van-icon{
      color: white !important;
  }
   #bcid {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: -2px;
      bottom:3rem;
      text-align: center;
      color: #fff;
      background: black;
      padding-top: 46px;
    }
</style>