<template>
          <div>

            <h1 class='h1_title' > 
              Diseases related to Erythroid  Differentiation and Development
            </h1>
          
            <Row>
              <h2 class='h2_title' > {{ current_cellname }} </h2>
              <span>
                {{current_cell_anno}}
              </span>
            </Row>
            
            <div id="cell_type_show_view" style="width:100%;height:300%; text-aglign:center">
              
              fff
            </div>
         
          
          <!-- 用表格展示 根据细胞分析搜索的数据集 -->
          </br>  
          </br>  
          </br>  
          </br> 
          </br> 
          <Row>
            <h1 class='h1_title' >Datasets Related to  {{cell_name}}
              <!-- <i-button  shape="circle" icon="ios-search" @click="changedCompundsType"></i-button> -->
              <!-- <i-button class="my_reset_button"  shape="circle"  @click="resetCellType">Reset</i-button> -->
              <Button type="primary"  @click="resetCellType" >Reset</Button>
            </h1>
            <!-- <Col span='12'>
                    <i-select :model.sync="cell_name" placeholder="Select cell source" clearable style="width:80%" @on-change='changedCellType'>
                      <i-option v-for="(source,index) in cell_type_list" :key='index' :value="source.name">{{ source.name }}</i-option>
                    </i-select>
                    <!-- <i-button class='button_style' type="primary" icon="ios-search" @click="sdataSetByCellName($event)"></i-button>
            </Col>  -->

          </Row>
          </br>  
          <div> 
            <!-- dataset 展示页 FilterTableForAllDateSet -->
            
            <FilterTableForAllDateSet 
                  :model.sync="search"
                  :v-model="search"
                  @on-search="onSearch_datasetTypeSource"
                  :data="datasetsTypeSource"
                  :columns="tAdatasetTypeSourceColumns">
            </FilterTableForAllDateSet>
            <!-- <Spin size="large" fix v-if="spinShowTypeSource"></Spin> -->
              
            <div style="margin: 10px;overflow: hidden">               
                  <div style="float: right;">
                      <Page :total="totalTypeSource"  
                      :current="currentPageTypeSource" 
                      :page-size="pageSizeTypeSource" 
                      show-total
                      show-sizer
                      @on-change="handleCurrentChangeTypeSource" 
                      @on-page-size-change="handleSizeChangeTypeSource">
                      </Page>                   
                  </div>
            </div>
          </div> 
        
        </br>
       
        <Row>
          <!-- <Col style="text-align: center"> 
              <h1> Get research datasets by the custom query
                
              </h1>
              
          </Col>   -->
          </br>
          <!-- <div>
            <!-- dataset 展示页  
              <filter-table 
                  
                    @on-search="onSearch"
                    :data="datasets"
                    :columns="tableColumns">
                    
              </filter-table>
              <Spin size="large" fix v-if="spinShow"></Spin>
          </div>         -->
          <!-- <div style="margin: 10px;overflow: hidden">               
                <div style="float: right;">
                    <Page :total="total"  
                    :current="currentPage" 
                    :page-size="pageSize" 
                    show-elevator 
                    show-total
                    show-sizer
                    @on-change="handleCurrentChange" 
                    @on-page-size-change="handleSizeChange">
                    </Page>                   
                </div>
          </div>          -->
        </Row>
        <Row >
          <router-view/>
        </Row>
    </div>
    
    
    
    
</template>


<script>

import { getDataset,getDatasetTypeSourceByDiseaseType,getDatasetTypeSource,searchDataset,searchDatasetTypeSource } from '@/api/erythdataset'
import FilterTableForAllDateSet from '../compnents/FilterTableForAllDateSet';

const sample_numbers = {
    0: {
      value: "1-10",
      name: '1-10'
    },
    1: {
      value: "10-20",
      name: '10-20',
      // color: 'red'
    },
    2: {
      value: "20-30",
      name: '20-30',
      // color: 'green'
    },
    3: {
      value: "30-50",
      name: '30-50',
      // color: 'green'
    },
    4: {
      value: ">50",
      name: '>50',
      // color: 'green'
    },
    5: {
      value: "all",
      name: 'All',
      // color: 'green'
    },

  };

const cell_numbers = {
    0: {
      value: "1-1000",
      name: '1-1,000'
    },
    1: {
      value: "1000-10000",
      name: '1,000-10,000',
      // color: 'red'
    },
    3: {
      value: "10000-20000",
      name: '10,000-20,000',
      // color: 'green'
    },
    4: {
      value: ">10000",
      name: '>10,000',
      // color: 'green'
    },
    5: {
      value: "all",
      name: 'All',
      // color: 'green'
    },

};


