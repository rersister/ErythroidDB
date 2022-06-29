<template>
          <div>
            <h1 class='h1_title' > 
             Genes Related to Erythroid  Differentiation and Development
            </h1>
          
            <Row>
              <h2 class='h2_title' > {{ current_cellname }} </h2>
              <span>
                {{current_cell_anno}}
              </span>
            </Row>
            
            
            <div ref="chart2" style="width: 800px;height:600px;margin:0 auto;"></div>
            <!-- <div id="chart2" style="width:100%;height:300%; text-aglign:center"> -->

            

            <!-- <div id="cell_type_show_view" style="width:100%;height:300%; text-aglign:center"> -->
            <!-- <div>
              <highcharts class='bubble_container'  :options='genes_Chart_bubble'></highcharts>  
            </div> -->
         
          
          <!-- 用表格展示 根据细胞分析搜索的数据集 -->
          </br>  
       
          <Row>
            <h1 class='h1_title' > Get Research Datasets Related to  {{cell_name}}
              <!-- <i-button  shape="circle" icon="ios-search" @click="changedGene"></i-button> -->
              <!-- <i-button  class="my_reset_button" shape="circle"  @click="resetCellType">Reset</i-button> -->
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
          <div > 
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
          </br>
        </Row>
        <Row >
          <router-view/>
        </Row>
    </div>
    
    
    
    
</template>


