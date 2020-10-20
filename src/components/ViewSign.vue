<template>    
    <div class="wrap">
        <div class="one">
            <span class="className" @click="ViewSignRecords('kfzx')">开发中心</span>
        </div>
        <div class="one">
             <span class="className" @click="ViewSignRecords('102')" >102教室</span>
        </div>
        <div class="one">
             <span class="className"  @click="ViewSignRecords('103')" >103教室</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    },
    methods:{
        // 查看对应教室人员信息
        ViewSignRecords(type){
            this.$router.push('/look/'+type)
        }
    }
}
</script>
<style scoped>
.wrap{
    height: 100%;
}
.one{
  height: 120px;
  margin: 0 20px;
  background-color: rgb(83, 173, 236);
  margin-bottom: 70px;
  border-radius: 30px;
  margin-top: 60px;
  display: flex;
  box-shadow: 0 0 15px #aaa;   
}
.className{
    text-align: center;
    font: 30px/120px '微软雅黑';
    color: white;
    margin: 0 auto;
}
</style>