const species_type = {
    0: {
      value: "Homo",
      name: 'Homo sapiens'
    },
    1: {
      value: "Mus",
      name: 'Mus musculus',
      // color: 'red'
    },
    2: {
      value: "Danio",
      name: 'Danio rerio',
      // color: 'green'
    },
    3: {
      value: "all",
      name: 'All',
      // color: 'green'
    },
    
  }


  const source_type = {
    0: {
      value: "Marrow",
      name: 'Bone Marrow'
    },
    1: {
      value: "Cord",
      name: 'Cord Blood',
      // color: 'red'
    },
    2: {
      value: "Peripheral",
      name: 'Peripheral Blood',
      // color: 'green'
    },
    3: {
      value: "Spleen",
      name: 'Spleen',
      // color: 'green'
    },
  
    4: {
      value: "Line",
      name: 'Cell Line',
      // color: 'green'
    },

    5:{
      value:'Embryo',
      name:'Embryo'
    },
    6:{

      value:'Embryonic',
      name:'Fetus Tissue '
    },

    7:{
      value:'Pluripotent',
      name:'Induced Pluripotent Stem Cells(iPSC)'
    },
   
    8:{
      value: "Heart",
      name: 'Heart',
      // color: 'green'
    },

    9:{
      value: "Kidney",
      name: 'Kidney',
      // color: 'green'
    },

    10:{
      value: "other",
      name: 'Other',
      // color: 'green'
    },

    11: {
      value: "all",
      name: 'All',
      // color: 'green'
    },

  }


const growth_type ={
   0: {
      value: "vitro",
      name: 'In vitro'
    },
    1: {
      value: "vivo",
      name: 'In vivo',
      // color: 'red'
    },
    3: {
      value: "all",
      name: 'All',
      // color: 'green'
    },
}

const development_type ={
    0: {
        value: "BM_vitro",
        name: 'BM_vitro'
      },
    1: {
      value: "CL_vitro",
      name: 'CL_vitro'
    },
    2: {
      value: "EMFL_vitro",
      name: 'EMFL_vitro'
    },
    
    3: {
      value: "PB_vitro",
      name: 'PB_vitro'
    },
    4:{
      value:'EM_vitro',
      name:'EM_vitro'
    },
    
    5:{
          value:'CB_vitro',
          name:'CB_vitro'
    },

    6:{
      value:'SP_vitro',
      name:'SP_vitro'
    },
    8:{
      value:'iPSC_vitro',
      name:'iPSC_vitro',
    },



    9: {
      value: "BM_vivo",
      name: 'BM_vivo',
      // color: 'red'
    },
    10:{
      value:'CB_vivo',
      name:'CB_vivo',
    },
    
    11:{
      value:'PB_vivo',
      name:'PB_vivo',
    },

    12:{
      value:'CP_vivo',
      name:'CP_vivo',
    },
    13:{
      value:'EMFL_vivo',
      name:'EMFL_vivo'
    },
    14:{
      value:'EM_vivo',
      name:'EM_vivo',
    },

    15:{
      value:'SP_vivo',
      name:'SP_vivo',
    },

    16:{
      value:'EMYS_vivo',
      name:'EMYS_vivo'
    },
    16:{
      value:'EMCH_vivo',
      name:'EMCH_vivo'
    },

    17: {
      value: "all",
      name: 'All',
      // color: 'green'
    },
  
}

const experiment_type = {
  0:{
    name:'Expression profiling by high throughput sequencing',
    value:'Expression'
  },
  1:{
    name:'All',
    value:'all'
  }
}

const sequence_type ={
  0:{

    name:'Bulk RNA-seq',
    value:'Bulk'
  },
  1:{
    name:'scRNA-seq',
    value:'scRNA'
  },
  2: {
      value: "all",
      name: 'All',
      // color: 'green'
    },
  
}



