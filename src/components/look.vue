<template>
    <div class="wrap">
     <el-table
     ref="filterTable"
     class='table'
    :data="tableData"
    stripe
    border
    height = "800"
    style="width: 100%">
    <el-table-column
      prop="class"
      label="教室"
      column-key="class"
      :filters="filterData"
      :filter-method="filterHandler"
      :filter-multiple = false
      width="80"
    >
    </el-table-column>
    <el-table-column
      prop="NAME"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="mon"
      label="周一"
      width="57">
    </el-table-column>
    <el-table-column
      prop="tues"
      label="周二"
      width="57">
    </el-table-column>
    <el-table-column
      prop="wed"
      label="周三"
      width="57">
    </el-table-column>
    <el-table-column
      prop="thur"
      label="周四"
      width="57">
    </el-table-column>
    <el-table-column
      prop="fri"
      label="周五"
      width="57">
    </el-table-column>
    <el-table-column
      prop="sat"
      label="周六"
      width="57">
    </el-table-column>
    <el-table-column
      prop="sun"
      label="周日"
      width="57">
    </el-table-column>

  </el-table></div>
</template>
<script>
export default {
    data(){
        return {
        tableData: [],
        filterData:[],
        data: [],
        dataAll:[]
        }
    },
    async created(){
         const { data } = await this.$axios.get(`/getQRClass`);
         let filter = localStorage.getItem("filter")
         this.tableData =  data.data
        this.getfilterArray()
    },
    methods: {
      filterHandler(value, row, column,type=0) {
        if(!localStorage.getItem("filter") || localStorage.getItem("filter") !== value){
          localStorage.setItem("filter",value)
        }
         let property = column['property'];

          return row[property] === value
        
      },  
      getfilterArray(){

        // "[{text: '103', value: '103'}, {text: '102', value: '102'}]"
        var obj = {}
        this.tableData.forEach((i)=>{
          if(!obj[i.class]){
            obj[i.class] = i.class
          }
        });
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            // let obj2 = {text:${key},value:${key}`}
            this.filterData.push({'text':key,'value':key})  
            
          }
        }
        console.log(this.filterData)  

      }

    },
}
</script>
<style scoped>
.table{
    margin-top: 20px;
    margin-bottom: 50px;
}
.wrap{
}
</style>