<template>
    <div>
             
       
          <!-- <div id="cell_type_show"> -->
            <!-- Process of Red blood cell differentiation and development -->
          <h1 class='h1_title' > 
            Process of Red blood cell differentiation and development
          </h1>
          <div id="cell_type_show_view" style="width: 100%;height:400%; text-aglign:center"></div>
          <!-- <Row>
              <h2 class='h2_title' > {{ current_cellname }} </h2>
          </Row> -->
          <!-- 用表格展示 根据细胞分析搜索的数据集 -->
          <Row>
            <h1 class='h1_title' > Get research datasets have cells of  {{cell_name}} </h1>
            <Col span='12'>
                    <i-select :model.sync="cell_name" placeholder="Select cell source" clearable style="width:80%" @on-change='changedCellType'>
                      <i-option v-for="(source,index) in cell_type_list" :key='index' :value="source.name">{{ source.name }}</i-option>
                    </i-select>
                    <i-button class='button_style' type="primary" icon="ios-search" @click="sdataSetByCellName($event)"></i-button>                
            </Col> 

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
                      show-elevator 
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
import { checkStatus } from '@/libs/util'
import { getDataset,getDatasetTypeSourceByCell,getDatasetTypeSource,searchDataset,searchDatasetTypeSource } from '@/api/erythdataset'
import FilterTableForAllDateSet from '../compnents/FilterTableForAllDateSet';
import { type } from 'os';
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
      name: 'all',
      // color: 'green'
    },

  };



