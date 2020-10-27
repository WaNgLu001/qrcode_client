<template>
    <div class="wrap">
    
     <el-table
     ref="filterTable"
     class='table'
    :data="tableData"
    stripe
    border
    height = "800"
    @row-click="rowClick"
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
      width="80"
      label="姓名"
      >
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

  </el-table>
    <van-popup v-model="show" position="bottom" :overlay="overlay" :style="{ height: '40%',opacity:opacity }">
    <div class="EchartPractice" >
    <div id="main" ref="chart"></div>
    </div>
    </van-popup>
  </div>
</template>
<script>
export default {
    data(){
        return {
        tableData: [],
        filterData:[],
        data: [],
        dataAll:[],
        persondata:[],
        show: false,
        name:'',
        mon:'',
        tues:'',
        wed:'',
        thur:'',
        fri:'',
        sat:'',
        sun:'',
        total:0,
        overlay:false,
        opacity:0
        }
    },
    async created(){
         const { data } = await this.$axios.get(`/getQRClass`);
         let filter = localStorage.getItem("filter")
         this.tableData =  data.data
          this.getfilterArray()
    },
    methods: {
      drawChart() {
        var bar_dv = this.$refs.chart;
         
        if (bar_dv){
        let myChart = this.$echarts.init(main)
        let option = {
          title:{
            text:this.name+" 本周签到时长:"+this.total
          },
          tooltip:{},
          
          xAxis:{
            data: ["周一","周二","周三","周四","周五","周六","周日"]
          },
          yAxis:{
            type: 'value'
          },
          series:[{
            name:'销量',
            type:"line",
            data:this.persondata
          }
          ]
        };
       
        myChart.setOption(option);
      }}
      ,
      rowClick(row){
        this.show = true;
        let thisrowData = this
        thisrowData = row
        this.name = thisrowData.NAME
        this.persondata = [thisrowData.mon,thisrowData.tues,thisrowData.wed,thisrowData.thur,thisrowData.fri,thisrowData.sat,thisrowData.sun]
        
        this.persondata.forEach((i) => {         
          this.total+=parseFloat(i)
        })
        
        this.drawChart();
        this.total = 0
      },
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
            this.filterData.push({'text':key,'value':key})     
          }
        }

      }

    },
    mounted() {
      
    this.show = true;
    setTimeout(()=>{
        this.show = false;
        this.opacity =1
        this.overlay = true
    },)
  }
}
</script>
<style scoped>
.table{
    margin-top: 20px;
    margin-bottom: 50px;
}
.wrap{
}
#main {
    width: 350px;
    height:250px;
    margin: auto;
    margin-top: 20px
  }
</style>