<template>
      <div>

            <h1 class='h1_title' > 
              Compounds Related to Erythroid  Differentiation and Development
            </h1>
          
            <Row>
              <h2 class='h2_title' > {{ current_cellname }} </h2>
              <span>
                {{current_cell_anno}}
              </span>
            </Row>
            
            <div id="cell_type_show_view" style="width:100%;height:300%; text-aglign:center;margin:0 auto;">
              
        
            </div>
         
          
          <!-- 用表格展示 根据细胞分析搜索的数据集 -->
          </br>  
          </br>  
          </br>  
          </br> 
          </br> 
          <Row>
            <h1 class='h1_title' > Get Research Datasets Related to  {{cell_name}}
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
import * as echarts from 'echarts'
import { checkStatus } from '@/libs/util'
import { getDataset,getDatasetTypeSourceByCompundsType,getDatasetTypeSource,searchDataset,searchDatasetTypeSource } from '@/api/erythdataset'
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
      name: 'Bone Marrow(BM)'
    },
    1: {
      value: "Cord",
      name: 'Cord Blood(CB)',
      // color: 'red'
    },
    2: {
      value: "Peripheral",
      name: 'Peripheral Blood(PB)',
      // color: 'green'
    },
    3: {
      value: "Spleen",
      name: 'Spleen(SP)',
      // color: 'green'
    },
  
    4: {
      value: "Line",
      name: 'Cell Line',
      // color: 'green'
    },

    5:{
      value:'Embryo',
      name:'Embryo(EM)'
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
      value: "Cardiac",
      name: 'Cardiac(CAR)',
      // color: 'green'
    },

    9:{
      value: "Kidney",
      name: 'Kidney(KID)',
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
      name: 'vitro'
    },
    1: {
      value: "vivo",
      name: 'vivo',
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
    name:"molecules",
    components: {FilterTableForAllDateSet},
    data(){
      return {
        cell_type_list:[

            {'name':'TRβ agonists',
                'full_name':'Thyroid Hormone Receptor(TRβ)  Agonists',
                'cell_ano':''},
              {'name':'ERBB inhibitors',
                'full_name':'Epidermal Growth Factor Receptor Inhibitors',
                'cell_ano':''},
              {'name':'iron',
                'full_name':'Iron',
                'cell_ano':' '},
              {'name':'IDH2 inhibitor',
              'full_name':'Isocitrate Dehydrogenase 2(IDH2) Mutant-specific Inhibitor',
              'cell_ano':''},
              {'name':'BET bromodomain inhibitor',
              'full_name':'BET bromodomain inhibitor',
              'cell_ano':''},
              
              {'name':'PPAR-α agonists',
              'full_name':'Peroxisome Proliferator-activated Receptor α(PPAR-α) Agonists',
              'cell_ano':''},
              {'name':'HbF inducers',
              'full_name':'Heterogeneity of Fetal Hemoglobin (HbF) Activation',
              'cell_ano':''},
              
              {'name':'erythropoietin',
              'full_name':'Erythropoietin',
              'cell_ano':''},

              {'name':'corticosteroids',
              'full_name':'Corticosteroids',
              'cell_ano':''},
        ],
        search:'',
        current_cellname:'Epidermal growth factor receptor inhibitors',
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
        tableColumns: [
          {
            title: 'Dataset',
            key: 'dataset',
            filter: {
              type: 'Input'
            },
            fixed: 'left',
            render: (h, params) => {    
              if (params.row.dataset.indexOf("GSE") > -1){
                  return h('div', [
                  h('a', {                               
                        attrs:{                              
                          href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset,
                          target:'_blank',
                        },    
                    },params.row.dataset)
                  ])
              }else{
                return h('div',params.row.dataset)
              
              }
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
                        href:'https://www.ncbi.nlm.nih.gov/pubmed/'+citations[cita],
                        target:'_blank',
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
              title: 'Experiment Type',
              key: 'growth_mode',
              width:'120',
              filter: {
                  type: 'Select',
                  option: growth_type
              },
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
            title: 'Omics Type',
            key: 'sequence_type',
            width:'125',
            filter: {
                type: 'Select',
                option: sequence_type
            },
          },
          {
            title: 'Sample Number',
            key: 'sample_number',
            width:'90',
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

      mockTableDataTypeSourceByCompundsType(compunds_type){
         var _this = this;      
        _this.spinShowTypeSource = true, 
        // alert(_this.cell_name)
        getDatasetTypeSourceByCompundsType(compunds_type,_this.currentPageTypeSource,_this.pageSizeTypeSource ).then( res=>{
           
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
          var _this = this; 
          _this.currentPageTypeSource = val;
          this.mockTableDataTypeSource()
      },
      handleSizeChangeTypeSource(val){
        // console.log(`每页 ${val} 条`);
        var _this = this; 
        _this.pageSizeTypeSource = val;
        // alert('chenge')
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
        myChart.on("click", params=> {
 
          var name = params.data.name;//点击的节点的name
          var value = params.data.value;//点击的节点的value
          // this.cell_name = name
         
          console.log(name)
          if (typeof name === 'undefined' ){
            // 未选择值
            _this.cell_name = 'all'
            // alert(this.cell_name)
          }else{
            _this.cell_name = name
            

          }

          var cell_type_list = cell_type_list=[

              {'name':'TRβ Agonists',
                'full_name':'Thyroid Hormone Receptor(TRβ)  Agonists',
                'cell_ano':''},
              {'name':'ERBB Inhibitors',
                'full_name':'Epidermal Growth Factor Receptor Inhibitors',
                'cell_ano':''},
              {'name':'Iron',
                'full_name':'Iron',
                'cell_ano':' '},
              {'name':'IDH2 Inhibitor',
              'full_name':'Isocitrate Dehydrogenase 2(IDH2) Mutant-specific Inhibitor',
              'cell_ano':''},
              {'name':'BET bromodomain inhibitor',
              'full_name':'BET bromodomain inhibitor',
              'cell_ano':''},
              {'name':'PPAR-α Agonists',
              'full_name':'Peroxisome Proliferator-activated Receptor α(PPAR-α) Agonists',
              'cell_ano':''},
              {'name':'HbF Inducers',
              'full_name':'Heterogeneity of Fetal Hemoglobin (HbF) Activation',
              'cell_ano':''},
              
              {'name':'Erythropoietin',
              'full_name':'Erythropoietin',
              'cell_ano':''},

              {'name':'Corticosteroids',
              'full_name':'Corticosteroids',
              'cell_ano':''},
             
        ]
          cell_type_list.forEach(element => {
            if(element.name == name){
              // alert(_this.cell_name)
              // _this.cell_name 
              var ccn = element.full_name
              var c_ano = element.cell_ano
              _this.current_cell_anno = c_ano
              _this.current_cellname=ccn
              // _this.drawCellTypeChart()
            }
          });

          // console.log(_this.current_cellname)
          this.mockTableDataTypeSourceByCompundsType(this.cell_name)


        } );
        
      
        var option = {
            
            tooltip: {
                trigger: 'item',
                //triggerOn: 'mousemove'
            },
            legend: {
              //top: '0',
              left: '0',
              orient:'vertical'
            },
            series:[
                {
                  name: 'Compounds Number:',
                  type: 'pie',
                  radius: ['70%', '80%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: 'center',
                    
                  },
                  
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '25',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    { value: 1, name: 'TRβ Agonists' ,
                      'itemStyle': {
                    
                                'color': '#cfbcc3'
                            },
                    },
                    // #ed7d31
                    { value: 1, name: 'ERBB Inhibitors',
                        'itemStyle': {
                        
                                    'color': '#781111'
                                },
                    },
                    { value: 1, name: 'Iron',
                        'itemStyle': {
                        
                                    'color': '#db302a'
                                },
                    },
                    { value: 1, name: 'IDH2 Inhibitor',
                        'itemStyle': {
                        
                                    'color': '#dd6163'
                                },  
                    },
                    { value: 1, name: 'BET bromodomain inhibitor',
                        'itemStyle': {
                        
                                    'color': '#dd6263'
                                },  
                    },
                    { value: 1, name: 'PPAR-α Agonists',
                        'itemStyle': {
                        
                                    'color': '#a79594'
                                },
                    },
                    { value: 1, name: 'HbF Inducers',
                      'itemStyle': {
                        
                                    'color': '#e2b5b4'
                                },

                    },
                    { value: 1, name: 'Corticosteroids',
                        'itemStyle': {
                        
                                    'color': '#ed7d31'
                                },

                    },
                    { value: 1, name: 'Erythropoietin',
                        'itemStyle': {
                        
                                    'color': '#b37d7e'
                                },

                    }
                    
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
        myChartContainer.style.width = window.innerWidth * 0.88+ 'px';
        
      };
	  // 设置容器高和宽
      resizeMyChartContainer();

      var myChart = this.$echarts.init(myChartContainer);

      let option = {};
      
      myChart.setOption(option);
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


  .button_style{
    font-size:calc((40/1920) * 100vw);
  }
  .button_style{
    font-size:calc((40/1920) * 100vw);
  }




</style>

