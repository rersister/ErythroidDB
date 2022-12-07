<template>
  <div class="my_out">
    <Header>
      <Col span="12">
                            <!-- 数据查询分子名 -->
                    </br>
                    </br>
                    </br>
                    </br>
                    Input gene/tissue/dataset id/organism name:
                    <Input search enter-button="Search"  @on-search="searchDataSetByKeyName($event)" :placeholder="search_placeholder"/>                         
      </Col> 
    </Header>
    <body class="my_body">
      
      <div class="my_Row">

        <div  class="my_col">


            <Br/>
            <!-- <div>
              <h4>Input gene/tissue/dataset id/organism name:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>  
              <Input search enter-button="Search"  @on-search="searchDataSetByKeyName($event)" :placeholder="search_placeholder"/>

            </div> -->

            <div>
              <h4>Choose Cell Type:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>     -->
              <i-select  clearable placeholder="Pleace select cell type"  @on-change="changedCellType" filterable>        
                <i-option v-for="(celltype,index) in celltype_list" :key='index' :value="celltype.name">{{ celltype.full_name }}</i-option>
              </i-select>
            </div>
            <Br/>
            <div>
              <h4>Choose Reported Gene:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>     -->
              <i-select  clearable placeholder="Pleace select reported gene"  @on-change="changedReportedGene" filterable>        
                <i-option v-for="(reportedGene,index) in reportedGene_list" :key='index' :value="reportedGene.name">{{ reportedGene.name }}</i-option>
              </i-select>
            </div>
            <Br/>
            <div>
              <h4>Choose Compound Type:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>     -->
              <i-select  clearable placeholder="Pleace select compound type"  @on-change="changedComppoundType" filterable>        
                <i-option v-for="(compound,index) in compound_list" :key='index' :value="compound.name">{{ compound.name }}</i-option>
              </i-select>
            </div>
            <Br/>
            <div>
              <h4>Choose Disease Type:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>     -->
              <i-select   clearable placeholder="Pleace select disease type"  @on-change="changedDiseaseType" filterable>        
                <i-option v-for="(disease,index) in disease_list" :key='index' :value="disease.name">{{ disease.name }}</i-option>
              </i-select>
            </div>
            <Br/>
            <div>
              <h4>Choose Species:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>     -->
              <i-select  clearable placeholder="Pleace select species"  @on-change="changedSpecies" filterable>        
                <i-option v-for="(species,index) in species_list" :key='index' :value="species.name">{{ species.name }}</i-option>
              </i-select>
            </div>
            <Br/>
            <div>
              <h4>Choose Tissue:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>     -->
              <i-select  clearable placeholder="Pleace select tissue"  @on-change="changedTissue" filterable>        
                <i-option v-for="(tissue,index) in tissue_list" :key='index' :value="tissue.value">{{ tissue.name }}</i-option>
              </i-select>
            </div>
            <Br/>
            <div>
              <h4>Choose Experiment Type:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>     -->
              <i-select  clearable placeholder="Pleace select experiment type"  @on-change="changedGrowthMode" filterable>        
                <i-option v-for="(growth_mode,index) in growth_mode_list" :key='index' :value="growth_mode.name">{{growth_mode.name }}</i-option>
              </i-select>
            </div>
            <!-- <Br/>
            <div>
              <h4>Choose Development Type:</h4>
              <Input enter-button="Search"   :placeholder="search_placeholder"/>  
              <i-select  clearable placeholder="Pleace select development type"  @on-change="changedDevelopmentType" filterable>        
                <i-option v-for="(development,index) in development_list" :key='index' :value="development.name">{{ development.name }}</i-option>
              </i-select>
            </div> -->
            <Br/>
            <div>
              <h4>Choose Omics Type:</h4>
              <!-- <Input enter-button="Search"   :placeholder="search_placeholder"/>     -->
              <i-select  clearable placeholder="Pleace select sequence type"  @on-change="changedSequenceType" filterable>        
                <i-option v-for="(sequence,index) in sequenceType_list" :key='index' :value="sequence.name">{{ sequence.name }}</i-option>
              </i-select>
            </div>

        </div>

        <div class="my_colRight">
            <div> 
            <!-- dataset 展示页 FilterTableForAllDateSet -->
              
              <Table class="my_hover" stripe
                    @on-row-click="intoDataSet"
                    :data="datasetsTypeSource"
                    :columns="tAdatasetTypeSourceColumns"
                    ref="table">
              </Table>

           
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

            <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon>Download</Button>


          </div> 
        </div>
      </div>

    </body>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="footer_style">
      <span class="my_footer">
                Copyright ©2018-2019 Guangmin Zheng.&copy;<a
                  href="http://sourcedb.big.cas.cn/zw/zjrc/yjy/201311/t20131116_3979427.html"
                  target="_blank"
                  title="北京基因组研究所方向东"
                  >Fang's Lab.</a>
                All Rights Reserved.</span>
    </div>
 </div>