<script>
import * as echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min"; 
import { checkStatus } from '@/libs/util'
import { getDataset,getDatasetTypeSourceByGene,getDatasetTypeSource,searchDataset,searchDatasetTypeSource,getDatasetGene } from '@/api/erythdataset'
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
      value: "Cardiac",
      name: 'Cardiac Puncture(CP)',
      // color: 'green'
    },
    5: {
      value: "Line",
      name: 'Cell Line',
      // color: 'green'
    },
    
    6: {
      value: "Fetal",
      name: 'Embryonic Fetal Liver(EMFL)',
      // color: 'green'
    },
    
    7:{
      value:'Embryo',
      name:'Embryo(EM)'
    },
    8:{

      value:'Yolk',
      name:'Embryonic Yolk Sac(EMYS)'
    },
    8:{

      value:'Caudal',
      name:'Embryonic Caudal Half(EMCH)'
    },

    9:{
      value:'Pluripotent',
      name:'Induced Pluripotent Stem Cells(iPSC)'
    },
   
    10: {
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
    name:"genes",
    components: {FilterTableForAllDateSet},
    data(){
      return {
        //定义需要展示的词语和数值（数值越大，字体会越大）
          worddata:[
                        {
                            name: "Java",
                            value: 2300
                        },
                        {
                            name: "python",
                            value: 2000
                        },
                
            ],
        genes_Chart_bubble:{},
        cell_type_list:[

          {'name':'ESC',
            'full_name':'Embryonic Stem Cells'},
          // {'name':'HSPC',
          //   'full_name':'Hematopoietic Stem and Progenitor Cell '},
          {'name':'HSC',
            'full_name':'Hematopoietic Stem cells '},
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
          {'name':'ProE',
          'full_name':'The Proerythroblast Stage'},
          // {'name':'EB',
          // 'full_name':'Erythroblast'},
          // {'name':'EarlyBasoE',
          // 'full_name':'Early Basophilic Erythroblast'},
          {'name':'BasoE',
          'lateBasoE':'Basophilic Erythroblast'},
          {'name':'PolyE',
          'full_name':'Polychromatophilic Erythroblast'},
          {'name':'OrthoE',
          'full_name':'Orthochromatic Erythroblast'},
          {'name':'Retic',
          'full_name':'Reticulocyte'},
          {'name':'RBC',
          'full_name':'Red Blood Cell '}
        ],
        search:'',
        current_cellname:'',
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
            // render: (h, params) => {    
            //   if (params.row.dataset.indexOf("GSE") > -1){
            //       return h('div', [
            //       h('a', {                               
            //             attrs:{                              
            //               href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset,
            //               target:'_blank',
            //             },    
            //         },params.row.dataset)
            //       ])
            //   }else{
            //     return h('div',params.row.dataset)
              
            //   }
            // }

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
              title: 'Source',//来源 dataset 里的source
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

      initCharts(){
          //var myChart2 = this.$echarts.init(document.getElementById("chart2"));
          
          let _this = this
          var myChart2 = this.$echarts.init(this.$refs.chart2);
           // 给图添加点击事件
          myChart2.on("click", params => {

            var name = params.data.name;//点击的节点的name
            var value = params.data.value;//点击的节点的value
            // this.cell_name = name
            
            console.log(name)
            if (typeof name === 'undefined' ){
              // 未选择值
              _this.cell_name = 'All'
              // alert(this.cell_name)
            }else{
              _this.cell_name = name
              

            }
            _this.current_cellname= name
          
          
            // cell_type_list.forEach(element => {
              // if(element.name == name){
                // alert(_this.cell_name)
                // _this.cell_name 
                // var ccn = element.name
                // var c_ano = element.cell_ano
                // _this.current_cell_anno = c_ano
                // _this.current_cellname=ccn
                // _this.drawCellTypeChart()
              // }
            // });

          
            // console.log(_this.current_cellname)
            
            this.mockTableDataTypeSourceByGene(this.cell_name)

          } );
    
          getDatasetGene().then(res=>{
          
              console.log(res.data)
        
              var data = res.data
              var color =[]
                
              var my_wdata = []
              
              var gData = data.gData
              var mData =data.mData
              var lData =data.lData
              console.log("gData.name")
              console.log(gData.name)
              for ( var i = 0; i < gData.length; i ++ ) {
                // color.push('#781111')
                // alert(gData[i])
                my_wdata.push(gData[i]);

              };
              for ( var i = 0; i < mData.length; i ++ ) {
                // color.push('#781111')
                // alert(this.vivo_data)
                my_wdata.push(mData[i]);
              };
              for ( var i = 0; i < lData.length; i ++ ) {
                // color.push('#781111')
                my_wdata.push(lData[i]);
                // alert(this.vivo_data)
              };

              // let dou_live_word_result = this.worddata
              let dou_live_word_result = my_wdata
              console.log(my_wdata)
              var myoption={
                                  title: {
                                      x: "center"
                                  },
                                  // 
                                  backgroundColor: "#fff",
                                  series: [{
                                      type: "wordCloud",
                                      //用来调整词之间的距离
                                      gridSize: 10,
                                      //用来调整字的大小范围
                                      sizeRange: [14, 60],                                                                           
                                      //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
                                      // rotationRange: [-45, 0, 45, 90],
                                      // rotationRange: [ 0,90],
                                      rotationRange: [0, 0],
                                      //随机生成字体颜色 
                                      textStyle: {
                                            color: '#781111',
                                      },
                                      //位置相关设置 
                                      left: "center",
                                      top: "center",
                                      right: null,
                                      bottom: null,
                                      width: "200%",
                                      height: "200%",
                                      //数据
                                      data: dou_live_word_result
                                  }]

              }
              myChart2.setOption(myoption)
        })
          
      },

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

      mockTableDataTypeSourceByGene(gene){
        var _this = this;      
        _this.spinShowTypeSource = true, 
        // alert(_this.cell_name)
        getDatasetTypeSourceByGene(gene,_this.currentPageTypeSource,_this.pageSizeTypeSource ).then( res=>{
           
            _this.spinShowTypeSource = false                    
            let datas = res.data
            // console.info(datas.list)
            _this.datasetsTypeSource = datas.list                  
            _this.totalTypeSource = datas.total;
        })

      },
      changedGene(){
        //alert(this.cell_name)
    
        this.mockTableDataTypeSourceByGene(this.cell_name)
        
        // var search = {'no':'no'}
        // this.onSearch_datasetTypeSource(search)

      },
      resetCellType(){
        this.cell_name = 'All'
        this.mockTableDataTypeSourceByGene(this.cell_name)
        
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
        // 基于准备好的dom，初始化

        getDatasetGene().then(res=>{
          
          console.log(res.data)
		
			 	  var data = res.data.data
          var myseries = [
            {
            name: 'Europe',
            data: [
            {
              name: 'Germany',
              value: 767.1
            }, {
              name: 'Croatia',
              value: 20.7
            },
            {
              name: "Belgium",
              value: 97.2
            },
            {
              name: "Czech Republic",
              value: 111.7
            },
            {
              name: "Netherlands",
              value: 158.1
            },
            {
              name: "Spain",
              value: 241.6
            },
            {
              name: "Ukraine",
              value: 249.1
            },
            {
              name: "Poland",
              value: 298.1
            },
            {
              name: "France",
              value: 323.7
            },
            {
              name: "Romania",
              value: 78.3
            },
            {
              name: "United Kingdom",
              value: 415.4
            }, {
              name: "Turkey",
              value: 353.2
            }, {
              name: "Italy",
              value: 337.6
            },
            {
              name: "Greece",
              value: 71.1
            },
            {
              name: "Austria",
              value: 69.8
            },
            {
              name: "Belarus",
              value: 67.7
            },
            {
              name: "Serbia",
              value: 59.3
            },
            {
              name: "Finland",
              value: 54.8
            },
            {
              name: "Bulgaria",
              value: 51.2
            },
            {
              name: "Portugal",
              value: 48.3
            },
            {
              name: "Norway",
              value: 44.4
            },
            {
              name: "Sweden",
              value: 44.3
            },
            {
              name: "Hungary",
              value: 43.7
            },
            {
              name: "Switzerland",
              value: 40.2
            },
            {
              name: "Denmark",
              value: 40
            },
            {
              name: "Slovakia",
              value: 34.7
            },
            {
              name: "Ireland",
              value: 34.6
            },
            {
              name: "Croatia",
              value: 20.7
            },
            {
              name: "Estonia",
              value: 19.4
            },
            {
              name: "Slovenia",
              value: 16.7
            },
            {
              name: "Lithuania",
              value: 12.3
            },
            {
              name: "Luxembourg",
              value: 10.4
            },
            {
              name: "Macedonia",
              value: 9.5
            },
            {
              name: "Moldova",
              value: 7.8
            },
            {
              name: "Latvia",
              value: 7.5
            },
            {
              name: "Cyprus",
              value: 7.2
            }]
          }, {
            name: 'Africa',
            data: [{
              name: "Senegal",
              value: 8.2
            },
            {
              name: "Cameroon",
              value: 9.2
            },
            {
              name: "Zimbabwe",
              value: 13.1
            },
            {
              name: "Ghana",
              value: 14.1
            },
            {
              name: "Kenya",
              value: 14.1
            },
            {
              name: "Sudan",
              value: 17.3
            },
            {
              name: "Tunisia",
              value: 24.3
            },
            {
              name: "Angola",
              value: 25
            },
            {
              name: "Libya",
              value: 50.6
            },
            {
              name: "Ivory Coast",
              value: 7.3
            },
            {
              name: "Morocco",
              value: 60.7
            },
            {
              name: "Ethiopia",
              value: 8.9
            },
            {
              name: "United Republic of Tanzania",
              value: 9.1
            },
            {
              name: "Nigeria",
              value: 93.9
            },
            {
              name: "South Africa",
              value: 392.7
            }, {
              name: "Egypt",
              value: 225.1
            }, {
              name: "Algeria",
              value: 141.5
            }]
          }, {
            name: 'Oceania',
            data: [{
              name: "Australia",
              value: 409.4
            },
            {
              name: "New Zealand",
              value: 34.1
            },
            {
              name: "Papua New Guinea",
              value: 7.1
            }]
          }, {
            name: 'North America',
            data: [{
              name: "Costa Rica",
              value: 7.6
            },
            {
              name: "Honduras",
              value: 8.4
            },
            {
              name: "Jamaica",
              value: 8.3
            },
            {
              name: "Panama",
              value: 10.2
            },
            {
              name: "Guatemala",
              value: 12
            },
            {
              name: "Dominican Republic",
              value: 23.4
            },
            {
              name: "Cuba",
              value: 30.2
            },
            {
              name: "USA",
              value: 5334.5
            }, {
              name: "Canada",
              value: 566
            }, {
              name: "Mexico",
              value: 456.3
            }]
          }, {
            name: 'South America',
            data: [{
              name: "El Salvador",
              value: 7.2
            },
            {
              name: "Uruguay",
              value: 8.1
            },
            {
              name: "Bolivia",
              value: 17.8
            },
            {
              name: "Trinidad and Tobago",
              value: 34
            },
            {
              name: "Ecuador",
              value: 43
            },
            {
              name: "Chile",
              value: 78.6
            },
            {
              name: "Peru",
              value: 52
            },
            {
              name: "Colombia",
              value: 74.1
            },
            {
              name: "Brazil",
              value: 501.1
            }, {
              name: "Argentina",
              value: 199
            },
            {
              name: "Venezuela",
              value: 195.2
            }]
          }, {
            name: 'Asia',
            data: [{
              name: "Nepal",
              value: 6.5
            },
            {
              name: "Georgia",
              value: 6.5
            },
            {
              name: "Brunei Darussalam",
              value: 7.4
            },
            {
              name: "Kyrgyzstan",
              value: 7.4
            },
            {
              name: "Afghanistan",
              value: 7.9
            },
            {
              name: "Myanmar",
              value: 9.1
            },
            {
              name: "Mongolia",
              value: 14.7
            },
            {
              name: "Sri Lanka",
              value: 16.6
            },
            {
              name: "Bahrain",
              value: 20.5
            },
            {
              name: "Yemen",
              value: 22.6
            },
            {
              name: "Jordan",
              value: 22.3
            },
            {
              name: "Lebanon",
              value: 21.1
            },
            {
              name: "Azerbaijan",
              value: 31.7
            },
            {
              name: "Singapore",
              value: 47.8
            },
            {
              name: "Hong Kong",
              value: 49.9
            },
            {
              name: "Syria",
              value: 52.7
            },
            {
              name: "DPR Korea",
              value: 59.9
            },
            {
              name: "Israel",
              value: 64.8
            },
            {
              name: "Turkmenistan",
              value: 70.6
            },
            {
              name: "Oman",
              value: 74.3
            },
            {
              name: "Qatar",
              value: 88.8
            },
            {
              name: "Philippines",
              value: 96.9
            },
            {
              name: "Kuwait",
              value: 98.6
            },
            {
              name: "Uzbekistan",
              value: 122.6
            },
            {
              name: "Iraq",
              value: 139.9
            },
            {
              name: "Pakistan",
              value: 158.1
            },
            {
              name: "Vietnam",
              value: 190.2
            },
            {
              name: "United Arab Emirates",
              value: 201.1
            },
            {
              name: "Malaysia",
              value: 227.5
            },
            {
              name: "Kazakhstan",
              value: 236.2
            },
            {
              name: "Thailand",
              value: 272
            },
            {
              name: "Taiwan",
              value: 276.7
            },
            {
              name: "Indonesia",
              value: 453
            },
            {
              name: "Saudi Arabia",
              value: 494.8
            },
            {
              name: "Japan",
              value: 1278.9
            },
            {
              name: "China",
              value: 10540.8
            },
            {
              name: "India",
              value: 2341.9
            },
            {
              name: "Russia",
              value: 1766.4
            },
            {
              name: "Iran",
              value: 618.2
            },
            {
              name: "Korea",
              value: 610.1
            }]
          }]
          
          var myseries = eval(data)
          var option_1 =  {
            chart: {
              type: 'packedbubble',
              height: '100%'
            },
            title: {
              text: ''
            },
            tooltip: {
              useHTML: true,
              pointFormat: '{point.name}'
            },
            plotOptions: {
              packedbubble: {
                minSize: '80%',
                maxSize: '100%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                  splitSeries: false,
                  gravitationalConstant: 0.02
                },
                dataLabels: {
                  enabled: true,
                  format: '{point.name}',
                  filter: {
                    property: 'y',
                    operator: '>',
                    value: 0
                  },
                  style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                  }
                }
              }
            },
            series: myseries
          }
			    this.genes_Chart_bubble = option_1

        })

    
        
      },
    },
    mounted(){
      // this.drawCellTypeChart()
      this.initCharts() //调用定义词云图方法

      var myChartContainer = document.getElementById('chart2')

    // 获取自适应的高度和宽度
      var resizeMyChartContainer = function() {
        // console.log("----")
        myChartContainer.style.height = window.innerHeight * 0.3 + 'px';
        myChartContainer.style.width = window.innerWidth * 0.85+ 'px';
        
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

  .bubble_container{
	
		  min-width: 320px;
      max-width: 400px;
      margin: 1em auto;
	}


</style>