export default {
    name:"disease",
    components: {FilterTableForAllDateSet},
    data(){
      return {
        cell_type_list:[

           {'name':'Haemolysis',
                'full_name':'Haemolysis',
                'cell_ano':''},
              {'name':'Diamond-Blackfan anemia',
                'full_name':'Diamond-Blackfan anemia',
                'cell_ano':''},
              {'name':'Epo-resistant anemia',
                'full_name':'Epo-resistant anemia',
                'cell_ano':' '},
              {'name':'Hemoglobinopathies',
              'full_name':'Hemoglobinopathies',
              'cell_ano':''},
        ],
        search:'',
        current_cellname:'Diamond-Blackfan anemia',
        current_cell_anno:'',
        table_name:'all_dataset_source_type',
        spinShow:true,
        spinShowTypeSource:true,
        currentPage: 1,
        currentPageTypeSource:1,
        pageSize: 10,
        pageSizeTypeSource:10,
        cell_name:'All',
        total: 400,
        totalTypeSource:400,
        datasets: [],
        datasetsTypeSource:[],
        datasetname :'Development',
        tAdatasetTypeSourceColumns:[
          {
            title: 'Dataset',
            key: 'dataset_id',
            filter: {
              type: 'Input'
            },
            fixed: 'left',
            // render: (h, params) => {            
            //   if (params.row.dataset_id.indexOf("GSE") > -1){
            //       return h('div', [
            //       h('a', {                               
            //             attrs:{                              
            //               href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset_id,
            //               target:'_blank',  
            //             },    
            //         },params.row.dataset_id)
            //       ])
            //   }else{
            //     return h('div',params.row.dataset_id)
              
            //   }     

            //   // return h('div', [
            //   //   h('a', {                               
            //   //         attrs:{                              
            //   //           href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset_id

            //   //         },    
            //   //     },params.row.dataset_id)
            //   //   ])

            // }
          },
          //organism
          {
            title: 'Species',
            key: 'organism',
            filter: {
              type: 'Select',
              option: species_type
            },
            className:'table_Orga'

          },
          {
              title: 'Tissue',//来源 dataset 里的source
              key: 'source',
              // "sortable": true,
              filter: {
                type: 'Select',
                option:source_type
              }
          },

          {
              title: 'Experiment type',
              key: 'growth_mode',
              width:'120',
              filter: {
                  type: 'Select',
                  option: growth_type
              },
              className:'table_Orga'
          },
          // {
          //     title: 'Development Type',
          //     key: 'development_type',
          //    width:'130',
          //     filter: {
          //         type: 'Select',
          //         option: development_type
          //     },
          // },
        
          {
            title: 'Title',
            key: 'title',
            filter: {
              type: 'Input'
            }

          },
          // {
          //   title: 'Omics Data Type',
          //   key: 'experiment_type',
          //   width:'120',
          //   filter: {
          //         type: 'Select',
          //         option: experiment_type
          //     },
          // },
          {
            title: 'Omics type',
            key: 'sequence_type',
            width:'125',
            filter: {
                type: 'Select',
                option: sequence_type
            },
          },
          {
            title: 'Sample number',
            key: 'sample_number',
            width:'90',
            filter: {
              type: 'Select',
              option: sample_numbers
            },
          },
          {
            title: 'Cell number',
            key: 'cell_number',
            width:'90',
            filter: {
              type: 'Select',
              option: cell_numbers
            },
          },

        ],
        datasetFilter:{},
      }

    },
    methods:{
      searchDatasetByFilter(searchTypeSource){

      var _this = this
      searchDatasetTypeSource(searchTypeSource, _this.currentPageTypeSource,_this.pageSizeTypeSource,_this.cell_name,'disease').then( res=>{
          
          _this.spinShowTypeSource = false                    
          let datas = res.data
          if (datas.signal === 0){
            // 0 表示无相关数据
            this.$Message.info('No related datasets',15);

          }else{
            _this.datasetsTypeSource = datas.list                  
            _this.totalTypeSource = datas.total;
          }
          
      })

      },
     
      mockTableData () {
        var _this = this;      
        _this.spinShow = true, 
        getDataset(_this.datasetname, _this.currentPage,_this.pageSize ).then( res=>{
        
            _this.spinShow = false                    
            let datas = res.data
          
            _this.datasets = datas.list                  
            _this.total = datas.total;
        })
        // 404 还有为连接上服务都会catch到
        // .catch( err =>{    
           
        //    if (err.statusText == undefined){
        //       console.log("connection refuse")          
        //    }
        // })
       
        



      },

      mockTableDataTypeSource(){

        var _this = this;      
        _this.spinShowTypeSource = true, 
        getDatasetTypeSource(_this.table_name,_this.currentPageTypeSource,_this.pageSizeTypeSource ).then( res=>{
           
            _this.spinShowTypeSource = false                    
            let datas = res.data
            // console.info(datas.list)
            _this.datasetsTypeSource = datas.list                  
            _this.totalTypeSource = datas.total;
        })
       

      },

      mockTableDataTypeSourceByCompundsType(compunds_type){
         var _this = this;      
        _this.spinShowTypeSource = true, 
        //alert(compunds_type)
        getDatasetTypeSourceByDiseaseType(compunds_type,_this.currentPageTypeSource,_this.pageSizeTypeSource ).then( res=>{
           
            _this.spinShowTypeSource = false                    
            let datas = res.data
            // console.info(datas.list)
            _this.datasetsTypeSource = datas.list                  
            _this.totalTypeSource = datas.total;
        })

      },
      changedCompundsType(){
        //alert(this.cell_name)
    
        this.mockTableDataTypeSourceByCompundsType(this.cell_name)
        
        // var search = {'no':'no'}
        // this.onSearch_datasetTypeSource(search)

      },

      resetCellType(){
        this.cell_name = 'All'
        this.mockTableDataTypeSourceByCompundsType(this.cell_name)
      },

      changePge(){

          this.mockTableData();
      },



      handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.mockTableData()

      },
      handleCurrentChangeTypeSource(val){
          // console.log(`当前页: ${val}`);
          var _this = this; 
          _this.currentPageTypeSource = val;
          if (this.datasetFilter.length = 0){
            this.mockTableDataTypeSource()
          }else{
            this.searchDatasetByFilter(_this.datasetFilter)
          }
      },
      handleSizeChangeTypeSource(val){
        // console.log(`每页 ${val} 条`);
        var _this = this; 
        _this.pageSizeTypeSource = val;
        // alert('chenge')
        if (this.datasetFilter.length = 0){
            this.mockTableDataTypeSource()
          }else{
            this.searchDatasetByFilter(_this.datasetFilter)
          }
      },

      /**
       * 格式化状态
       * @param value 状态值
       * @param status 状态对象
       * @returns {*} 返回状态
       */
      // formatStatus(value, status) {
      //   return status[value] || {value: '', name: ''};
      // },
      onSearch(search) {
        var _this = this
        searchDataset(_this.datasetname,search, _this.currentPage,_this.pageSize ).then( res=>{
            
            _this.spinShow = false                    
            let datas = res.data
            // console.info(datas.list)          
            _this.datasets = datas.list                  
            _this.total = datas.total;
        })
      },

      onSearch_datasetTypeSource(searchTypeSource){


        var _this = this
        // alert(searchTypeSource)
        for (let key in searchTypeSource){
          // alert(key)
          // alert(searchTypeSource[key])
          var value = searchTypeSource[key]
          // alert(typeof(value))
          if ( typeof(value) === 'object'){
            // alert('yes')  输入了空值  HSPC  
            this.$Message.info('Please check your input   ');
            return;
          }else{
            // alert('I am value')
            // alert(value)  //不输入空
            // alert(value.replace(/\s*/g,'').length) + key,15
            // value.replace(/\s*/g,'').length === 0
            if (value.length === 0){
                this.$Message.info('Please check your input' );
                this.load();
                return;
            }else{
              continue;
            }
           
          }
        }

        _this.datasetFilter = searchTypeSource

        this.searchDatasetByFilter(searchTypeSource)
        

      },


      sdataSetByCellName(){
      
        // this.mockTableDataTypeSourceByCell()

      },


     
      drawCellTypeChart() {
        // 基于准备好的dom，初始化echarts实例
        let _this = this
        
        let myChart = this.$echarts.init(document.getElementById("cell_type_show_view"));
        
         // 给图添加点击事件
        myChart.on("click", params => {
 
          var name = params.data.name;//点击的节点的name
          var value = params.data.value;//点击的节点的value
          // this.cell_name = name
         
          console.log(name)
          console.log(value)
          if (typeof name === 'undefined' ){
            // 未选择值
            _this.cell_name = 'All'
            // alert(this.cell_name)
          }else{
            // _this.cell_name = name
            var cell_type_list = cell_type_list=[
            // 贫血  
            {name:'Fanconi anemia', 
              'full_name':'Fanconi anemia',
              'cell_ano':'Fanconi anemia'},
            //红细胞缺陷  贫血
            {name:'Diamond-Blackfan anemia',  
              'full_name':'Diamond-Blackfan anemia',
              'cell_ano':'Diamond-Blackfan anemia'},
            // 贫血
            {name:'Epo-resistant anemia',
              'full_name':'Epo-resistant anemia',
              'cell_ano':'Epo-resistant anemia'},
            //  贫血
            {name:'Aplastic anemia',
            'full_name':'Aplastic anemia',
            'cell_ano':'Aplastic anemia'},

            {name:'Hemoglobinopathies (Sickle cell anemia)',
              'full_name':'Sickle cell anemia',
              'cell_ano':'Sickle cell anemia'},

            //地中海贫血
            {name:'Hemoglobinopathies (Thalassemia)',
              'full_name':'Thalassemia',
              'cell_ano':'Thalassemia'},

            // 血红蛋白异常
            {name:'Hemoglobinopathies',
            'full_name':'Hemoglobinopathies',
            'cell_ano':'Hemoglobinopathies'},
            ]

            cell_type_list.forEach(element => {
            if(element.name == name){
            // alert(_this.cell_name)
            // _this.cell_name 
            var ccn = element.full_name
            var c_ano = element.cell_ano
            _this.current_cell_anno = c_ano
            _this.current_cellname=ccn
            // 查询的名字
            _this.cell_name =  c_ano
            _this.drawCellTypeChart()
            }
            });


          }

        
         
          // console.log(_this.current_cellname)
          
          this.mockTableDataTypeSourceByCompundsType(this.cell_name)
        } );
        
      
        var option = {
            
            tooltip: {
                trigger: 'item',
                axisPointer: {
                  type: 'shadow'
                }
            },
            grid: {
              top: 80,
              bottom: 30
            },
            xAxis: {
              type: 'value',
              position: 'top',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            },
            yAxis: {
              type: 'category',
              axisLine: { show: false },
              axisLabel: { show: false },
              axisTick: { show: false },
              splitLine: { show: false },
          
            },
            series: [
              {
                name: 'Dataset number:',
                type: 'bar',
                stack: 'Total',
                label: {
                  show: true,
                  formatter: '{b}'
                },
                data: [
                  // { name:'Haemolysis',value: 1},
                  { name:'Diamond-Blackfan anemia',value:6,
                      'itemStyle': {
                                'color': '#8c0c0b'
                        },
                  },
                  { name:'Epo-resistant anemia',value: 1,
                      'itemStyle': {
                                'color': '#8c0c0b'
                        },
                  },
                  { name:'Hemoglobinopathies',value: 3,
                      'itemStyle': {
                                'color': '#8c0c0b'
                        },
                  
                  },

                  {name:'Fanconi anemia', value: 1,
                  'itemStyle': {
                                'color': '#8c0c0b'
                        },
                  },
                //红细胞缺陷  贫血
              
              
                //  贫血
                  {name:'Aplastic anemia',value: 3,
                  'itemStyle': {
                                  'color': '#8c0c0b'
                          },
                  },

                // {name:'Hemoglobinopathies (Sickle cell anemia)',value: 1,
                //   'itemStyle': {
                //                   'color': '#8c0c0b'
                //           },
                //   },

                // //地中海贫血
                // {name:'Hemoglobinopathies (Thalassemia)',value: 1,
                //   'itemStyle': {
                //                   'color': '#8c0c0b'
                //           },
                // },

             

                ]
              }
            ]
        };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      },

        
    },
    mounted(){
      this.drawCellTypeChart()
      var myChartContainer = document.getElementById('cell_type_show_view')

	  // 获取自适应的高度和宽度
      var resizeMyChartContainer = function() {
        // console.log("----")
        myChartContainer.style.height = window.innerHeight * 0.3 + 'px';
        myChartContainer.style.width = window.innerWidth * 0.6+ 'px';
        
      };
	  // 设置容器高和宽
      resizeMyChartContainer();

      var myChart = this.$echarts.init(myChartContainer);

      let option = {};
      
      myChart.setOption(option);
	    // 自适应高和宽
      // window.onresize = function () {
       
      //   myChart.resize();
      // }
      
      // window.addEventListener("resize",function (){
      //     resizeMyChartContainer();
      //     console.log('====')
      //     myChart.resize();
          
      // });
      window.onresize = ()=>{
　　　　//调用methods中的事件
        resizeMyChartContainer();
        // console.log('==')
        myChart.resize()
        // _this.pageResize();
      }
      
     
    },
    watched(){
     
    },
    created() {
      // this.mockTableData();
      this.mockTableDataTypeSource()



    },
}

</script>

<style>

  




</style>