</template>
<script>
import router from '@/router'
import routers from '@/router/routers'
import { mapMutations } from 'vuex'
import HeaderBar from '../components/header-bar'

import Header from '../components/Header'
import FilterTableForAllDateSet from '@/view/compnents/FilterTableForAllDateSet'
import { getDatasetTypeSource,getDatasetDataByKeyParam,getDatasetGene,getDatasetDataByMultiInput } from '@/api/erythdataset'


// import {prependHeaderSection,appendFooterSection} from '@/libs/headerfooter.js'


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
  name: 'App',
  components: {
    HeaderBar,

    Header,
    FilterTableForAllDateSet,
  },
  data() {
    return {
      values: [
        { id: 1, name: 'Home', link: '/', type: 'ios-home' },
        { id: 0, name: 'Search', link: '/Search', type: 'ios-search' },
        {
          id: 2,
          name: 'Erythroid Atlas',
          link: '/Erythroid Atlas',
          type: 'ios-analytics',
        },
        { id: 3, name: 'Help', link: '/help', type: 'ios-paper' },
        { id: 4, name: 'About', link: '/about', type: 'ios-navigate' },
      ],
      search:'',
      table_name:'all_dataset_source_type',
      pageSizeTypeSource:10,
      totalTypeSource:400,
      currentPage: 1,
      currentPageTypeSource:1,
      current_index: -1,
      search_placeholder:'',
      datasetsTypeSource:[],
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
      cell_type:'',
      celltype_list:[
      {'name':'HSC',
            'full_name':'Hematopoietic Stem cells',
            'cell_ano':'Hematopoietic stem cells (HSCs) are a rare population of cells residing in the bone marrow (BM) and continuously replenish all mature blood cells throughout the life span.'},
          {'name':'MPP',
            'full_name':'Multipotent Progenitor Cell',
            'cell_ano':'Multipotent progenitor cell is generated from HSC and has the ability of self-renewing and differentiation into all blood cell forms.'},
          {'name':'CMP',
          'full_name':'Common Myeloid Progenitor',
          'cell_ano':'Common myeloid progenitors give rise to either megakaryocyte/erythrocyte or granulocyte/macrophage progenitors. '},
          {'name':'MEP',
          'full_name':'Megakaryocyte-Erythroid Progenitor',
          'cell_ano':'Megakaryocyte/erythroid progenitors (MEPs) are bipotent cells that undergo a fate decision to become either megakaryocytes (Mk) or erythroid (E) cells.'},
          {'name':'BFU-E',
          'full_name':'Burst-Forming Unit-Erythroid',
          'cell_ano':'BFU-E Burst forming unit-erythroid, the earliest known erythroid precursor cell that eventually differentiates into erythrocytes. Produces a colony containing greater than 200 erythroblasts in a hematopoietic colony assay.'},
          {'name':'CFU-E',
          'full_name':'Colony-Forming Unit-Erythroid',
          'cell_ano':'A CFU-E cell, which has a lesser proliferative capacity than a BFU-E cell, requires the presence of erythropoietin as a stimulatory factor. '},
          {'name':'ProE',
          'full_name':'Proerythroblast',
          'cell_ano':'The proerythroblast is a large cell with deep blue cytoplasm, high nucleus-to-cytoplasm ratio, and prominent nucleoli. Subsequent to proerythroblasts, nucleoli are no longer seen.'},
          {'name':'BasoE',
          'full_name':'Basophilic Erythroblast',
          'cell_ano':'Basophilic erythroblast is a nucleated precursor in the erythrocytic series, preceding the polychromatophilic erythroblast and following the proerythroblast; the cytoplasm is basophilic, the nucleus is large with clumped chromatin, and the nucleoli have disappeared. It is also called basophilic normoblast.'},
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
        ],
      reported_gene:'',
      reportedGene_list:[],
      compound_n:'',
      compound_list:[

              {name:'TRβ agonists',
                full_name:'Thyroid hormone receptor(TRβ)  agonists',
                'cell_ano':''},
              {name:'ERBB inhibitors',
                full_name:'Epidermal growth factor receptor inhibitors',
                'cell_ano':''},
              {name:'Iron',
                full_name:'Iron',
                'cell_ano':' '},
              {name:'IDH2 inhibitor',
              full_name:'Isocitrate dehydrogenase 2(IDH2) mutant-specific inhibitor',
              'cell_ano':''},
              {'name':'BET bromodomain inhibitor',
              'full_name':'BET bromodomain inhibitor',
              'cell_ano':''},
              
              {name:'PPAR-α agonists',
              full_name:'Peroxisome proliferator-activated receptor α(PPAR-α) agonists',
              'cell_ano':''},
              {name:'HbF inducers',
              full_name:'Heterogeneity of fetal hemoglobin (HbF) activation',
              'cell_ano':''},
              
              {name:'Erythropoietin',
              full_name:'Erythropoietin',
              'cell_ano':''},

              {name:'Corticosteroids',
              full_name:'Corticosteroids',
              'cell_ano':''},


             
      ],    
      disease_n:'',
      disease_list:[
              // 贫血  
              {name:'Fanconi anemia', 
                'full_name':'Fanconi anemia',
                'cell_ano':''},
              //红细胞缺陷  贫血
              {name:'Diamond-Blackfan anaemia',  
                'full_name':'Diamond-Blackfan anaemia',
                'cell_ano':''},
              // 贫血
              {name:'Epo-resistant anaemias',
                'full_name':'Epo-resistant anaemias',
                'cell_ano':' '},
              //  贫血
              {name:'Aplastic anemia',
              'full_name':'Aplastic anemia',
              'cell_ano':' '},

              {name:'Sickle cell',
                'full_name':'Sickle cell',
                'cell_ano':' '},

              //地中海贫血
              {name:'Thalassemia',
                'full_name':'Thalassemia',
                'cell_ano':' '},

              // 血红蛋白异常
              {name:'Hemoglobinopathies',
              'full_name':'Hemoglobinopathies',
              'cell_ano':''},

      ],
      species:'',
      species_list:[
        {
          value: "Homo",
          name: 'Homo sapiens'
        },
        {
          value: "Mus",
          name: 'Mus musculus',
          // color: 'red'
        },
        {
          value: "Danio",
          name: 'Danio rerio',
          // color: 'green'
        }
      ],
      tissue:'',
      tissue_list:[ 
        {
        value: "Marrow",
        name: 'Bone Marrow(BM)'
      },
      {
      value: "Cord",
      name: 'Cord Blood(CB)',
      // color: 'red'
    },
    {
      value: "Peripheral",
      name: 'Peripheral Blood(PB)',
      // color: 'green'
    },
    {
      value: "Spleen",
      name: 'Spleen(SP)',
      // color: 'green'
    },
  
    {
      value: "Line",
      name: 'Cell Line',
      // color: 'green'
    },

      {
      value:'Embryo',
      name:'Embryo(EM)'
    },
    {

      value:'Embryonic',
      name:'Fetus Tissue '
    },

      {
      value:'Pluripotent',
      name:'Induced Pluripotent Stem Cells(iPSC)'
    },
   
      {
      value: "Cardiac",
      name: 'Cardiac(CAR)',
      // color: 'green'
    },

      {
      value: "Kidney",
      name: 'Kidney(KID)',
      // color: 'green'
    },

      {
      value: "other",
      name: 'Other',
      // color: 'green'
    },
      ],

      growth_mode:'',
      growth_mode_list:[
            {
              value: "vitro",
              name: 'vitro'
            },
            {
              value: "vivo",
              name: 'vivo',
              // color: 'red'
            },
      ],
      development:'',
      development_list:[
          {
            value: "BM_vitro",
            name: 'BM_vitro'
          },
          {
            value: "CL_vitro",
            name: 'CL_vitro'
          },
          {
            value: "EMFL_vitro",
            name: 'EMFL_vitro'
          },
          
          {
            value: "PB_vitro",
            name: 'PB_vitro'
          },
          {
            value:'EM_vitro',
            name:'EM_vitro'
          },
          
          {
                value:'CB_vitro',
                name:'CB_vitro'
          },

          {
            value:'SP_vitro',
            name:'SP_vitro'
          },
          {
            value:'iPSC_vitro',
            name:'iPSC_vitro',
          },



          {
            value: "BM_vivo",
            name: 'BM_vivo',
            // color: 'red'
          },
          {
            value:'CB_vivo',
            name:'CB_vivo',
          },
          
          {
            value:'PB_vivo',
            name:'PB_vivo',
          },

          {
            value:'CP_vivo',
            name:'CP_vivo',
          },
          {
            value:'EMFL_vivo',
            name:'EMFL_vivo'
          },
          {
            value:'EM_vivo',
            name:'EM_vivo',
          },

          {
            value:'SP_vivo',
            name:'SP_vivo',
          },

          {
            value:'EMYS_vivo',
            name:'EMYS_vivo'
          },
          {
            value:'EMCH_vivo',
            name:'EMCH_vivo'
          },
      ],
      sequence:'',
      sequenceType_list:[
            {

              name:'Bulk RNA-seq',
              value:'Bulk'
            },
            {
              name:'scRNA-seq',
              value:'scRNA'
            },
            {
                value: "all",
                name: 'All',
                // color: 'green'
              },
      ],
  
    }
  },
  computed: {
   
  },

  // 当前位置的item
  methods: {
    ...mapMutations(['setCurrentPageToken']),
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

    intoDataSet(data, index, event) {
      // alert(data.dataset);
      if(this.type) return;
      this.setCurrentPageToken(data.dataset_id)
      router.push({
        name: 'Dataset_detail',
        params: {
          dataset: data.dataset_id,
        },
      })
    },
    exportData(type){
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'dataset_eryDB'
                    });
                }else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                }else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: '自定义数据',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
                  
    },
    searchItemByName(){
      
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

    mockTableDataTypeSource(){

        var _this = this;      
        // _this.spinShowTypeSource = true, 
        getDatasetTypeSource(_this.table_name,_this.currentPageTypeSource,_this.pageSizeTypeSource ).then( res=>{
           
            // _this.spinShowTypeSource = false                    
            let datas = res.data
            // console.info(datas.list)
            _this.datasetsTypeSource = datas.list                  
            _this.totalTypeSource = datas.total;
        })
       

    },

    mockTableDataByKeyParam(keyParam){

       var _this = this;
       getDatasetDataByKeyParam(_this.table_name,_this.currentPageTypeSource,_this.pageSizeTypeSource,keyParam).then(res =>{

          // _this.spinShowTypeSource = false                    
            let datas = res.data
            // console.info(datas.list)
            _this.datasetsTypeSource = datas.list                  
            _this.totalTypeSource = datas.total;

       })

    },
    getDatasetByMultiInput(){
      var _this = this;
      var select = []
      select.push({ 
        cell_type:this.cell_type,
        gene:this.reported_gene,
        molecules_type:this.compound_n,
        disease:this.disease_n,
        organism:this.species,
        source:this.tissue,
        growth_mode:this.growth_mode,
        development_type:this.development,
        sequence_type:this.sequence
      })
      // alert(select)
      getDatasetDataByMultiInput(_this.table_name,_this.currentPageTypeSource,_this.pageSizeTypeSource,select).then(res =>{

          // _this.spinShowTypeSource = false                    
            let datas = res.data
            // console.info(datas.list)
            _this.datasetsTypeSource = datas.list                  
            _this.totalTypeSource = datas.total;

       })

    },

    changedCellType(cell_type){
      let _this = this
      _this.cell_type = cell_type
      this.getDatasetByMultiInput()
    },
    changedReportedGene(reported_gene){
      let _this = this
      _this.reported_gene = reported_gene
      this.getDatasetByMultiInput()

    },
    changedComppoundType(compound_n){
      let _this = this
      _this.compound_n = compound_n
      this.getDatasetByMultiInput()

    },
    changedDiseaseType(disease){
      let _this = this
      _this.disease_n = disease
      this.getDatasetByMultiInput()
    },
    changedSpecies(species){
      let _this = this
      _this.species = species
      this.getDatasetByMultiInput()
    },
    changedTissue(tissue){
      // alert(tissue)
      let _this = this
      _this.tissue = tissue
      this.getDatasetByMultiInput()
    },
    changedGrowthMode(growth_mode){
      let _this = this
      _this.growth_mode = growth_mode
      this.getDatasetByMultiInput()
    },
    changedDevelopmentType(development){
       let _this = this
      _this.development = development
      this.getDatasetByMultiInput()
    },
    changedSequenceType(sequence){
      let _this = this
      _this.sequence = sequence
      this.getDatasetByMultiInput()
    },
    getReportedGeneList(){

      getDatasetGene().then(res=>{
          
              
              let _this = this
              var data = res.data
              var gData = data.gData
              _this.reportedGene_list = gData
        })

    }
      
  },

  watch: {
    $route(newRoute) {
      this.setBreadCrumb(newRoute)
    },
  },
  created() {
      // this.mockTableData();
      this.mockTableDataTypeSource()
      this.getReportedGeneList()


  },
  mounted() {
    console.log('==============')
    
     if ( this.$route.params.KeyName != undefined){
      //  alert(this.$route.params.KeyName)
        this.mockTableDataByKeyParam(this.$route.params.KeyName)

     }
  },

}
</script>

<style lang="less">
@import '../../../css/page.min.css';

  .my_out{
    min-width: 1400px;
    margin-top:50px;
  }

  .my_body{
    height:100%;
    width:100%;
    padding:100px 20px 100px;
  }

  .my_Row{
    width: 100%;
    height: 100%;

  }

  ::v-deep .ivu-table-wrapper{
    border: none !important;

  }


  .my_col{
    border: 1px solid gainsboro;
    padding: 5px;
    width: 300px;
    float: left;
    margin-right: 20px;
    margin-left: 20px;
  }

  .my_colRight{

    width: calc(100% - 340px);
    float: left;

  }

.my_footer {
  font-size: calc((20 / 1920) * 100vw);

}

.footer_style{
  text-align: center;
  clear: both;
}


</style>