export default {
    name:"eryth",
    components: {FilterTableForAllDateSet},
    data(){
      return {
        cell_type_list:[

          {'name':'ESC',
            'full_name':'Embryonic Stem Cells'},
          {'name':'HSPC',
            'full_name':'Hematopoietic Stem and Progenitor Cell '},
          {'name':'HSC',
            'full_name':'Hematopoietic stem cells '},
          {'name':'MPP',
            'full_name':'Multipotent Progenitor Cell'},
          {'name':'CMP',
          'full_name':'Common Myeloid Progenitor'},
          {'name':'MEP',
          'full_name':'Megakaryocyte-erythroid Progenitor'},
          {'name':'BFU-E',
          'full_name':'Burst-Forming Unit -Erythroid'},
          {'name':'CFU-E',
          'full_name':'Colony-Forming Unit – Erythroid'},
          {'name':'pro-E',
          'full_name':'The Proerythroblast Stage'},
          {'name':'EB',
          'full_name':'Erythroblast'},
          {'name':'EarlyBasoE',
          'full_name':'Early Basophilic Erythroblast'},
          {'name':'LateBasoE',
          'lateBasoE':'late basophilic Erythroblast'},
          {'name':'PolyE',
          'full_name':'Polychromatophilic Erythroblast'},
          {'name':'OrthoE',
          'full_name':'Orthochromatic Erythroblast'},
          {'name':'Reticu',
          'full_name':'Reticulocyte'},
          {'name':'RE',
          'full_name':'Red cell (Erythrocyte)'}
        ],
        search:'',
        current_cellname:'Embryonic Stem Cells',
        table_name:'all_dataset_source_type',
        spinShow:true,
        spinShowTypeSource:true,
        currentPage: 1,
        currentPageTypeSource:1,
        pageSize: 10,
        pageSizeTypeSource:10,
        cell_name:'all',
        total: 400,
        totalTypeSource:400,
        datasets: [],
        datasetsTypeSource:[],
        datasetname :'Development',
        tableColumns: [
          {
            title: 'Dataset',
            key: 'dataset',
            filter: {
              type: 'Input'
            },
            fixed: 'left',
            render: (h, params) => {                        
              return h('div', [
                h('a', {                               
                      attrs:{                              
                        href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset

                      },    
                  },params.row.dataset)
                ])
              }
          },
          {
            title: 'Title',
            key: 'title',
            filter: {
              type: 'Input'
            }

          },
          {
            title: 'PubMed',
            key: 'citations',
            filter: {
              type: 'Input'
            },
            render: (h, params) => {
              let citations =  params.row.citation.split(",")
              let render = []
            
              for (let cita in citations){
                    render.push(h('a', {
                      style: {
                            marginRight: '5px'
                      },
                      attrs:{                              
                        href:'https://www.ncbi.nlm.nih.gov/pubmed/'+citations[cita]

                      },    
                  }, citations[cita]))
              }
              return h('div', render)
            }

          },
          {
            title: 'Experiment Type',
            key: 'experiment_type',
            filter: {
              type: 'Input'
            },
          },
          {
            title: 'Sequence type',
            key: 'sequencing_type',
            filter: {
              type: 'Input'
            },
          },
          {
            title: 'Status',
            key: 'status',
            filter: {
              type: 'Input'
            },
          },
          {
            title: 'Sample number',
            key: 'sample_numbers',
            filter: {
              type: 'Select',
              option: sample_numbers
            },
          },
         
        ],
        tAdatasetTypeSourceColumns:[
          {
            title: 'Dataset',
            key: 'dataset_id',
            filter: {
              type: 'Input'
            },
            fixed: 'left',
            render: (h, params) => {                        
              return h('div', [
                h('a', {                               
                      attrs:{                              
                        href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset_id

                      },    
                  },params.row.dataset_id)
                ])
              }
          },
          //organism
          {
            title: 'Organism',
            key: 'organism',
            filter: {
              type: 'Input'
            }

          },
          {
            title: 'Source',
            key: 'source',
            filter: {
              type: 'Input'
            }

          },
          {
            title: 'Title',
            key: 'title',
            filter: {
              type: 'Input'
            }

          },
          {
            title: 'Experiment Type',
            key: 'experiment_type',
            filter: {
              type: 'Input'
            },
          },
          {
            title: 'Sequence type',
            key: 'sequence_type',
            filter: {
              type: 'Input'
            },
          },
          {
            title: 'Sample number',
            key: 'sample_number',
            filter: {
              type: 'Select',
              option: sample_numbers
            },
          },


        ],

      }

    },
    methods:{

     
      mockTableData () {
        var _this = this;      
        _this.spinShow = true, 
        getDataset(_this.datasetname, _this.currentPage,_this.pageSize ).then( res=>{
            // let checkres = checkStatus(res)           
            // alert(checkres.data.code)
            // if(checkres.data.code == 404 ){

            //   alter(checkres.data.message)
            //   alter(checkres.data.data)
            // }
            _this.spinShow = false                    
            let datas = res.data
            // console.info(datas.list)
            // console.info(datas.total)
            // let inputdata = [];    
            // console.log(datas.list)
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

      mockTableDataTypeSourceByCell(cell_name){
         var _this = this;      
        _this.spinShowTypeSource = true, 
        // alert(_this.cell_name)
        getDatasetTypeSourceByCell(cell_name,_this.currentPageTypeSource,_this.pageSizeTypeSource ).then( res=>{
           
            _this.spinShowTypeSource = false                    
            let datas = res.data
            // console.info(datas.list)
            _this.datasetsTypeSource = datas.list                  
            _this.totalTypeSource = datas.total;
        })

      },
      changedCellType(cell_name){
        // alert(cell_name)
    
        if (typeof cell_name === 'undefined' ){
          // 未选择值
          this.cell_name = 'all'
          // alert(this.cell_name)
        }else{
          this.cell_name = cell_name
          

        }
        this.mockTableDataTypeSourceByCell(this.cell_name)
        
        // var search = {'no':'no'}
        // this.onSearch_datasetTypeSource(search)

      },
      changePge(){

          this.mockTableData();
      },

      changeTableColumns () {
          this.tableColumns = this.getTable2Columns();
      },

      handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.mockTableData()

      },
      handleCurrentChangeTypeSource(val){
          // console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.mockTableDataTypeSource()
      },
      handleSizeChange(val){
          // console.log(`每页 ${val} 条`);
          this.pageSize = val;
          this.mockTableData()

      },
      handleSizeChangeTypeSource(val){
        // console.log(`每页 ${val} 条`);
        this.pageSizeTypeSource = val;
        this.mockTableDataTypeSource
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
        // alert('jinlai')
        // alert(Object.keys(searchTypeSource))
        // var keys = Object.keys(searchTypeSource)
        // alert(typeof(keys))
        // alert(searchTypeSource)
        // if ( keys.replace(/\s*/g,'').length.length === 0 === 0 ){
        //     // alert('yes')  输入了空值
        //     this.$Message.info('Please check your input of  ' + key,15);
        //     return;
        // }
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
            // alert('no')  不输入空
            // alert(value.replace(/\s*/g,'').length) + key,15
            if (value.replace(/\s*/g,'').length.length === 0){
                this.$Message.info('Please check your input of  ' );
                this.load();
                return;
            }else{
              continue;
            }
           
          }
        }
        searchDatasetTypeSource(searchTypeSource, _this.currentPageTypeSource,_this.pageSizeTypeSource,_this.cell_name).then( res=>{
            
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
      sdataSetByCellName(){
      
        // this.mockTableDataTypeSourceByCell()

      },


     
      drawCellTypeChart() {
        // 基于准备好的dom，初始化echarts实例
        let _this = this
        
        let myChart = this.$echarts.init(document.getElementById("cell_type_show_view"));
        
        // 给图添加点击事件
        myChart.on("click", function(params) {
 
          var name = params.data.name;//点击的节点的name
          var value = params.data.value;//点击的节点的value
          // this.cell_name = name
          var cell_type_list = cell_type_list=[

          {'name':'ESC',
            'full_name':'Embryonic Stem Cells'},
          {'name':'HSPC',
            'full_name':'Hematopoietic Stem and Progenitor Cell '},
          {'name':'HSC',
            'full_name':'Hematopoietic stem cells '},
          {'name':'MPP',
            'full_name':'Multipotent Progenitor Cell'},
          {'name':'CMP',
          'full_name':'Common Myeloid Progenitor'},
          {'name':'MEP',
          'full_name':'Megakaryocyte-erythroid Progenitor'},
          {'name':'BFU-E',
          'full_name':'Burst-Forming Unit -Erythroid'},
          {'name':'CFU-E',
          'full_name':'Colony-Forming Unit – Erythroid'},
          {'name':'pro-E',
          'full_name':'The Proerythroblast Stage'},
          {'name':'EB',
          'full_name':'Erythroblast'},
          {'name':'earlyBasoE',
          'full_name':'Early Basophilic Erythroblast'},
          {'name':'lateBasoE',
          'lateBasoE':'late basophilic Erythroblast'},
          {'name':'PolyE',
          'full_name':'Polychromatophilic Erythroblast'},
          {'name':'OrthoE',
          'full_name':'Orthochromatic Erythroblast'},
          {'name':'Reticu',
          'full_name':'Reticulocyte'},
          {'name':'RE',
          'full_name':'red cell (Erythrocyte)'}
        ]
          cell_type_list.forEach(element => {
            if(element.name == name){
              // alert(_this.cell_name)
              // _this.cell_name 
              var ccn = element.full_name
              
              _this.current_cellname=ccn
              _this.drawCellTypeChart()
            }
          });
          // console.log(_this.current_cellname)
          

        } );
        
       
        
        // 指定图表的配置项和数据
        var greyColer={
            borderColor:"grey",
        };

        var greenColer={
            borderColor:"green"
        };
        var blueColer={
            borderColor:"blue"
        };
        var orangeColer={
            borderColor:"orange",
        }
        var pinkColer ={
            borderColor:'pink',
        };

        var redColer={
            borderColor:"red",
            
        };

        var data = {
            "name": "ESC",
            "itemStyle":greyColer,
            "children": [
                {
                   "name": "HSPC",
                    "itemStyle":greyColer,
                    "children":[{

                    
                      "name":"HSC",
                      "children":[{
                          "name":"MPP",
                          "children": [
                          { 
                             "name":'CMP',
                             "children":[{
                                "name":"MEP",
                                "children":[{
                                     "name": "BFU-E",
                                      "itemStyle":blueColer,
                                      "children": [
                                          {
                                              "name": "CFU-E",
                                              "itemStyle":orangeColer,
                                              "children": [
                                                  {
                                                      "name": "pro-E", 
                                                      "itemStyle":pinkColer,
                                                      "children": [
                                                          {
                                                              "name": "EB", 
                                                              "itemStyle":redColer,
                                                              "children":[
                                                                {"name":"earlyBasoE","itemStyle":redColer },
                                                                {"name":"lateBasoE","itemStyle":redColer},
                                                                {"name":"PolyE","itemStyle":redColer},
                                                                {"name":"OrthoE","itemStyle":redColer},
                                                                {"name":"Reticu","itemStyle":redColer},
                                                                {"name":"RE","itemStyle":redColer},
                                                                
                                                              ]
                                                          }
                                                          ]
                                                  },
                                                
                                              ]
                                        },
                                      ]
                                }]
                             }]
                          },     
                        ]
                    }]
                  }
              ]
                          
            }
          ]
           
        };
        var option = {
            title: {
						  text: this.current_cellname ,
              // subtext:this.current_cellname,
            },
            // subtitle:{
            //   text: 'Process of Red blood cell differentiation and development',
            // },
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series:[
                {
                    type: 'tree',
                    id: 0,
                    name: 'tree1',
                    data: [data],

                    top: '10%',
                    left: '10%',
                    bottom: '10%',
                    right: '20%',

                    symbolSize: 35,
                  
                    itemStyle:{
                        
                      borderColor:"blue"
                      
                    },
                    edgeShape: 'polyline',
                    edgeForkPosition: '50%',
                    initialTreeDepth: 10,

                    lineStyle: {
                        width: 3
                    },

                    label: {
                        backgroundColor: '#fff',
                        position: 'bottom',
                        verticalAlign: 'middle',
                        align: 'right',
                      
                        
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
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
        myChartContainer.style.height = window.innerHeight * 0.85 + 'px';
        myChartContainer.style.width = window.innerWidth * 0.75+ 'px';
        
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
 .h1_title{
        font-size:calc((40/1920) * 100vw);
  }
  .h2_title{
    ont-size:calc((30/1920) * 100vw);
  }
  .button_style{
    font-size:calc((40/1920) * 100vw);
  }




</style>

