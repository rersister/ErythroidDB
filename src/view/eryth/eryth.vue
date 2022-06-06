<template>
    <div>
             
       
          <!-- <div id="cell_type_show"> -->
            <!-- Process of Red blood cell differentiation and development -->
        
            <h1 class='h1_title' > 
              Process of Erythroid  Differentiation and Development
            </h1>
            <Row>
              <h2 class='h2_title' > {{ current_cellname }} </h2>
              <span>
                {{current_cell_anno}}
              </span>
            </Row>
            <div id="cell_type_show_view" style="width:100%;height:200%; text-aglign:center">
              
              fff
            </div>
         
          
          <!-- 用表格展示 根据细胞分析搜索的数据集 -->
          <Row>
            <h1 class='h1_title' > Get Research Datasets Have Cells of  {{cell_name}}
              <!-- <i-button  shape="circle" icon="ios-search" @click="changedCellType"></i-button> -->
              <i-button  shape="circle"  @click="resetCellType">Reset</i-button>
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

    name:'Bulk',
    value:'Bulk'
  },
  1:{
    name:'Single Cell',
    value:'Single'
  },
  2: {
      value: "all",
      name: 'All',
      // color: 'green'
    },
  
}

export default {
    name:"eryth",
    components: {FilterTableForAllDateSet},
    data(){
      return {
        cell_type_list:[

          // {'name':'ESC',
          //   'full_name':'Embryonic Stem Cells'},
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
        current_cellname:'Hematopoietic Stem cells',
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
                          href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset

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
              if (params.row.dataset_id.indexOf("GSE") > -1){
                  return h('div', [
                  h('a', {                               
                        attrs:{                              
                          href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset_id

                        },    
                    },params.row.dataset_id)
                  ])
              }else{
                return h('div',params.row.dataset_id)
              
              }     

              // return h('div', [
              //   h('a', {                               
              //         attrs:{                              
              //           href:'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc='+params.row.dataset_id

              //         },    
              //     },params.row.dataset_id)
              //   ])

            }
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
              title: 'Growth Mode',
              key: 'growth_mode',
            
              filter: {
                  type: 'Select',
                  option: growth_type
              },
          },
          {
              title: 'Development Type',
              key: 'development_type',
             width:'130',
              filter: {
                  type: 'Select',
                  option: development_type
              },
          },
        
          {
            title: 'Title',
            key: 'title',
            filter: {
              type: 'Input'
            }

          },
          {
            title: 'Omics Data Type',
            key: 'experiment_type',
            width:'120',
            filter: {
                  type: 'Select',
                  option: experiment_type
              },
          },
          {
            title: 'Sequence Type',
            key: 'sequence_type',
            width:'110',
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

      mockTableDataTypeSourceByCell(cell_name){
       
      //  alert("begin find ")
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
      changedCellType(){

        this.mockTableDataTypeSourceByCell(this.cell_name)
        
      },

      resetCellType(){
        this.cell_name = 'All'
        this.mockTableDataTypeSourceByCell(this.cell_name)
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
        // let _this = this
        var _this = this;  

        let myChart = this.$echarts.init(document.getElementById("cell_type_show_view"));
        
        // 给图添加点击事件
        var _name  =''
        myChart.on("click", params => {
         
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

         
         
              
          
          var cell_type_list = cell_type_list=[

          // {'name':'ESC',
          //   'full_name':'Embryonic Stem Cells',
          //   'cell_ano':'Embryonic stem cells are pluripotent cells isolated from the inner cell mass of a blastocyst, the early mammalian embryo that implants into the uterus. Embryonic stem cells self-renew by dividing and can differentiate into any specialised cell of the body, but not extra-embryonic tissues such as the placenta.'},
          
          {'name':'HSC',
            'full_name':'Hematopoietic Stem cells',
            'cell_ano':'Hematopoietic stem cells (HSCs) are a rare population of cells residing in the bone marrow (BM) and continuously replenish all mature blood cells throughout the life span.'},
          {'name':'MPP',
            'full_name':'Multipotent Progenitor Cell',
            'cell_ano':'Multipotent adult progenitor cells (MAPC) are an attractive choice for cytotherapy because they have a large proliferative potential, the ability to differentiate into different cell types and produce a variety of cytokines and growth factors important to wound healing. '},
          {'name':'CMP',
          'full_name':'Common Myeloid Progenitor',
          'cell_ano':'Common myeloid progenitors give rise to either megakaryocyte/erythrocyte or granulocyte/macrophage progenitors. Purified progenitors were used to provide a first-pass expression profile of various haematopoiesis-related genes.'},
          
          {'name':'MEP',
          'full_name':'Megakaryocyte-Erythroid Progenitor',
          'cell_ano':'Megakaryocyte/erythroid progenitors (MEPs) are bipotent cells that undergo a fate decision to become either megakaryocytes (Mk) or erythroid (E) cells. Detailed mechanistic knowledge of the human MEP fate decision is not only critical for our understanding of normal and perturbed hematopoiesis, but also has important therapeutic implications.'},
          {'name':'BFU-E',
          'full_name':'Burst-Forming Unit -Erythroid',
          'cell_ano':'BFU-E Burst forming unit-erythroid, the earliest known erythroid precursor cell that eventually differentiates into erythrocytes. Produces a colony containing greater than 200 erythroblasts in a hematopoietic colony assay.'},
          {'name':'CFU-E',
          'full_name':'Colony-Forming Unit – Erythroid',
          'cell_ano':'A CFU-E cell, which has a lesser proliferative capacity than a BFU-E cell, requires the presence of erythropoietin as a stimulatory factor. '},

          {'name':'ProE',
          'full_name':'The Proerythroblast Stage',
          'cell_ano':'The proerythroblast is a large cell with deep blue cytoplasm, high N:C ratio, and prominent nucleoli. Subsequent to proerythroblasts, nucleoli are no longer seen. '},
          {'name':'BasoE',
          'full_name':'Basophilic Erythroblast',
          'cell_ano':'Basophilic erythroblast a nucleated precursor in the erythrocytic series, preceding the polychromatophilic erythroblast and following the proerythroblast; the cytoplasm is basophilic, the nucleus is large with clumped chromatin, and the nucleoli have disappeared. Called also basophilic normoblast.'},
          {'name':'PolyE',
          'full_name':'Polychromatophilic Erythroblast',
          'cell_ano':'The nucleus is intensely heterochromatic, and the cytoplasm is now a characteristic lilac color. The basophilia is due to the cytoplasmic ribosomes, and the acidophilia is due to the increase in the amount of hemoglobin being synthesized by the ribosomes. This is the last stage during which cell division occurs.'},
          {'name':'OrthoE',
          'full_name':'Orthochromatic Erythroblast',
          'cell_ano':'In an orthochromatic erythroblast, the nucleus has shrunk and become darker and the growing concentration of hemoglobin turns the cytoplasm pink. '},
          {'name':'Retic',
          'full_name':'Reticulocyte',
          'cell_ano':'Reticulocytes are immature red blood cells that detect if your bone marrow is forming enough red blood cells'},
          {'name':'RBC',
          'full_name':'Red Blood Cell',
          'cell_ano':'Red blood cell, also called erythrocyte, cellular component of blood, millions of which in the circulation of vertebrates give the blood its characteristic colour and carry oxygen from the lungs to the tissues. The mature human red blood cell is small, round, and biconcave; it appears dumbbell-shaped in profile. '}
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

          this.cell_name = _this.cell_name
          // alert(this.cell_name)
          this.mockTableDataTypeSourceByCell(this.cell_name)
           





        });
        
       
        
        // 指定图表的配置项和数据
        var greyColer={
            color:"grey",
        };

        var greenColer={
            color:"green"
        };
        var blueColer={
            color:"blue"
        };
        var orangeColer={
            color:"orange",
        }
        var pinkColer ={
            color:'pink',
        };

        var redColer={
            color:"red",
            
        };

        var data = {
                      "name":"HSC",
                      "itemStyle":greyColer,
                      "children":[{
                          "name":"MPP",
                          "itemStyle":greenColer,
                          "children": [
                          { 
                             "name":'CMP',
                             "itemStyle":greenColer,
                             "children":[{
                                "name":"MEP",
                                "itemStyle":greenColer,
                                "children":[{
                                     "name": "BFU-E",
                                      "itemStyle":blueColer,
                                      "children": [
                                          {
                                              "name": "CFU-E",
                                              "itemStyle":orangeColer,
                                              "children": [
                                                  {
                                                      "name": "ProE", 
                                                      "itemStyle":pinkColer,
                                                      "children": [
                                                          {
                                                              "name": "BasoE", 
                                                              "itemStyle":redColer,
                                                              "children":[
                                                                // {"name":"EarlyBasoE","itemStyle":redColer },
                                                                // {"name":"LateBasoE","itemStyle":redColer},
                                                                // {"name":"PolyE","itemStyle":redColer},
                                                                {
                                                                  "name":"PolyE",
                                                                  "itemStyle":redColer,
                                                                  "children": [
                                                                      {
                                                                        "name":"OrthoE",
                                                                        "itemStyle":redColer,
                                                                        "children":[
                                                                          {
                                                                            "name":"Retic",
                                                                            "itemStyle":redColer,
                                                                            "children":[
                                                                                            {
                                                                                    "name":"RBC",
                                                                                    "itemStyle":'orange',
                                                                                   
                                                                            },
                                                                          ]

                                                                        },
                                                                        ]

                                                                      },
                                                                  ]
                                                                
                                                                },

                                                              
                                                                // {"name":"Retcu","itemStyle":redColer},
                                                                
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

           


        };
        var option = {
            // title: {
						//   text: this.current_cell_anno ,
            //   // subtext:this.current_cellname,
            // },
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
                    initialTreeDepth:15,

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
        myChartContainer.style.height = window.innerHeight * 0.3 + 'px';
        myChartContainer.style.width = window.innerWidth * 0.88+ 'px';
        
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


  .button_style{
    font-size:calc((40/1920) * 100vw);
  }




</style>

