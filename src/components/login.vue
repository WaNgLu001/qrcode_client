<template>
  <div class="loginBac">
 
      
        <div class="toptext">
          
          <p class="p1">扫码签到</p>
          <p class="p2">欢迎使用双体系开发中心签到软件，请在这里正确的填写您的个人信息</p>
        </div>
     <div class="inputdiv">
         <div class="inputtext">
            <el-form :model="ruleForm" :rules="loginRules" >
              <el-form-item prop="Uname" >
                <el-input class="input" v-model="ruleForm.Uname" placeholder="姓名"></el-input>
              </el-form-item>
              <br>
              <el-form-item prop="Uclass">
                <el-input class="input" v-model="ruleForm.Uclass" placeholder="班级"></el-input>
              </el-form-item>
              <br>
              <el-form-item prop="Unum">
              <el-input class="input" type="number" v-model="ruleForm.Unum" placeholder="学号"></el-input>
              </el-form-item>
            </el-form>
         </div>     
      </div>
      <div style="text-align:center">
      <div class="btn">
        <van-button round type="info" size="large" color="#3ea1e8" @click="submit">点 击 提 交</van-button>
      </div>
      </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      classname:'',
      uid:'',
      mac:'',
      ruleForm: {
          Uname: '',
          Uclass:"",
          Unum:'' 
          },
      loginRules: {
          Uname: [
            { required: true, message: '请输入您的名字', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          Uclass: [
            { required: true, message: '请输入您的班级', trigger: 'blur' },
            { min: 5, max: 7, message: '长度在 5 到 7 个字符', trigger: 'blur' }
          ],
          Unum: [
            { required: true, message: '请输入正确的学号', trigger: 'blur' },
            { min: 10, max: 10, message: '长度10个字符', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
   
    submit(){
     this.getUUID()

     this.username = this.ruleForm.Uname
     this.classname = this.ruleForm.Uclass
     this.uid = this.ruleForm.Unum
 
     this.getUserMessage()  
    },
    async getUserMessage(){
      
      if(this.ruleForm.Uname != "" && this.ruleForm.Uclass != "" &&this.ruleForm.Unum != ""){
        const { data } = await this.$axios.post("/addQRuser",{uid:this.uid,name:this.username,classname:this.classname,mac:this.mac,type:"1"})
        if(data.status === 0){
        localStorage.setItem("admin","admin")
        var obj = {
          name:this.username,
          uid:this.uid,
          classname:this.classname,
          mac:this.mac
        }
        var str = JSON.stringify(obj)
        localStorage.setItem("userObj",str)

        this.$Toast.success(data.msg)
        this.$router.push({path:'/home'})
        }else {
          this.$Toast.fail(data.msg)
        }

      }else{
        this.$Toast.fail("请完善信息以后再进行提交")
      }
        
    } ,
    getUUID(){
       this.mac =  plus.device.uuid
    }
  },
  created() {

  },
}
</script>
<style scoped>
  /deep/.el-form-item__error{
    left: 40px !important;
  }
  .p1{
    font-size: 40px;
    font-weight: bold;
    color:#3ea1e8

  }
  .p2{
    margin:30px 55px;
    color: #ecb133cc;
  }
  .toptext{
    padding-top: 70px;
    padding-bottom: 20px;
  }
  /deep/.el-input__inner{
    border-radius:35px !important;
    height: 50px;
    text-align: center;
    font-size: 17px;
    /* margin-top: 20px; */
  }
  .text{
   font-size: 20px;
  }
  .input {
    width: 320px;
    border-radius: 25px;
  }
  .btn{
    padding-top: 45px;
    width: 50%;
    display:block;
    margin:0 auto;
  }
  .van-cell{
    font-size: 18px;
    /* padding-top: -10px; */
    text-align: center;
  }
  .inputtext{
    text-align: center;
  }
  .loginBac{
        
        width: 100%;
        height: 100%;
        /* background-color: aquamarine; */
        text-align: center;
			  /* background-image: linear-gradient(to bottom, #276678,#991010ab); */
        background-size: 100% 100%;
  } 
 


  
  
</style>