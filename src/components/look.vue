<template>
    <div class="wrap">
     <el-table
     class='table'
    :data="tableData"
    stripe
    border
    height = "600"
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="80">
    </el-table-column>
    <el-table-column
      prop="mon"
      label="周一"
      width="50">
    </el-table-column>
    <el-table-column
      prop="tues"
      label="周二"
      width="50">
    </el-table-column>
    <el-table-column
      prop="wed"
      label="周三"
      width="50">
    </el-table-column>
    <el-table-column
      prop="thur"
      label="周四"
      width="50">
    </el-table-column>
    <el-table-column
      prop="fri"
      label="周五"
      width="50">
    </el-table-column>
    <el-table-column
      prop="sat"
      label="周六"
      width="50">
    </el-table-column>
    <el-table-column
      prop="sun"
      label="周日"
      width="50">
    </el-table-column>

  </el-table></div>
</template>
<script>
export default {
    data(){
        return {
        tableData: []
        }
    },
    async created(){
         const { data } = await this.$axios.get(`/getAllUserTimer?type="2"`);
         this.tableData = data.data
    }
}
</script>
<style scoped>
.table{
    margin-top: 20px;
}
.wrap{
    /* height: 100%; */
}
</style>